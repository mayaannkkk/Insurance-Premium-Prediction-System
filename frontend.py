import streamlit as st
import requests

# --- Config ---
API_URL = "http://backend:8000/predict"  # use docker-compose service name, not public IP

st.set_page_config(
    page_title="Insurance Premium Predictor",
    page_icon="💰",
    layout="centered",
)

# --- Minimal custom styling ---
st.markdown(
    """
    <style>
    .main { padding-top: 2rem; }
    .stButton>button {
        width: 100%;
        border-radius: 8px;
        padding: 0.6rem;
        font-weight: 600;
    }
    </style>
    """,
    unsafe_allow_html=True,
)

st.title("💰 Insurance Premium Category Predictor")
st.caption("Fill in your details and get an instant prediction of your premium category.")

st.divider()

# --- Input form ---
with st.form("prediction_form"):
    col1, col2 = st.columns(2)

    with col1:
        age = st.number_input("Age", min_value=1, max_value=119, value=30)
        weight = st.number_input("Weight (kg)", min_value=1.0, value=65.0)
        height = st.number_input("Height (m)", min_value=0.5, max_value=2.5, value=1.7)
        income_lpa = st.number_input("Annual Income (LPA)", min_value=0.1, value=10.0)

    with col2:
        smoker = st.selectbox("Are you a smoker?", options=[True, False])
        city = st.text_input("City", value="Mumbai")
        occupation = st.selectbox(
            "Occupation",
            ['retired', 'freelancer', 'student', 'government_job',
             'business_owner', 'unemployed', 'private_job']
        )

    submitted = st.form_submit_button("🔮 Predict Premium Category")

# --- Prediction logic ---
if submitted:
    input_data = {
        "age": age,
        "weight": weight,
        "height": height,
        "income_lpa": income_lpa,
        "smoker": smoker,
        "city": city,
        "occupation": occupation,
    }

    with st.spinner("Contacting prediction service..."):
        try:
            response = requests.post(API_URL, json=input_data, timeout=10)
            result = response.json()
        except requests.exceptions.ConnectionError:
            st.error("❌ Could not connect to the FastAPI server. Make sure it's running.")
            st.stop()
        except requests.exceptions.Timeout:
            st.error("⏱️ The request timed out. Try again in a moment.")
            st.stop()

    if response.status_code == 200 and "response" in result:
        prediction = result["response"]
        category = prediction["predicted_category"]
        confidence = prediction["confidence"]
        probabilities = prediction["class_probabilities"]

        st.divider()
        st.subheader("Result")

        badge_color = {"Low": "🟢", "Medium": "🟡", "High": "🔴"}.get(category, "🔵")
        st.success(f"{badge_color} Predicted Premium Category: **{category}**")

        m1, m2 = st.columns(2)
        m1.metric("Confidence", f"{confidence * 100:.1f}%")

        st.write("📊 Class Probabilities")
        st.bar_chart(probabilities)
        with st.expander("Raw probability values"):
            st.json(probabilities)
    else:
        st.error(f"API Error: {response.status_code}")
        st.write(result)

st.divider()
st.caption("Model results are estimates and not a guaranteed premium quote.")