import random
import requests
from bs4 import BeautifulSoup

#Data for parsing
URL = "https://java-design-patterns.com/snippets/#algorithm"
page = requests.get(URL)
soup = BeautifulSoup(page.content, "html.parser")

class Parser:
    @staticmethod
    def algorithms():
        algoList = [algorithmsElements.get_text() for algorithmsElements in soup.find_all("div", class_="language-java line-numbers-mode")]
        return algoList

    @staticmethod
    def randAlghoritm():
        randomText = random.choice(Parser.algorithms())
        return randomText
    
    @staticmethod
    def cleaner():
        cleanList = str(Parser.randAlghoritm()).lstrip(" ")
        return cleanList

#algorithmsNameList = [nameElements.get_text() for nameElements in soup.find_all("h3")]