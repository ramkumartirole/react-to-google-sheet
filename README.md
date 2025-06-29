# Render 3D Model Viewer

This project is a web-based interactive 3D model viewer built using React, React Three Fiber, and Drei. It allows toggling between two 3D models, capturing user preferences, and storing the data in Google Sheets.

## Features

1. 3D Model Rendering
- Renders two `.glb` models using `useGLTF` from `@react-three/drei`
- Only one model is visible at a time, selected via the sidebar

2. Scene Controls
- Includes ambient and directional lighting
- Camera rotation, zoom, and pan using `OrbitControls`

3. Sidebar Interaction
- Sidebar on the right with cards for Model A and Model B
- Clicking a card displays the selected model and highlights the active card

4. User Preference Form
- Users can select a model and enter name/email
- Submits data to a connected Google Sheet
- Data includes Sr No, Name, Model, Email, Timestamp

5. Technical Stack
- React (Vite)
- @react-three/fiber
- @react-three/drei
- Bootstrap (for layout)
- Google Apps Script (backend for form handling)

6. How to Run Locally
-Step 1: Install dependencies
  npm install
-Step 2: Start the development server
  npm run dev
-Step 3: View your app
  Open your browser at http://localhost:5173
