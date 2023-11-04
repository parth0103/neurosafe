import tensorflow 
import pandas as pd
import re
import random
import json
import pickle
import numpy as np
from sklearn.preprocessing import LabelEncoder
from tensorflow.keras.preprocessing.sequence import pad_sequences


from tensorflow.keras.models import  model_from_json
def generate_answer(pattern):

    tokenizer = pickle.load(open('./tokenizer.pickle', 'rb'))
    json_file = open('model.json', 'r')
    loaded_model_json = json_file.read()
    json_file.close()
    loaded_model = model_from_json(loaded_model_json)
    # load weights into new model
    loaded_model.load_weights("model.h5")
    print("Loaded model from disk")
    model = loaded_model

    lbl_enc = LabelEncoder()


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

    ptrn2seq = tokenizer.texts_to_sequences(df_nested_list['patterns'])
    X = pad_sequences(ptrn2seq, padding='post')

    text = []
    txt = re.sub('[^a-zA-Z\']', ' ', pattern)
    txt = txt.lower()
    txt = txt.split()
    txt = " ".join(txt)
    text.append(txt)
    y = lbl_enc.fit_transform(df_nested_list['tag'])
    x_test = tokenizer.texts_to_sequences(text)
    print(len(x_test))
    if len(x_test) == 0:
        return "Sorry, I didn't get that, please rephrase your question"
    elif len(x_test)>1:
        x_test = np.array(x_test).squeeze()
    else:
        x_test = np.array(x_test)
    x_test = pad_sequences([x_test], padding='post', maxlen=X.shape[1])
    y_pred = model.predict(x_test)
    y_pred = y_pred.argmax()
    tag = lbl_enc.inverse_transform([y_pred])[0]
    responses = df_nested_list[df_nested_list['tag'] == tag]['responses'].values[0]

    print("you: {}".format(pattern))
    print("model: {}".format(random.choice(responses)))
    return random.choice(responses)


# generate_answer("i")
# generate_answer("i want to buy a car")