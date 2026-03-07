# Sweet Beans ☕

### 🌐 Live Links:


## Overview
.

## The app includes:
* Smooth navigation with React Router.

## Features


## Technologies Used
* React
* React Router
* Formik
* Yup
* CSS
* Python
* Flask
* Flask-RESTful
* Flask Marshmallow
* SQLAlchemy
* PostgreSQL
* Git & GitHub for version control

## Setup / Installation
git clone git@github.com:Jasec7/Sweet-Beans.git
### Backend
1. Navigate to the server directory
2. Install dependencies:
pipenv install
pipenv shell
3. Run the Flask server:
python app.py
(uses SQLite for local development)

### Frontend
1. Navigate to the client directory
2. Install dependencies:
npm install
3. Start the app:
npm run dev

## API Endpoints
* /users
* /stores
* /beans
* /coffees
* /coffees/:id

## 🚀 Deployment
This application is fully deployed using Render.
* Backend (Flask API) is deployed as a Render Web Service.
* Database is PostgreSQL, hosted on Render.
* Frontend (React) is deployed as a Render Static Site.

The frontend communicates with the deployed backend via HTTP requests to the live API.

For development and presentation purposes, the application can also be run locally using:

* python app.py for the backend
* npm start for the frontend

Environment variables are used to differentiate between local and production configurations.


## 📝License
This project is licensed under the MIT License.

## Contributors
* Jasec7
