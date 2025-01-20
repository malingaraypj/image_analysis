from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import load_img, img_to_array
import numpy as np
import tempfile

# Flask app
app = Flask(__name__)

# Load the trained model
model = load_model('model.h5')

# Define class names
class_names = ['MildDemented', 'ModerateDemented', 'NonDemented', 'VeryMildDemented']

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'}), 400

    # Get the uploaded image file
    image_file = request.files['image']

    try:
        # Use a temporary file for processing
        with tempfile.NamedTemporaryFile(delete=False) as temp_file:
            image_file.save(temp_file.name)

            # Process the image
            img = load_img(temp_file.name, target_size=(224, 224))
            img_array = img_to_array(img) / 255.0
            img_array = np.expand_dims(img_array, axis=0)

            # Prediction
            predictions = model.predict(img_array)
            predicted_class_index = np.argmax(predictions)
            predicted_class_name = class_names[predicted_class_index]
            confidence = float(predictions[0][predicted_class_index])

        # Return the result
        return jsonify({
            'predicted_class': predicted_class_name,
            'confidence': confidence
        })

    except Exception as e:
        return jsonify({'error': 'Error processing the image', 'message': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
