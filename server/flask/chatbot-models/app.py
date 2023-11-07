import sys
from flask import Flask, jsonify
from flask import request
from flask_cors import CORS, cross_origin
import json
from chatbotLogic import generate_answer
app = Flask(__name__)
CORS(app)


@app.route('/chatbot', methods=['POST'])
@cross_origin()

def predict():
    data = request.form
    if not data:
        data = request.json
    print(data)
    input = data['message']
    print(input)
    ans = generate_answer(input)
    print(ans)
    return jsonify({'reply': ans})


if __name__ == "__main__":
    app.run(debug=True)
