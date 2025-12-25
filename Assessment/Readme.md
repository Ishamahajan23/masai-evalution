# Equipment Tracker Project

This project consists of a **Node.js backend** (using Express and MongoDB) and a **React frontend** (built with Vite, Redux Toolkit, and Tailwind CSS). The backend provides API endpoints for managing lists (equipment tracking), and the frontend consumes these APIs for CRUD operations.

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Nodemon

### Frontend
- React
- Vite
- JavaScript
- CSS

## Project Structure
```
Assessment/
├── Node-Backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── index.js
│   ├── .env
│   └── package.json
│
├── equipment-tracker/
│   ├── src/
│   ├── public/
│   ├── .env
│   └── package.json
│
└── README.md
```

## Prerequisites
Make sure the following are installed on your system:
- Node.js (v18 or higher recommended)
- npm
- MongoDB (local installation) or MongoDB Atlas
- macOS / Linux / Windows

## Environment Variables

### Backend (Node-Backend/.env)
```
MONGO_URL="mongodb://127.0.0.1:27017/mydb"
FRONTEND_URL="http://localhost:5173"
PORT=8000
```
If you are using MongoDB Atlas, replace `MONGO_URL` with your Atlas connection string.

### Frontend (equipment-tracker/.env)
```
VITE_API_URL="http://localhost:8000"
```

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Assessment
```

### Backend Setup
- Navigate to the backend folder:
  ```bash
  cd Node-Backend
  ```
- Install dependencies:
  ```bash
  npm install
  ```
- Start the backend server:
  ```bash
  npx nodemon index.js
  ```
  or
  ```bash
  node index.js
  ```
- Backend will run on: `http://localhost:8000`
- API base URL: `http://localhost:8000/api/lists`

### Frontend Setup
- Navigate to the frontend folder:
  ```bash
  cd ../equipment-tracker
  ```
- Install dependencies:
  ```bash
  npm install
  ```
- Start the development server:
  ```bash
  npm run dev
  ```
- Frontend will run on: `http://localhost:5173`

## Running the Application
1. Ensure MongoDB is running (local or Atlas).
2. Start the backend server.
3. Start the frontend server.
4. Open the app in your browser: `http://localhost:5173`
5. The frontend communicates with the backend API to perform CRUD operations.

## API Endpoints
| Method  | Endpoint       | Description       |
|---------|----------------|-------------------|
| GET     | /api/lists     | Fetch all records |
| POST    | /api/lists     | Create a new record |
| PUT     | /api/lists/:id | Update a record   |
| DELETE  | /api/lists/:id | Delete a record   |

## MongoDB Notes
- MongoDB creates a database only after data is inserted.
- To view your database locally, use:
  ```bash
  mongosh
  show dbs
  use mydb
  ```

## Stopping the Servers
To stop the backend or frontend server, press `Ctrl + C` in the respective terminal window.

## Assumptions
- MongoDB is running on 127.0.0.1:27017
- Database name is `mydb`
- `.env` files exist and are correctly configured
- No firewall or proxy blocking ports 8000 or 5173

## Improvements With More Time
- Add root-level scripts to start frontend and backend together
- Centralized error handling and request validation
- Authentication and authorization (JWT)
- Frontend error boundaries and loading states
- Unit and integration tests
- CI/CD pipeline
- Pagination, search, filtering
