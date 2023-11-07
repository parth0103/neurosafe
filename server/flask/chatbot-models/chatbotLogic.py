# import tensorflow 
# import pandas as pd
# import re
# import random
# import json
# import pickle
# import numpy as np
# from sklearn.preprocessing import LabelEncoder
# from tensorflow.keras.preprocessing.sequence import pad_sequences
# from tensorflow.keras.preprocessing.text import Tokenizer


# from tensorflow.keras.models import  model_from_json
# def generate_answer(pattern):
#     # tokenizer=none
#     # with open('./tokenizer.pickle', 'rb') as handle:
#     #     tokenizer = pickle.load(handle)
#     json_file = open('model.json', 'r')
#     loaded_model_json = json_file.read()
#     json_file.close()
#     loaded_model = model_from_json(loaded_model_json)
#     # load weights into new model
#     loaded_model.load_weights("model.h5")
#     print("Loaded model from disk")
#     model = loaded_model

#     lbl_enc = LabelEncoder()
#     # data=none
#     with open('intents.json', 'r') as f:
#         data = json.load(f)

#     df = pd.DataFrame(data['intents'])

#     dic = {"tag":[], "patterns":[], "responses":[]}
#     for i in range(len(df)):
#         ptrns = df[df.index == i]['patterns'].values[0]
#         rspns = df[df.index == i]['responses'].values[0]
#         tag = df[df.index == i]['tag'].values[0]
#         for j in range(len(ptrns)):
#             dic['tag'].append(tag)
#             dic['patterns'].append(ptrns[j])
#             dic['responses'].append(rspns)

#     df_nested_list = pd.DataFrame.from_dict(dic)

#     tokenizer = Tokenizer(lower=True, split=' ')
#     tokenizer.fit_on_texts(df_nested_list['patterns'])
#     tokenizer.get_config()

#     ptrn2seq = tokenizer.texts_to_sequences(df_nested_list['patterns'])
#     X = pad_sequences(ptrn2seq, padding='post')

#     text = []
#     txt = re.sub('[^a-zA-Z\']', ' ', pattern)
#     txt = txt.lower()
#     txt = txt.split()
#     txt = " ".join(txt)
#     text.append(txt)
#     y = lbl_enc.fit_transform(df_nested_list['tag'])
#     x_test = tokenizer.texts_to_sequences(text)
#     print(len(x_test))
#     if len(x_test) == 0:
#         return "Sorry, I didn't get that, please rephrase your question"
#     elif len(x_test)>1:
#         x_test = np.array(x_test).squeeze()
#     else:
#         x_test = np.array(x_test)
#     x_test = pad_sequences([x_test], padding='post', maxlen=X.shape[1])
#     y_pred = model.predict(x_test)
#     y_pred = y_pred.argmax()
#     tag = lbl_enc.inverse_transform([y_pred])[0]
#     responses = df_nested_list[df_nested_list['tag'] == tag]['responses'].values[0]

#     print("you: {}".format(pattern))
#     print("model: {}".format(random.choice(responses)))
#     return random.choice(responses)

# # while(True):

# #     input = input("Enter your question: ")
# #     if(input == "exit"):
# #         break
# #     generate_answer(input)
# generate_answer("bad")
# generate_answer("i want to buy a car")



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
# from tensorflow.keras.preprocessing.text import Tokenizer
# tokenizer = Tokenizer(lower=True, split=' ')
# tokenizer.fit_on_texts(df_nested_list['patterns'])
# tokenizer.get_config()

vacab_size = len(tokenizer.word_index)

from tensorflow.keras.preprocessing.sequence import pad_sequences
from sklearn.preprocessing import LabelEncoder

ptrn2seq = tokenizer.texts_to_sequences(df_nested_list['patterns'])
X = pad_sequences(ptrn2seq, padding='post')

lbl_enc = LabelEncoder()
y = lbl_enc.fit_transform(df_nested_list['tag'])
# print('y shape = ', y.shape)
# print('num of classes = ', len(np.unique(y)))

# import tensorflow
from tensorflow import keras
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Input, Embedding, LSTM, LayerNormalization, Dense, Dropout
# from tensorflow.keras.utils import plot_model

# model = Sequential()
# model.add(Input(shape=(X.shape[1])))
# model.add(Embedding(input_dim=vacab_size+1, output_dim=100, mask_zero=True))
# model.add(LSTM(32, return_sequences=True))
# model.add(LayerNormalization())
# model.add(LSTM(32, return_sequences=True))
# model.add(LayerNormalization())
# model.add(LSTM(32))
# model.add(LayerNormalization())
# model.add(Dense(128, activation="relu"))
# model.add(LayerNormalization())
# model.add(Dense(128, activation="relu"))
# model.add(LayerNormalization())
# model.add(Dropout(0.2))
# model.add(Dense(128, activation="relu"))
# model.add(LayerNormalization())
# model.add(Dropout(0.2))
# model.add(Dense(len(np.unique(y)), activation="softmax"))
# model.compile(optimizer='adam', loss="sparse_categorical_crossentropy", metrics=['accuracy'])

# model.summary()
# # plot_model(model, show_shapes=True)

# model_history = model.fit(x=X,
#                           y=y,
#                           batch_size=10,
#                           callbacks=[tensorflow.keras.callbacks.EarlyStopping(monitor='accuracy', patience=3000)],
#                           epochs=75)

# model.save_weights("model.h5")
# model_json = model.to_json()
# with open("model.json", "w") as json_file:
#     json_file.write(model_json)
from tensorflow.keras.models import  model_from_json


print("Loaded model from disk")



def generate_answer(pattern,tokenizer,pad_sequences,lbl_enc,df_nested_list,model):
    import numpy as np
    import re
    import random
    
    text = []
    txt = re.sub('[^a-zA-Z\']', ' ', pattern)
    txt = txt.lower()
    txt = txt.split()
    if(len(txt)<=1):
      return "Sorry, I didn't get that, please rephrase your question"
    txt = " ".join(txt)
    text.append(txt)

    x_test = tokenizer.texts_to_sequences(text)
    x_test = np.array(x_test).squeeze()
    x_test = pad_sequences([x_test], padding='post', maxlen=X.shape[1])
    y_pred = model.predict(x_test)
    y_pred = y_pred.argmax()
    tag = lbl_enc.inverse_transform([y_pred])[0]
    responses = df_nested_list[df_nested_list['tag'] == tag]['responses'].values[0]

    print("you: {}".format(pattern))
    print("model: {}".format(random.choice(responses)))
    return random.choice(responses)

# generate_answer('bad')