from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
from sklearn.linear_model import LogisticRegression

app = Flask(__name__)
CORS(app)

# Load the model
with open('backend/models/RF.pkl', 'rb') as f:
    model1 = pickle.load(f)

# Define the route to receive inputs and predict the crop
@app.route('/recommend-crop', methods=['POST'])
def recommend_crop():
    if request.method == 'POST':
            X = []
            if request.form.get('nitrogen'):
                X.append(float(request.form.get('nitrogen')))
            if request.form.get('phosphorous'):
                X.append(float(request.form.get('phosphorous')))
            if request.form.get('potassium'):
                X.append(float(request.form.get('potassium')))
            if request.form.get('temperature'):
                X.append(float(request.form.get('temperature')))
            if request.form.get('humidity'):
                X.append(float(request.form.get('humidity')))
            if request.form.get('ph'):
                X.append(float(request.form.get('ph')))
            if request.form.get('rainfall'):
                X.append(float(request.form.get('rainfall')))
            X = np.array(X)
            X = X.reshape(1, -1)
            res = model1.predict(X)[0]
            # print(res)
            return jsonify({'crop1': res})
        

if __name__ == '__main__':
    app.run(debug=True)
