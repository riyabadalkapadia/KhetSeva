from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
from sklearn.linear_model import LogisticRegression
from werkzeug.utils import secure_filename
import os
from flask import render_template, redirect, url_for, send_from_directory, flash
import tensorflow as tf
import h5py
from PIL import Image
from keras.models import load_model
import random


app = Flask(__name__)
CORS(app)

BASE_DIR = os.path.dirname(os.path.realpath(__file__))
MODEL_DIR = os.path.join(BASE_DIR, 'models') 
print('model dir- ', MODEL_DIR)
print('loading th emodel --------',os.path.join(MODEL_DIR, 'crop_reco.pkl'))

# Load the model
REC_MODEL = pickle.load(open(os.path.join(MODEL_DIR, 'RF.pkl'), 'rb'))
# REC_MODEL = pickle.load(open(os.path.join(MODEL_DIR, 'crop_recoDistrict.pkl'), 'rb'))




import numpy as np
import joblib
import pandas as pd
# Load the model
# with open(os.path.join(MODEL_DIR, 'crop_fertilizer_model.pkl'), 'rb') as f:
#     REC_MODEL = pickle.load(f)

# Check the type of the loaded object
print("Type of REC_MODEL:", type(REC_MODEL))


loaded_model = joblib.load(os.path.join(MODEL_DIR,'multi_output_classifier_model (1).joblib'))




# REC_MODEL=load_model(os.path.join(MODEL_DIR, 'crop_recoDistrict.h5'))

# REC_MODEL = tf.keras.models.load_model("C://Users//Jash//Desktop//Major Project//KhetSeva//backend//models//crop_reco.h5")

# with h5py.File(os.path.join(MODEL_DIR, 'crop_reco.h5'), 'r') as f:
#     # Load the model architecture and weights
#     REC_MODEL = tf.keras.models.load_model(f)


UPLOAD_FOLDER = os.path.join(BASE_DIR, 'bucket')
print("my basedir is =================",BASE_DIR)
print('my upload folder is ============', UPLOAD_FOLDER)

# Create the upload directory if it doesn't exist
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'JPG'}

model_name='efficientnetv2s_PLANT_DISEASE.h5'
MODEL = tf.keras.models.load_model(os.path.join(MODEL_DIR, model_name))



pricePredModel = joblib.load(os.path.join(MODEL_DIR,'RFPricePred.pkl'))

