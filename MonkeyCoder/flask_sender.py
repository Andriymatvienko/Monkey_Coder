from flask import Flask, jsonify, request
from flask_cors import CORS
from JP import Java
from PP import Python
import random

app = Flask(__name__)
CORS(app)

@app.route('/api/data', methods=['GET'])
def get_cleaned_code():
    language = request.args.get('language')
    if language == 'python':
        data = [Python.clean_python_code()]
    elif language == 'java':
        data = [Java.clean_java_code()]
    else:
        data = ["Choose your lang"]
    return jsonify(data)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)