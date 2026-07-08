# --- Import Core Libraries ---
from flask import Flask, request, jsonify,render_template
import joblib
import pandas as pd
from flask_cors import CORS

pipeline_path = 'diabetes_pipeline.joblib'
loaded_pipeline = joblib.load(pipeline_path)
print(f"Model pipeline from '{pipeline_path}' loaded successfully.")

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def home():
    return render_template('index.html')


@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        if data is None:
            return jsonify({"error": "No JSON data received"}), 400

        input_df = pd.DataFrame([data])

        prediction = loaded_pipeline.predict(input_df)
        prediction_probabilities = loaded_pipeline.predict_proba(input_df)

    except Exception as e:
        return jsonify({"error": f"Error during prediction: {e}"}), 400

    final_prediction_class = int(prediction[0])
    probabilities = prediction_probabilities[0]
    prediction_label = "Diabetic" if final_prediction_class == 1 else "Non-Diabetic"

    response_data = {
        "prediction_class": final_prediction_class,
        "prediction_label": prediction_label,
        "confidence_scores": {
            "Non-Diabetic": float(probabilities[0]),
            "Diabetic": float(probabilities[1])
        }
    }
    return jsonify(response_data)

if __name__ == '__main__':
    app.run(debug=True)