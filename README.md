# Diabetes Prediction from Health Data

A full-stack machine learning application that predicts the likelihood of diabetes based on key health indicators. This project showcases an end-to-end workflow, from data analysis and model training to API deployment and a web-based user interface.

## Features

-   **Exploratory Data Analysis (EDA):** In-depth analysis and visualization of the PIMA Indians Diabetes Database.
-   **Data Preprocessing:** Handled missing values (imputation) and standardized features for optimal model performance.
-   **Multi-Model Training:** Trained and evaluated several classification algorithms, including Logistic Regression, K-Nearest Neighbors, Random Forest, and XGBoost.
-   **Hyperparameter Tuning:** Utilized `GridSearchCV` to find the optimal parameters for the best-performing model (XGBoost).
-   **Reusable ML Pipeline:** Encapsulated the entire preprocessing and prediction workflow into a single, robust `scikit-learn` Pipeline.
-   **REST API:** Deployed the trained pipeline as a RESTful API using **Flask**, making the model accessible for predictions via web requests.
-   **Interactive Web Interface:** Built a user-friendly front-end with **HTML, CSS, and JavaScript** that allows users to input patient data and receive real-time predictions from the API.
-   **Single-Origin Web App:** Flask serves the HTML front-end directly (via `templates/` and `static/`), so the form and the API run on the same origin — no CORS workarounds needed.

---

## Technology Stack

-   **Backend:** Python, Flask
-   **Machine Learning:** Scikit-learn, Pandas, NumPy, XGBoost
-   **Data Visualization:** Matplotlib, Seaborn
-   **Frontend:** HTML, CSS, JavaScript (with Fetch API), Tailwind CSS (via CDN)
-   **Development Environment:** Jupyter Notebook, Git

---

## Project Structure

```
diabetes-prediction-project/
├── app.py                     # Flask app: serves the web page and the /predict API
├── diabetes_pipeline.joblib   # Trained scikit-learn pipeline
├── diabetes.csv                # Raw dataset used for EDA and model training
├── diabetes_prediction.ipynb  # Notebook covering EDA, preprocessing, and model training
├── requirements.txt
├── .gitignore
├── templates/
│   └── index.html             # Prediction form (rendered by Flask)
└── static/
    └── script.js              # Handles form submission and displays results
```

---

## Setup and Installation

To run this project locally, please follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2.  **Create and activate a Python virtual environment:**
    ```bash
    # For macOS/Linux
    python3 -m venv venv
    source venv/bin/activate

    # For Windows
    python -m venv venv
    .\venv\Scripts\activate
    ```

3.  **Install the required dependencies:**
    The project's dependencies are listed in the `requirements.txt` file.
    ```bash
    pip install -r requirements.txt
    ```

---

## How to Run

Once the setup is complete, you can run the application with the following steps:

1.  **Start the Flask server:**
    Open a terminal and run the `app.py` script.
    ```bash
    python app.py
    ```
    You should see a message indicating the server is running on `http://127.0.0.1:5000`.

2.  **Open the web app:**
    Go to `http://127.0.0.1:5000` in your browser. Flask serves the prediction form directly — there's no separate HTML file to open manually.

---

## API Endpoint Details

The application's prediction logic is exposed via a single API endpoint.

-   **URL:** `/predict`
-   **Method:** `POST`
-   **Description:** Accepts patient health data in JSON format and returns a diabetes prediction.

#### Example Request Payload:

```json
{
    "Pregnancies": 6,
    "Glucose": 148,
    "BloodPressure": 72,
    "SkinThickness": 35,
    "Insulin": 0,
    "BMI": 33.6,
    "DiabetesPedigreeFunction": 0.627,
    "Age": 50
}
```

#### Example Response:

```json
{
    "prediction_class": 1,
    "prediction_label": "Diabetic",
    "confidence_scores": {
        "Non-Diabetic": 0.23,
        "Diabetic": 0.77
    }
}
```