const predictionForm = document.getElementById('prediction-form');
predictionForm.addEventListener('submit', function(event) {
    event.preventDefault();
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
    const resultContainer = document.getElementById('result-container');

    const label = predictionData.prediction_label;
    const confidenceNonDiabetic = (predictionData.confidence_scores['Non-Diabetic'] * 100).toFixed(2);
    const confidenceDiabetic = (predictionData.confidence_scores['Diabetic'] * 100).toFixed(2);

    // Determine conditional dynamic styles based on the outcome result
    const isDiabetic = label === 'Diabetic';
    const statusColorClass = isDiabetic ? 'text-danger' : 'text-success';
    const headerColorClass = isDiabetic ? 'text-danger' : 'text-success';

    const resultHTML = `
        <div class="mt-6 p-5 bg-neutral-primary-soft border border-default-medium rounded-base shadow-xs w-full">
            <!-- Header -->
            <h3 class="text-sm font-semibold ${headerColorClass} uppercase tracking-wider mb-3">
                Prediction Result
            </h3>

            <!-- Core Outcome -->
            <div class="flex items-baseline gap-2 mb-4 border-b border-default pb-3">
                <span class="text-sm font-medium text-heading">Outcome:</span>
                <span class="text-lg font-bold ${statusColorClass}">${label}</span>
            </div>

            <!-- Metrics Sub-Header -->
            <h4 class="text-xs font-bold text-heading uppercase tracking-wide mb-2">
                Confidence Scores:
            </h4>

            <!-- Scores Data List -->
            <div class="space-y-1.5">
                <div class="flex justify-between items-center text-sm">
                    <span class="text-body font-medium">Non-Diabetic:</span>
                    <span class="${isDiabetic ? 'font-medium text-heading' : 'font-bold text-success'}">${confidenceNonDiabetic}%</span>
                </div>
                <div class="flex justify-between items-center text-sm">
                    <span class="text-body font-medium">Diabetic:</span>
                    <span class="${isDiabetic ? 'font-bold text-danger' : 'font-medium text-heading'}">${confidenceDiabetic}%</span>
                </div>
            </div>
        </div>
    `;

    resultContainer.innerHTML = resultHTML;
})

    .catch(error => {
        console.error("Error communicating with the API:", error);
        const resultContainer = document.getElementById('result-container');
        resultContainer.innerHTML = `
            <div class="mt-6 p-4 rounded-base border border-danger bg-red-50">
                <p class="text-sm font-medium text-danger-strong">Something went wrong: ${error.message}</p>
            </div>
        `;
    });
});