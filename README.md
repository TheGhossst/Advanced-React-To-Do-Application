# Task Management Application

A task management application built with React, Redux, and Firebase. This application allows users to create, update, delete, and manage tasks efficiently. It also includes features like weather information for outdoor tasks, user authentication, and a responsive design.

## Features

- **User Authentication**: Users can sign up, log in, and log out.
- **Task Management**: Create, update, delete, and mark tasks as complete.
- **Task Filtering**: Filter tasks by categories such as All, Today, Important, Planned, and Assigned.
- **Weather Information**: Fetch and display weather data for outdoor tasks.
- **Responsive Design**: Works seamlessly on both desktop and mobile devices.

## Technologies Used

- **Frontend**: React, Redux, TypeScript
- **Backend**: Firebase (Firestore for database, Authentication)
- **Weather API**: OpenWeatherMap API for fetching weather data
- **Styling**: Tailwind CSS for styling components

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/TheGhossst/Advanced-React-To-Do-Application.git
   ```

2. Navigate to the project directory:
   ```bash
   cd Advanced-React-To-Do-Application
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and add your Firebase and OpenWeatherMap API keys:
   ```plaintext
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_OPENWEATHER_API_KEY=your_openweather_api_key
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:5173`.

## Usage

- **Creating a Task**: Click on the "Add Task" button, fill in the task details, and click "Create Task".
- **Editing a Task**: Click on a task to view its details, then click the edit button to modify it.
- **Deleting a Task**: Click on the delete button next to a task to remove it.
- **Filtering Tasks**: Use the sidebar to filter tasks by different categories.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## Acknowledgments

- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [Firebase](https://firebase.google.com/)
- [OpenWeatherMap](https://openweathermap.org/)
- [Tailwind CSS](https://tailwindcss.com/)