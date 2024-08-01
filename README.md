# FitFusion

## Overview
FitFusion is a web application deisgned to help users find and view gym locations.The backend is built using MongoDB, ExpressJS and Node.JS, whereas the frontend is created using Bootstrap and CSS.The website features user authentication, token generation and cookie management

## Features

- **User Authentication**: Secure sign up, login, and logout functionalities.

- **Cookie Management**: Storing tokens and session data in cookies.
- **Gym Management**: Create, read, update, and delete camping spots.
- **Responsive Design**: Frontend developed using Bootstrap for a responsive user experience.

## Technologies Used

- **Frontend**: Bootstrap, CSS
- **Backend**: Node.js, ExpressJS, MongoDB
- **Authentication**: JWT, Cookies

## Getting Started

### Prerequisites

- Node.js and npm installed on your local machine
- MongoDB instance (local or remote)

### Installation

1. **Clone the Repository**:

   ```sh
   git clone https://github.com/your-username/FitFusion.git
   cd FindMyCampSpot
   ```

2. **Install Backend Dependencies**:

   ```sh
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**:

   ```sh
   cd ../frontend
   npm install
   ```

4. **Setup Environment Variables**:

   Create a `.env` file in the `backend` directory and add the following environment variables:

   ```env
   MONGO_URI=your-mongodb-uri
   JWT_SECRET=your-jwt-secret
   COOKIE_SECRET=your-cookie-secret
   PORT=8000
   ```

5. **Run the Backend**:

   ```sh
   cd backend
   npm start
   ```

   The backend server should now be running on `http://localhost:8000`.

## API Endpoints

### Authentication

- **POST /api/auth/signup**: User registration
- **POST /api/auth/login**: User login
- **POST /api/auth/logout**: User logout

### Camping Spots

- **GET /api/spots**: Get all gym locations
- **GET /api/spots/:id**: Get a single gym location by ID
- **POST /api/spots**: Create a new gym location
- **PUT /api/spots/:id**: Update a gym location by ID
- **DELETE /api/spots/:id**: Delete a gym location by ID

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.
