# 🎶 MoodPlay: Emotion-Aware Music Recommendation System

**MoodPlay** is a multi-modal, AI-powered music recommendation system that understands your **emotions** from **facial expressions** and **voice tone**, and matches your mood with the perfect track using the **Spotify API**.

Whether you're happy, sad, angry, or just feeling mellow — MoodPlay finds the sound that fits your soul.

---

## 💡 Key Features

- 🎭 **Facial Emotion Recognition**  
  Detects real-time emotions using deep learning and CNNs on facial input.

- 🎤 **Voice Emotion Analysis**  
  Analyzes audio features (pitch, tone, tempo) to classify vocal emotion.

- 🧠 **Multi-Modal Emotion Fusion** *(Post-MVP)*  
  Combines face and voice cues for enhanced emotional accuracy.

- 🎵 **Spotify API Integration**  
  Recommends real-time tracks based on mood clusters, not static playlists.

- 💻 **Cross-Platform UI**  
  Intuitive and lightweight interface powered by Streamlit.

---

## 🧠 How It Works

1. **Emotion Detection**  
   → Facial input via webcam  
   → Audio input via mic  
   → Processed through pre-trained CNNs and audio classifiers

2. **Mood Classification**  
   → Detected emotion mapped to one of several mood categories  
   → Optional: K-Means clustering for fine-tuned personalization

3. **Music Recommendation**  
   → Spotify API used to fetch tracks from mood-mapped playlists  
   → Dynamic and personalized suggestions, refreshed in real time

---

## 🛠️ Built With

- **Python**
- **TensorFlow**, **Keras**
- **OpenCV**, **dlib**
- **Librosa**, **SpeechRecognition**
- **Spotify Web API**
- **Scikit-learn**, **Pandas**
- **Streamlit** for UI

---

## 📦 Installation

```bash
git clone https://github.com/kthiruvikram/tempo-sentient.git
cd tempo-sentient

# Set up a virtual environment (recommended)
python3 -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows

# Install dependencies
pip install -r requirements.txt

