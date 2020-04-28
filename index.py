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


def getVideo(name, no):
    url = 'http://animeyoutube.com/episode/' + name + '-episode-' + str(no)
    res = requests.get(url)
    url = re.search(r'\/\/vidstreaming\.io.*?\"',
                    str(res.content)).group(0)
    url = 'https:' + re.sub(r'streaming.php', 'download', url[:-1])
    res = requests.get(url)
    soup = BeautifulSoup(res.content, 'lxml')
    mydivs = soup.findAll('div', {'class': 'dowload'})
    links = []
    for div in mydivs:
        for link in div.findAll('a'):
            if link.getText() != 'Download For Ad':
                links.append(link.get('href'))
    return {'links': links}


def getInfo(seriesName, start, end):
    seriesInfo = getEpisodeInfo(seriesName)
    if end == -1 or end > seriesInfo['no']:
        end = seriesInfo['no']
    if start < 1:
        start = 1
    if start > end:
        start = end
    return {'name': seriesInfo['name'], 'img': seriesInfo['img'], 'start': start, 'end': end}


app = Flask(__name__, static_folder='./client/build')


@app.route('/info', methods=['POST'])
def respondInfo():
    data = json.loads(request.data)
    responseData = getInfo(data['name'], 1, -1)
    return json.dumps(responseData)


@app.route('/link', methods=['POST'])
def respondLink():
    data = json.loads(request.data)
    responseData = getVideo(data['name'], data['no'])
    return json.dumps(responseData)


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    if path != '' and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')
