import random
import requests
from bs4 import BeautifulSoup

#Data for parsing java
URL = "https://java-design-patterns.com/snippets/#algorithm"
page = requests.get(URL)
soup = BeautifulSoup(page.content, "html.parser")

class Java:
    @staticmethod
    def algorithms():
        algoList = [algorithmsElements.get_text() for algorithmsElements in soup.find_all("div", class_="language-java line-numbers-mode")]
        return algoList

    @staticmethod
    def randAlghoritm():
        randomText = random.choice(Java.algorithms())
        return randomText
    
    @staticmethod
    def clean_java_code():
        cleanList = str(Java.randAlghoritm()).lstrip(" ")
        return cleanList