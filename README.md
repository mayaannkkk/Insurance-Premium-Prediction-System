# 🏥 InsurePredict – Insurance Premium Prediction System

An end-to-end Machine Learning web application that predicts the estimated health insurance premium based on a user's demographic, lifestyle, and medical information. The application is built using **FastAPI**, containerized with **Docker**, and deployed on **AWS EC2** for real-time predictions.

---

## 🚀 Live Demo

🌐 **Application:** http://52.5.22.207:8000/

📌 **API Docs (Swagger):** http://52.5.22.207:8000/docs

---

## 📌 Features

- Predicts health insurance premiums in real time.
- User-friendly and responsive interface.
- FastAPI backend for high-performance API responses.
- Machine Learning prediction pipeline using Scikit-learn.
- Input validation and preprocessing.
- Dockerized application.
- Cloud deployment on AWS EC2.

---

## 🛠 Tech Stack

### Frontend
- HTML5
- CSS3
- JavaScript

### Backend
- FastAPI
- Uvicorn

### Machine Learning
- Python
- Scikit-learn
- Pandas
- NumPy
- Joblib

### Deployment
- Docker
- Docker Hub
- AWS EC2

---

## 📊 Workflow

```
User Input
     │
     ▼
Data Validation
     │
     ▼
Preprocessing Pipeline
     │
     ▼
Trained ML Model
     │
     ▼
Insurance Premium Prediction
     │
     ▼
Display Result
```

---

## 📂 Project Structure

```
Insurance-Premium-Prediction-System/
│
├── artifacts/
├── data/
├── models/
├── static/
├── templates/
├── app.py
├── prediction_pipeline.py
├── requirements.txt
├── Dockerfile
├── .dockerignore
├── README.md
└── LICENSE
```

---

## ⚙️ Installation

### Clone the repository

```bash
git clone https://github.com/mayaannkkk/Insurance-Premium-Prediction-System.git

cd Insurance-Premium-Prediction-System
```

### Create Virtual Environment

```bash
python -m venv myenv
```

### Activate Environment

Windows

```bash
myenv\Scripts\activate
```

Linux/Mac

```bash
source myenv/bin/activate
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

---

## ▶️ Run the Application

```bash
uvicorn app:app --reload
```

Open

```
http://127.0.0.1:8000
```

---

## 🐳 Docker

### Build Image

```bash
docker build -t insurance-premium-api .
```

### Run Container

```bash
docker run -d -p 8000:8000 insurance-premium-api
```

---

## ☁️ AWS Deployment

The application is deployed on an AWS EC2 instance using Docker.

---

## 🎯 Future Improvements

- User Authentication
- Premium Comparison Across Companies
- Model Monitoring
- CI/CD Pipeline using GitHub Actions
- Kubernetes Deployment
- HTTPS with Nginx
- Cloud Monitoring

---

## 👨‍💻 Author

**Mayank Goyal**

LinkedIn: https://www.linkedin.com/in/mayank-goyal-4a419228b/
