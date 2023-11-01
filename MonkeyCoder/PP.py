import random
import requests
from bs4 import BeautifulSoup

#Data for parsing python
URL = "https://www.javatpoint.com/python-algorithms"
page = requests.get(URL)
soup = BeautifulSoup(page.content, "html.parser")


class Python:
    @staticmethod
    def algorithms():
        algoList = [algorithmsElements.get_text() for algorithmsElements in soup.find_all("textarea", class_="python")]
        return algoList

    @staticmethod
    def randAlghoritm():
        randomText = random.choice(Python.algorithms())
        return randomText
    
    @staticmethod
    def clean_python_code():
        cleanText = ""
        for line in Python.randAlghoritm().splitlines():
            if not line.strip().startswith("#"):
                cleanText += line + "\n"  
        return cleanText.lstrip()