CLASSES = ['Apple scab', 'Apple Black rot', 'Apple Cedar apple rust', 'Apple healthy', 'Blueberry healthy', 'Cherry (including sour) Powdery mildew', 'Cherry (including sour) healthy', 'Corn (maize) Cercospora leaf spot Gray leaf spot', 'Corn(maize) Common rust', 'Corn(maize) Northern Leaf Blight', 'Corn(maize) healthy', 'Grape Black rot', 'Grape Esca(Black Measles)', 'Grape Leaf blight(Isariopsis Leaf Spot)', 'Grape healthy', 'Orange Haunglongbing(Citrus greening)', 'Peach Bacterial spot', 'Peach healthy', 'Bell PepperBacterial_spot', 'Pepper bell healthy', 'Potato Early blight', 'Potato Late blight', 'Potato healthy', 'Raspberry healthy', 'Soybean healthy', 'Squash Powdery mildew', 'Strawberry Leaf scorch', 'Strawberry healthy', 'Tomato Bacterial spot', 'Tomato Early blight', 'Tomato Late blight', 'Tomato Leaf Mold', 'Tomato Septoria leaf spot', 'Tomato Spider mites (Two-spotted spider mite)', 'Tomato Target Spot', 'Tomato Yellow Leaf Curl Virus', 'Tomato mosaic virus', 'Tomato healthy']

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/detect-disease', methods=['GET', 'POST'])
def plantdisease():
    try:
        
        if request.method == 'POST':
            print("file requeseted is---------------------------",request.files)
            

            if 'image' not in request.files:
                return jsonify({'error': 'No file part'}), 400
            image_file = request.files['image']
            print('the fileeeeee -', image_file)
            if image_file.filename == '':
                return jsonify({'error': 'No selected file'}), 400
            if image_file and allowed_file(image_file.filename):
                filename = secure_filename(image_file.filename)
                image_file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
                
                model = MODEL
                imagefile = tf.keras.utils.load_img(os.path.join(app.config['UPLOAD_FOLDER'], filename), target_size=(224, 224, 3))

                print(os.path.join(app.config['UPLOAD_FOLDER'], filename))

                input_arr = tf.keras.preprocessing.image.img_to_array(imagefile)
                input_arr = np.array([input_arr])
                predict = model.predict(input_arr)
                probability_model = tf.keras.Sequential([model, tf.keras.layers.Softmax()])
                predict = probability_model.predict(input_arr)
                p = np.argmax(predict[0])
                res = CLASSES[p]
                return jsonify({'result': res}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    return jsonify({'error': 'Invalid request'}), 400




















# from sklearn.preprocessing import LabelEncoder

# label_encoders = {
#     'Crop': LabelEncoder(),
#     'Fertilizer': LabelEncoder()
# }

# training_data = pd.read_csv('backend/my_try/Crop and fertilizer dataset.csv')

# # Fit label encoders
# for column in ['Crop', 'Fertilizer']:
#     label_encoders[column].fit(training_data[column])


@app.route('/recommend-crop', methods=['GET','POST'])
def recommend_crop():
    if request.method == 'POST':
        try:
            crop_link={'rice':'https://youtu.be/jvixDVYRMDs', 'maize':'https://youtu.be/nZxrPsXAJE28', 'chickpea':'https://www.youtube.com/watch?v=KHw_sfgacHA&pp=ygUlY2hpY2twZWFuIGZhZW1pbmcgcmVzb3VyY2UgaW4gbWFyYXRoaQ%3D%3D', 'kidneybeans':'https://www.youtube.com/watch?v=4i8OYG0luYo&pp=ygUra2lkbmV5IGJlYW5zIGZhcm1pbmcgaW5mb3JtYXRpb24gaW4gbWFyYXRoaQ%3D%3D', 'pigeonpeas':'https://youtu.be/WaWgxSZHiWo', 'mothbeans':'https://www.youtube.com/watch?v=v9JR6_iiB3k', 'mungbean':'https://www.youtube.com/watch?v=EEF1xdDpR1A&pp=ygUbbXVuZ2JlYW4gZmFybWluZyBpbiBtYXJhdGhp', 'blackgram':'https://youtu.be/XtPP-cXCip8', 'lentil':'https://youtu.be/RcLaiAgFzrQ','pomegranate':'https://www.youtube.com/watch?v=jT-jCXKL7Ok&pp=ygUecG9tZWdyYW5hdGUgZmFybWluZyBpbiBtYXJhdGhp','banana':'https://www.youtube.com/watch?v=id3jI6SDfmQ&pp=ygUlYmFuYW5hIGZhcm1pbmcgaW4gbWFoYXJhc2h0cmEgbWFyYXRoaQ%3D%3D', 'mango':'https://www.youtube.com/watch?v=hDLyQzcLEnc&pp=ygUdbWFuZ28gZmFybWluZyBpbiBtYWhhcmFzaHRyYSA%3D','grapes':'https://www.youtube.com/watch?v=5yr45vPtYW4&pp=ygUZZ3JhcGVzIGZhcm1pbmcgaW4gbWFyYXRoaQ%3D%3D', 'watermelon':'https://www.youtube.com/watch?v=acVqOCxGlgE&pp=ygUdd2F0ZXJtZWxvbiBmYXJtaW5nIGluIG1hcmF0aGk%3D', 'muskmelon':'https://www.youtube.com/watch?v=spVzDrwsQEs&pp=ygUcbXVza21lbG9uIGZhcm1pbmcgaW4gbWFyYXRoaQ%3D%3D', 'apple':'https://www.youtube.com/watch?v=6BNxUnCCyBc&pp=ygUcYXBwbGUgZmFybWluZyBpbiBtYWhhcmFzaHRyYQ%3D%3D', 'orange':'https://www.youtube.com/watch?v=DUeYkt8z8qI&pp=ygUdb3JhbmdlIGZhcm1pbmcgaW4gbWFoYXJhc2h0cmE%3D', 'papaya':'https://www.youtube.com/watch?v=BMI91po3HZg&pp=ygUdcGFwYXlhIGZhcm1pbmcgaW4gbWFoYXJhc2h0cmE%3D', 'coconut':'https://www.youtube.com/watch?v=lJlcoAnU2ZU&pp=ygUeY29jb251dCBmYXJtaW5nIGluIG1haGFyYXNodHJh', 'cotton':'https://www.youtube.com/watch?v=lKhkdAToi5w&pp=ygUbanV0ZSBmYXJtaW5nIGluIG1haGFyYXNodHJh','jute':'https://www.youtube.com/watch?v=lKhkdAToi5w&pp=ygUbanV0ZSBmYXJtaW5nIGluIG1haGFyYXNodHJh', 'coffee':'https://www.youtube.com/watch?v=zIYSQPANYss'}
            # crop_fert={'rice':'https://youtu.be/jvixDVYRMDs', 'maize':'https://youtu.be/nZxrPsXAJE28', 'chickpea', 'kidneybeans', 'pigeonpeas', 'mothbeans', 'mungbean', 'blackgram', 'lentil','pomegranate','banana', 'mango','grapes', 'watermelon', 'muskmelon', 'apple', 'orange', 'papaya', 'coconut', 'cotton','jute', 'coffee'}
            fertilizers = [
                'Urea',
                'DAP',
                'MOP',
                '10:26:26 NPK',
                'SSP',
                'Magnesium Sulphate',
                '13:32:26 NPK',
                '12:32:16 NPK',
                '50:26:26 NPK',
                '19:19:19 NPK',
                'Chilated Micronutrient',
                '18:46:00 NPK',
                'Sulphur',
                '20:20:20 NPK',
                'Ammonium Sulphate',
                'Ferrous Sulphate',
                'White Potash',
                '10:10:10 NPK',
                'Hydrated Lime'
            ]

            #     # Get user input from JSON payload
            input_data = request.json
            
            # # Convert input data to DataFrame
            # user_input = pd.DataFrame(input_data, index=[0])
            
            # # Perform any necessary preprocessing
            # # For example, label encoding for categorical variables
            # for column in ['District_Name', 'Soil_color']:
            #     user_input[column] = label_encoders[column].transform([user_input[column]])[0]
            
            # # Make prediction
            # prediction = loaded_model.predict(user_input)
            
            # # Decode predicted labels
            # predicted_crop = label_encoders['Crop'].inverse_transform(prediction[0])[0]
            # predicted_fertilizer = label_encoders['Fertilizer'].inverse_transform(prediction[1])[0]
            # link = prediction[2]  # Assuming link is not encoded
            
            # # Prepare response
            # response = {
            #     'crop': predicted_crop,
            #     'fertilizer': predicted_fertilizer,
            #     'link': link
            # }
            # return jsonify(response)

        #     print(data)

        #     inputs = [ data.get('district', 0),
        #             data.get('soil_color',0),
        #             float(data.get('nitrogen', 0)),
        #             float(data.get('phosphorous', 0)),
        #             float(data.get('potassium', 0)),
        #             float(data.get('ph', 0)),
        #             float(data.get('rainfall', 0)),
        #             float(data.get('temperature', 0)),
        #             ]
        #     print('inputs = ', inputs)
            inputs =[       float(input_data.get('nitrogen', 0)), 
                            float(input_data.get('phosphorous', 0)), 
                            float(input_data.get('potassium', 0)), 
                            float(input_data.get('temperature', 0)), 
                            float(input_data.get('humidity', 0)), 
                            float(input_data.get('ph', 0)), 
                            float(input_data.get('rainfall', 0))] 
            print(inputs)

            
            # jeje's code
        

            # Extract input features
            # district = data.get('district', '')
            # soil_color = data.get('soil_color', '')
            # nitrogen = float(data.get('nitrogen', 0))
            # phosphorus = float(data.get('phosphorus', 0))
            # potassium = float(data.get('potassium', 0))
            # pH = float(data.get('ph', 0))
            # rainfall = float(data.get('rainfall', 0))
            # temperature = float(data.get('temperature', 0))
            
            # crop = REC_MODEL.predict([[district, soil_color, nitrogen, phosphorus, potassium, pH, rainfall, temperature]])
            # crop = REC_MODEL.predict([[data['district'], data['soil_color'], data['nitrogen'], data['phosphorus'], data['potassium'], data['pH'], data['rainfall'], data['temperature']]])
            # crop = REC_MODEL.predict(np.array(inputs).reshape(1,-1))[0]
            # crop = REC_MODEL.predict([['kolhapur', 'black', 54 , 32, 42, 5, 800, 25]])
            # print(crop)
            
            # return jsonify({'crop': crop})
            
            res1 = REC_MODEL.predict(np.array(inputs).reshape(1, -1))[0]
            fert = random.choice(fertilizers)
            print(fert)
            if res1 in crop_link:
                recommended_link = crop_link[res1]
            else:
                recommended_link = 'Link not available'
            return jsonify({'crop1': res1, 'link':recommended_link, 'fertilizer':fert})
        
        except Exception as e:
            return jsonify({'error': str(e)}), 500

        
            

    #     # res = REC_MODEL.predict([inputs])
    #     res = REC_MODEL.predict(np.array(inputs).reshape(1, -1))[0]

    #     return jsonify({'crop': res.tolist()})
    # except Exception as e:
    #     return jsonify({'error': str(e)}), 500




@app.route('/predictPrice', methods=['GET','POST'])
def pricePred():
    if request.method == 'POST':
        try:
                       #     # Get user input from JSON payload
            input_data = request.json

            month = input_data['month']
            year = input_data['year']
            rainfall = input_data['rainfall_mm']
            crop = input_data['crop']

            # Prepare the input data
            user_input = {
                'Month': [month],
                'Year': [year],
                'Rainfall': [rainfall],
                'Crop_Coconut': [1 if crop == 'Coconut' else 0],
                'Crop_Cotton': [1 if crop == 'Cotton' else 0],
                'Crop_Gram': [1 if crop == 'Gram' else 0],
                'Crop_Jute': [1 if crop == 'Jute' else 0],
                'Crop_Maize': [1 if crop == 'Maize' else 0],
                'Crop_Moong': [1 if crop == 'Moong' else 0],
                'Crop_Wheat': [1 if crop == 'Wheat' else 0]
            }
            user_input_df = pd.DataFrame(user_input)
            print(user_input_df)
       
            # Make prediction
            prediction = pricePredModel.predict(user_input_df)

            return jsonify({'predicted_wpi': prediction[0]})

        
        except Exception as e:
            return jsonify({'error': str(e)}), 500

        

if __name__ == '__main__':
    app.run(debug=True)
