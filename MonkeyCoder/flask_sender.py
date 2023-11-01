from flask import Flask, jsonify
from flask_cors import CORS
from Parser import Parser 

class Flask():
    app = Flask(__name__)
    CORS(app)

    @app.route('/api/data', methods=['GET'])
    def get_paragraphs():
        data = [Parser.cleaner()]
        return jsonify(data)

    if __name__ == '__main__':
        app.run(host='0.0.0.0', port=8080)

    CORS(app, resources={r"/api/*": {"origins": "http://127.0.0.1:5501"}})