import os
import json
from database import *

def extract_route(req):
    print(req)
    lista1 = req.split(" /")
    lista2 = lista1[1].split(" ")
    return lista2[0]

def read_file(filepath):
    string = str(filepath)
    extensao = string.split(".")
    tipo = extensao[1]
    if tipo == "txt" or tipo == "html" or tipo == "css" or tipo == "js":
        with open(filepath, "rt", encoding="UTF-8") as text:
            lido = text.read()
            return lido
    with open(filepath, "rb") as binary:
        lido = binary.read()
        return lido

def load_data(nomeJson):
    filepath = "data/"+nomeJson
    if os.stat(filepath).st_size == 0:
        print('File is empty')
        return []
    with open(filepath,"rt", encoding="UTF-8") as text:
        content = text.read()
        contentPython = json.loads(content)
        return contentPython

def load_template(nomeHtml):
    filepath = "templates/"+nomeHtml
    content = read_file(filepath)
    return content

def writeNote(dictionary, database):
    data = Note(title=dictionary['titulo'], content=dictionary['detalhes'])
    database.add(data)
def build_response(body='', code=200, reason='OK', headers=''):
    defaultResponse = "HTTP/1.1 " + str(code) + " " + reason
    if headers != '':
        defaultResponse += f"\n{headers}"
    defaultResponse+=f"\n\n{body}"
    return (defaultResponse).encode()
    
        