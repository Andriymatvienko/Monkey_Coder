import random
import requests
from bs4 import BeautifulSoup

#Data for parsing java
URL_Java = "https://java-design-patterns.com/snippets/#algorithm"
page = requests.get(URL_Java)
soup_java = BeautifulSoup(page.content, "html.parser")

#Data for parsing python
URL_Python = "https://www.javatpoint.com/python-algorithms"
page = requests.get(URL_Python)
soup_python = BeautifulSoup(page.content, "html.parser")

class Parser:
    @staticmethod
    def algorithms_Java():
        algoList = [algorithmsElements.get_text() for algorithmsElements in soup_java.find_all("div", class_="language-java line-numbers-mode")]
        return algoList

    @staticmethod
    def randAlghoritm_Java():
        randomText = random.choice(Parser.algorithms_Java())
        return randomText
    
    @staticmethod
    def clean_java_code():
        cleanList = str(Parser.randAlghoritm_Java()).lstrip(" ")
        return cleanList
    
    @staticmethod
    def algorithms_Python():
        algoList = [algorithmsElements.get_text() for algorithmsElements in soup_python.find_all("textarea", class_="python")]
        return algoList

    @staticmethod
    def randAlghoritm_Python():
        randomText = random.choice(Parser.algorithms_Python())
        return randomText
    
    @staticmethod
    def clean_python_code():
        cleanText = ""
        for line in Parser.randAlghoritm_Python().splitlines():
            if not line.strip().startswith("#"):
                cleanText += line + "\n"  
        return cleanText.lstrip()