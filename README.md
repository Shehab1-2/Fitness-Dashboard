# FitMe / Fit.Io

## Overview
FitMe, also known as Fit.Io, is a comprehensive full-stack fitness application crafted to deliver personalized workout, diet, and fitness plans to its users. It offers a suite of features enabling users to monitor their Body Mass Index (BMI) and weight, check in regularly, and receive AI-driven support tailored to their fitness goals. The platform is designed with a user-friendly personalized dashboard, simplifying data input and enhancing the overall user experience.

## Features
- **Persistent Data Storage**: Utilizes a RESTful back-end server to store user fitness data in a MongoDB cloud database persistently.
- **Reactive Front-End**: Features a reactive front-end design implemented with React, ensuring a dynamic and responsive user interface.
- **Secure Authentication**: Implements fully functional user authentication with hashed passwords using JSON Web Tokens (JWT) for secure access.
- **Dynamic Dashboard**: Offers a dynamic dashboard that updates in real-time, allowing users to see their progress and metrics at a glance.
- **Dynamic Data Visualization**: Incorporates live updating graphs and charts with ngx-charts and mat-table for real-time data visualization and analysis.
- **AI-Driven Insights**: Utilizes artificial intelligence to provide personalized fitness and diet plans, adapting to user progress and feedback for optimized outcomes.
- **Dynamic Data Visualization**: Incorporates live updating graphs and charts for real-time data visualization and analysis, using React-based libraries like Recharts or Victory.


## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.
### Prerequisites
This project was built using React, Node.JS, and MongoDB. All dependencies can be found in the package.json file. See below to install all dependencies.

### Installation
1. Clone the repository:
   ```shell
   git clone https://github.com/yourusername/fitme.git
### Running the Application
After all the dependencies are installed, follow the below commands to run the application.
1. Run:
   ```shell
    Startup back-end server, run: $ nodemon server
    Startup front-end application, run: $ npm start
## Usage
After successfully setting up and launching the FitMe/Fit.Io application, users can take the following steps to fully engage with its features:

- **Account Creation and Login**: Start by signing up for a new account. Fill in the required fields, and your password will be securely hashed and stored. Once registered, log in to access your personalized dashboard.

- **Personalizing Your Profile**: Enter your health and fitness details, including current weight, height, and fitness goals, to get customized workout and diet plans.

- **Accessing Workout and Diet Plans**: Navigate to the plans section to view your AI-driven workout and diet schedules, tailored to your fitness goals and preferences.

- **Tracking Progress**: Utilize the dynamic dashboard to input daily fitness activities and dietary intakes. The dashboard will update in real time, showing your progress with interactive charts and graphs.

- **Utilizing AI-Driven Support**: Engage with the AI features for insights and tips on improving your health routines, adapting your plans based on performance and feedback.

- **Security and Privacy**: Rest assured that your data is securely handled with encrypted passwords and secure authentication mechanisms.

To make the most of FitMe/Fit.Io, regularly update your activities and monitor your progress through the dashboard. This will ensure the AI algorithms can accurately adapt and refine your personalized fitness and diet plans.


## Author
- Sheab Ahamed

## License
This project is licensed under the MIT License - see the LICENSE.md file for details.
