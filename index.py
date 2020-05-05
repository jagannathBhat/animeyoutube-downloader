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


def getEpisodeNo(url):
    res = requests.get(url)
    tree = html.fromstring(res.content)
    if 'movies' in url:
        no = 1
    else:
        no = tree.xpath(
            '/html/body/div[1]/div[2]/section/main/div/div/h2/text()')[0]
        no = re.search(r'Episode \d+', no).group(0)
        no = int(re.search(r'(\d+)', no).group(0))
    return no


def getResults(term, website):
    websites = ['http://animeyoutube.com', 'http://kiss-anime.website']
    url = websites[website] + '/?s=' + term
    res = requests.get(url)
    soup = BeautifulSoup(res.content, 'lxml')
    mydivs = soup.findAll('div', {'class': 'col-6 col-sm-2 new-movies'})
    results = []
    for div in mydivs:
        results.append({'name': div.find('h2').getText() + ' ' + div.find('span').getText(),
                        'img': div.find('img').get('src'), 'url': div.find('a').get('href')})
    return {'results': results}


def getVideo(animeUrl, no):
    if 'www1.kiss-anime.website/movies' in animeUrl:
        url = animeUrl
        server = r'\/\/vidcloud9\.com.*?\"'
    else:
        if 'www1.kiss-anime.website' in animeUrl:
            url = 'http://www1.kiss-anime.website/watch/'
            server = r'\/\/vidcloud9\.com.*?\"'
        elif 'animeyoutube.com' in animeUrl:
            url = 'http://animeyoutube.com/episode/'
            server = r'\/\/vidstreaming\.io.*?\"'
        animeUrl = animeUrl.split('/')
        if animeUrl[-1] == '':
            url += animeUrl[-2]
        else:
            url += animeUrl[-1]
        url += '-episode-' + str(no)
    res = requests.get(url)
    url = re.search(server,
                    str(res.content)).group(0)
    url = 'https:' + re.sub(r'streaming.php', 'download', url[:-1])
    res = requests.get(url)
    soup = BeautifulSoup(res.content, 'lxml')
    mydivs = soup.findAll('div', {'class': 'dowload'})
    links = []
    for div in mydivs:
        for link in div.findAll('a'):
            if 'download for ad' not in link.getText().lower():
                links.append({'name': link.getText(), 'url': link.get('href')})
    return {'links': links}


def getInfo(url, start, end):
    no = getEpisodeNo(url)
    if end == -1 or end > no:
        end = no
    if start < 1:
        start = 1
    if start > end:
        start = end
    return {'start': start, 'end': end}


app = Flask(__name__, static_folder='./client/build')


@app.route('/info', methods=['POST'])
def respondInfo():
    data = json.loads(request.data)
    responseData = getInfo(data['url'], 1, -1)
    return json.dumps(responseData)


@app.route('/link', methods=['POST'])
def respondLink():
    data = json.loads(request.data)
    responseData = getVideo(data['url'], data['no'])
    return json.dumps(responseData)


@app.route('/search', methods=['POST'])
def respondSearch():
    data = json.loads(request.data)
    responseData = getResults(data['term'], data['website'])
    return json.dumps(responseData)


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    if path != '' and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')
