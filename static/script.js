const predictionForm = document.getElementById('prediction-form');

predictionForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // Elements for controlling view visibility
    const formView = document.getElementById('form-view');
    const resultView = document.getElementById('result-view');

    // Result details placeholder targets
    const resultIcon = document.getElementById('result-icon');
    const resultLabel = document.getElementById('result-label');
    const probabilityContext = document.getElementById('probability-context');
    const resultProbability = document.getElementById('result-probability');

    const formData = new FormData(predictionForm);
    const data = Object.fromEntries(formData.entries());

    for (const key in data) {
        data[key] = parseFloat(data[key]);
    }

    const jsonPayload = JSON.stringify(data);

    fetch('/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonPayload
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Server responded with an error: ${response.status}`);
        }
        return response.json();
    })
    .then(predictionData => {
        const label = predictionData.prediction_label;
        console.log(predictionData)
        const isDiabetic = label === 'Diabetic';

        // 1. Assign values, emoticons, and contextual words precisely matching image_1b12a3.png
        if (isDiabetic) {
            resultIcon.textContent = "🩸";
            resultLabel.textContent = "Diabetic";
            probabilityContext.textContent = "diabetic";

            // Extract confidence and format string percentage
            const confidenceDiabetic = (predictionData.confidence_scores['Diabetic'] * 100).toFixed(2);
            resultProbability.textContent = `${confidenceDiabetic}%`;
        } else {
            resultIcon.textContent = "💚";
            resultLabel.textContent = "Non-Diabetic";
            probabilityContext.textContent = "non-diabetic";

            const confidenceNonDiabetic = (predictionData.confidence_scores['Non-Diabetic'] * 100).toFixed(2);
            resultProbability.textContent = `${confidenceNonDiabetic}%`;
        }

        // 2. Hide the Form View and display the customized Result View instantly
        if (formView && resultView) {
            formView.classList.add('hidden');
            resultView.classList.remove('hidden');
        }
    })
    .catch(error => {
        console.error("Error communicating with the API:", error);

        // Render fallback container inline inside the active screen view if an exception breaks the promise chain
        const resultContainer = document.getElementById('result-container');
        if (resultContainer) {
            resultContainer.innerHTML = `
                <div class="mt-6 p-4 rounded-base border border-danger bg-red-50 text-center">
                    <p class="text-sm font-medium text-danger-strong">Something went wrong: ${error.message}</p>
                </div>
            `;
        }
    });
});

// 3. Set up the back navigation handler button action logic
const goBackBtn = document.getElementById('go-back-btn');
if (goBackBtn) {
    goBackBtn.addEventListener('click', function() {
        const formView = document.getElementById('form-view');
        const resultView = document.getElementById('result-view');

        if (formView && resultView) {
            resultView.classList.add('hidden');
            formView.classList.remove('hidden');
            predictionForm.reset(); // Clear old input fields out for a clean slate

            // Wipe out standard error banners if present
            const resultContainer = document.getElementById('result-container');
            if (resultContainer) resultContainer.innerHTML = '';
        }
    });
}