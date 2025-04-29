
# TripGo (AI based trip planner app)

TripGo is a React Native-based mobile application that helps users effortlessly plan, organize, and manage their travel itineraries. With cloud sync via Firebase and rich location data from the Google Places API, TripGo ensures a smooth and intuitive user experience.


## Features
📅 Create and Manage Trips : 
Add destinations, travel dates, and detailed itinerary notes.

☁️ Cloud Sync (Firebase Firestore) : 
Trip data is stored securely in Firestore, with offline caching using RoomDB.

🔒 Authentication : 
Sign up and log in using Firebase Authentication.

📷 Visual Itineraries : 
Automatically fetch location images from Google Places API for a vibrant trip overview.

📱 Cross-Platform : 
Built using React Native – works on both Android and iOS.
## Tech Stack
Frontend: React Native

Backend: Firebase Firestore & Authentication

Offline Storage: RoomDB

Location Data & Images: Google Places API

Architecture: MVVM (Model-View-ViewModel)


## Installation
Clone the repository:

bash
```bash
 git clone https://github.com/your-username/TripGo.git
```

bash
```bash
cd TripGo
```

Install dependencies:

bash
```bash
  npm install
```

Set up Firebase:

Create a Firebase project and enable Firestore & Authentication.

Replace the Firebase config in your project with your credentials.

Add your Google Places API Key to access location images.

Run the app:

bash
Copy
```bash
  npx react-native run-android
```

# or
```bash
npx react-native run-ios
```

## Deployment

To deploy this project run

```bash
  npm run deploy
```

