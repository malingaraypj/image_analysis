import sys
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import load_img, img_to_array
import json

# Load the trained model
model = load_model('model.h5')

# List of class names (replace with your actual class names)
class_names = ['Class1', 'Class2', 'Class3']  # Replace with your actual class names

def predict_image_class(image_path):
    # Load and preprocess the image
    img = load_img(image_path, target_size=(224, 224))
    img_array = img_to_array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    # Make prediction
    predictions = model.predict(img_array)

    # Get the index of the highest predicted probability
    predicted_class_index = np.argmax(predictions)

    # Get the class name
    predicted_class_name = class_names[predicted_class_index]

    return predicted_class_name

if __name__ == "__main__":
    # The path of the image will be passed as a command line argument
    image_path = sys.argv[1]
    
    # Predict the class
    predicted_class = predict_image_class(image_path)
    
    # Return the prediction result as a JSON string
    result = {"predicted_class": predicted_class}
    print(json.dumps(result))
