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

url = 'https://vidstreaming.io/download?id=MTE4NTcy&title=&typesub='
res = requests.get(url)
soup = BeautifulSoup(res.content, "lxml")
mydivs = soup.findAll("div", {"class": "dowload"})
links = []
for div in mydivs:
    for link in div.findAll('a'):
        if link.getText() != 'Download For Ad':
            links.append(link.get('href'))
print(links)
