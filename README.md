# FitMe / Fit.Io

## Overview
FitMe, also known as Fit.Io, is a comprehensive full-stack fitness application designed to provide personalized workout, diet, and fitness plans to its users. The application includes tools for tracking Body Mass Index (BMI) and weight, regular progress check-ins, and AI-driven support to help users achieve their fitness goals. It features a user-friendly, personalized dashboard to simplify data input and enhance the overall user experience.

## Features

- **Persistent Data Storage**: Utilizes a RESTful backend to store user fitness data in a **MongoDB** cloud database, ensuring data is stored persistently.
- **Reactive Front-End**: Built with **React**, offering a dynamic, responsive user interface.
- **Secure Authentication**: Implements robust user authentication using **JSON Web Tokens (JWT)** and hashed passwords for secure access.
- **Dynamic Dashboard**: Features a personalized dashboard that updates in real-time, giving users a quick view of their fitness progress and metrics.
- **Real-Time Data Visualization**: Integrates real-time updating graphs and charts using **React libraries** like **Recharts** or **Victory**, offering detailed analysis of progress and metrics.
- **AI-Driven Insights**: Delivers personalized workout and diet plans, utilizing **AI algorithms** that adapt to user feedback and performance for optimized fitness outcomes.
- **Progress Tracking**: Allows users to monitor their daily fitness activities and dietary intake, with real-time updates to their dashboard, keeping them informed of their progress.

## Getting Started

Follow these instructions to set up and run the FitMe/Fit.Io application on your local machine for development and testing.

### Prerequisites

Make sure the following are installed:
- **Node.js** (version 14+)
- **MongoDB** (for local setup or MongoDB Atlas for cloud-based storage)

All dependencies required for the project can be found in the `package.json` file.

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/fitme.git
    ```

2. Navigate to the project directory:
    ```bash
    cd fitme
    ```

3. Install the backend and frontend dependencies:
    ```bash
    # Install backend dependencies
    npm install

    # Navigate to frontend directory and install dependencies
    cd client
    npm install
    ```

### Running the Application

1. **Start the backend server**:
    ```bash
    # From the project root
    nodemon server
    ```

2. **Start the React frontend**:
    ```bash
    # Navigate to the client directory
    cd client
    npm start
    ```

   The backend server will run on **http://localhost:5000**, and the React frontend will be accessible at **http://localhost:3000**.

## Usage

Once the application is running, users can engage with the following features:

### 1. **Account Creation and Login**
   - Sign up for a new account, providing required details. Your password will be securely hashed and stored in the database.
   - Log in to access your personalized dashboard.

### 2. **Personalizing Your Profile**
   - Enter details such as weight, height, and fitness goals to receive customized workout and diet plans tailored to your needs.

### 3. **Viewing Workout and Diet Plans**
   - Access your AI-driven workout and diet schedules under the "Plans" section. These are personalized based on your input and adjusted dynamically as you progress.

### 4. **Tracking Your Progress**
   - Input daily workout and diet details into the dashboard. The system will visualize your progress with real-time charts and graphs using **Recharts** or **Victory** libraries.

### 5. **AI-Driven Insights**
   - Get real-time recommendations and feedback from the AI to enhance your routines, refine your plans based on progress, and reach your goals more efficiently.

### 6. **Security**
   - User data is handled securely, with passwords hashed and authentication managed through **JWT** tokens, ensuring privacy and security.

## Testing the API

You can use **Postman** to test the backend API:

1. Import the API collection (if available) or create requests manually for testing.
2. Test various routes such as:
   - **POST** `/api/register` – to create a new user.
   - **POST** `/api/login` – to authenticate a user and retrieve a JWT.
   - **GET** `/api/profile` – to get user profile details.
   - **POST** `/api/plans` – to generate a personalized workout or diet plan.

Make sure to include the JWT token in the headers for authenticated routes.

## Technologies Used

### Backend
- **Node.js**: JavaScript runtime environment.
- **Express**: Fast, unopinionated, minimalist web framework for Node.js.
- **MongoDB**: Cloud database for storing user data persistently.
- **JWT**: JSON Web Token for secure authentication.
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB.

### Frontend
- **React**: JavaScript library for building user interfaces.
- **Recharts / Victory**: Libraries for real-time data visualization (charts and graphs).

### Tools
- **Nodemon**: Tool for automatically restarting the server during development.
- **Postman**: API testing tool for verifying backend functionality.

## Author

- **Shehab Ahamed**

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details.
