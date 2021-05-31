from flask import Flask, jsonify, request
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
import layPhanHoi


@app.route('/api/bot',methods=['POST'])
def index():
    user_input = request.json['user_input']
    return jsonify({'Bot':str(layPhanHoi.chatbot_response(user_input))})


if __name__ == '__main__':
        app.run(host='192.168.1.4', port=8163, debug=True)
