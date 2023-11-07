import sys
from flask import Flask, jsonify
from flask import request
from flask_cors import CORS, cross_origin
import json
from chatbotLogic import generate_answer
from tensorflow.keras.models import  model_from_json
app = Flask(__name__)
CORS(app)

import numpy as np
import pandas as pd
import json
import pickle


with open('intents.json', 'r') as f:
    data = json.load(f)

df = pd.DataFrame(data['intents'])


dic = {"tag":[], "patterns":[], "responses":[]}
for i in range(len(df)):
    ptrns = df[df.index == i]['patterns'].values[0]
    rspns = df[df.index == i]['responses'].values[0]
    tag = df[df.index == i]['tag'].values[0]
    for j in range(len(ptrns)):
        dic['tag'].append(tag)
        dic['patterns'].append(ptrns[j])
        dic['responses'].append(rspns)

df_nested_list = pd.DataFrame.from_dict(dic)

with open('./tokenizer.pickle', 'rb') as handle:
        tokenizer = pickle.load(handle)

vacab_size = len(tokenizer.word_index)

from tensorflow.keras.preprocessing.sequence import pad_sequences
from sklearn.preprocessing import LabelEncoder

ptrn2seq = tokenizer.texts_to_sequences(df_nested_list['patterns'])
X = pad_sequences(ptrn2seq, padding='post')

lbl_enc = LabelEncoder()
y = lbl_enc.fit_transform(df_nested_list['tag'])

    
json_file = open('model.json', 'r')
loaded_model_json = json_file.read()
json_file.close()
loaded_model = model_from_json(loaded_model_json)
# load weights into new model
loaded_model.load_weights("model.h5")
model=loaded_model
print("Loaded model from disk")


@app.route('/chatbot', methods=['POST'])
@cross_origin()

def predict():
    data = request.form
    if not data:
        data = request.json
    print(data)
    input = data['message']
    print(input)
    ans = generate_answer(input,tokenizer,pad_sequences,lbl_enc,df_nested_list,model)
    print(ans)

    return jsonify({'reply': ans})


if __name__ == "__main__":
    app.run(debug=True)
