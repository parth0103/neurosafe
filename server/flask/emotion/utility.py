import pickle
import numpy as np
from tensorflow.keras.utils import pad_sequences
from tensorflow.keras.models import Model
from tensorflow.keras.models import model_from_json

model = None
tokenizer = None

def loadModel():
    global model, tokenizer
    json_file = open('./models/model2.json', 'r')
    loaded_model_json = json_file.read()
    json_file.close()
    loaded_model = model_from_json(loaded_model_json)
    loaded_model.load_weights("./models/model2.h5")
    print("Loaded model from disk")
    with open('./models/tokenizer.pickle', 'rb') as handle:
        tokenizer = pickle.load(handle)
    
    return (loaded_model, tokenizer)


em_map = {
    '0': 'sadness',
    '1': 'joy',
    '2': 'love',
    '3': 'anger',
    '4': 'fear',
    '5': 'surprise'
}

labels = [i for i in range(6)]

model, tokenizer = loadModel()

def predict_stress(input):
    global model, tokenizer
    
    input_sequence = tokenizer.texts_to_sequences([input])
    input_train=pad_sequences(input_sequence,maxlen=36)
    input_predict = model.predict(input_train, batch_size=1, verbose=1)
    pred_labels=labels[np.argmax(input_predict)]

    return em_map[str(pred_labels)]
