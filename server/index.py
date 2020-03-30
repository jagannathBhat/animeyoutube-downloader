import json
import os
import re
import requests
from bs4 import BeautifulSoup
from flask import Flask, request, send_from_directory
from lxml import html

blacklist = [
    '[document]',
    'noscript',
    'header',
    'html',
    'meta',
    'head',
    'input',
    'script',
    'style'
]


def downloadVideo(url, fileName):
    r = requests.get(url, stream=True)
    with open(fileName + '.mp4', 'wb') as f:
        for chunk in r.iter_content(chunk_size=1024*1024):
            if chunk:
                f.write(chunk)


def getEpisodeInfo(seriesName):
    res = requests.get('http://animeyoutube.com/' + seriesName)
    tree = html.fromstring(res.content)
    img = tree.xpath(
        '/html/body/div[1]/div[2]/section/main/div/div/div[2]/div[1]/img/@src')[0]
    name = tree.xpath(
        '/html/body/div[1]/div[2]/section/main/div/div/div[2]/div[2]/h1/text()')[0]
    no = tree.xpath(
        '/html/body/div[1]/div[2]/section/main/div/div/h2/text()')[0]
    no = int(re.search(r'(\d+)', no).group(0))
    return {'img': img, 'name': name, 'no': no}


def getVideo(url):
    res = requests.get(url)
    videoUrl = re.search(r'\/\/vidstreaming\.io.*?\"',
                         str(res.content)).group(0)
    videoUrl = 'https:' + re.sub(r'streaming.php', 'download', videoUrl[:-1])

    res = requests.get(videoUrl)
    soup = BeautifulSoup(res.content, "lxml")
    for link in soup.findAll('a'):
        if link.get('download') != None:
            return link.get('href')


def getVideos(seriesName, start, end):
    links = []
    for i in range(start, end + 1):
        links.append(getVideo('http://animeyoutube.com/episode/' +
                              seriesName + '-episode-' + str(i)))
    return links


def getDownloadLinks(seriesName, start, end):
    seriesInfo = getEpisodeInfo(seriesName)
    if end == -1 or end > seriesInfo['no']:
        end = seriesInfo['no']
    if start < 1:
        start = 1
    if start > end:
        start = end
    links = getVideos(seriesName, start, end)
    return {'name': seriesInfo['name'], 'img': seriesInfo['img'], 'links': links}


app = Flask(__name__, static_folder='../client/build')


@app.route('/generate', methods=['POST'])
def respondGenerate():
    data = json.loads(request.data)
    print(data['name'])
    responseData = getDownloadLinks(data['name'], 1, -1)
    return json.dumps(responseData)


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')


if __name__ == '__main__':
    app.run('0.0.0.0')
