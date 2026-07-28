// Same-origin by default — since the frontend is served by the same
// FastAPI app, no base URL or CORS config is needed. Change this if
// you ever split the frontend into its own host.
const API_BASE = '';

const form = document.getElementById('predict-form');
const submitBtn = document.getElementById('submit-btn');
const errorBox = document.getElementById('error-box');
const resultEmpty = document.getElementById('result-empty');
const resultFilled = document.getElementById('result-filled');
const seal = document.getElementById('seal');
const tierWord = document.getElementById('tier-word');
const confidenceValue = document.getElementById('confidence-value');
const probList = document.getElementById('prob-list');

function classify(tier) {
  const t = String(tier).toLowerCase();
  if (t.includes('low')) return 'low';
  if (t.includes('high')) return 'high';
  return 'medium';
}

function renderProbabilities(probs, winningLabel) {
  probList.innerHTML = '';
  const entries = Object.entries(probs).sort((a, b) => b[1] - a[1]);

  entries.forEach(([label, value]) => {
    const pct = Math.round(value * 100);
    const row = document.createElement('div');
    row.className = 'prob-row' + (label === winningLabel ? ' is-winner' : '');
    row.innerHTML = `
      <div class="prob-label-row">
        <span>${label}</span>
        <span class="pct">${pct}%</span>
      </div>
      <div class="prob-track">
        <div class="prob-fill" style="width:${pct}%"></div>
      </div>
    `;
    probList.appendChild(row);
  });
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  errorBox.style.display = 'none';
  submitBtn.disabled = true;
  submitBtn.textContent = 'Calculating…';

  const payload = {
    age: parseInt(document.getElementById('age').value, 10),
    weight: parseFloat(document.getElementById('weight').value),
    height: parseFloat(document.getElementById('height').value),
    income_lpa: parseFloat(document.getElementById('income_lpa').value),
    smoker: document.getElementById('smoker').value === 'true',
    city: document.getElementById('city').value,
    occupation: document.getElementById('occupation').value
  };

  try {
    const res = await fetch(`${API_BASE}/predict`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(typeof data === 'string' ? data : (data.detail ? JSON.stringify(data.detail) : 'Request failed'));
    }

    const result = data.response;
    const tier = result.predicted_category;
    const confidence = result.confidence;
    // predict.py returns "class_probabilities" — matches what we read here.
    const probs = result.class_probabilities || {};

    const cls = classify(tier);
    seal.className = `seal ${cls}`;
    void seal.offsetWidth; // restart animation on repeat submits
    seal.classList.add('stamp-in');
    tierWord.textContent = tier;
    confidenceValue.textContent = `${Math.round(confidence * 100)}%`;

    renderProbabilities(probs, tier);

    resultEmpty.style.display = 'none';
    resultFilled.style.display = 'flex';
    resultFilled.style.flexDirection = 'column';
    resultFilled.style.alignItems = 'center';

  } catch (err) {
    errorBox.textContent = `Error: ${err.message}`;
    errorBox.style.display = 'block';
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Calculate Premium Tier';
  }
});
