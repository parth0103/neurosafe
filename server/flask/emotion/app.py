import sys
from flask import Flask, jsonify
from flask import request
from flask_cors import CORS, cross_origin
import json
from utility import predict_stress
app = Flask(__name__)
CORS(app)


@app.route('/predict', methods=['POST'])
@cross_origin()
def predict():
    data = request.form
    if not data:
        data = request.json
    print(data)
    input = data['input']
    print(input)
    ans = predict_stress(input)
    return jsonify({'sentiment': ans})

@app.route('/predict', methods=['GET'])
def pred():
    return "Hey!"

if __name__ == "__main__":
    app.run(debug=True, port=5000)
