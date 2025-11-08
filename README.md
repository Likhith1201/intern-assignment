# Backend Developer Intern Assignment

This project is a full-stack MERN (MongoDB, Express, React, Node.js) application built for the Backend Developer Intern assignment. It includes a scalable REST API (v1) with JWT authentication, role-based access, and a simple React UI to interact with the API.

---

##  Core Features

### Backend (Primary Focus)
* **Authentication:** User registration and login with password hashing (bcrypt.js) and JWT.
* **Role-Based Access:** `user` vs. `admin` roles, with protected routes for admins.
* **CRUD API:** Full CRUD operations for a "Tasks" entity.
    * Users can C.R.U.D. *their own* tasks.
    * Admins can see *all* tasks from *all* users.
* **API Versioning:** All routes are prefixed with `/api/v1`.
* **Security:** Middleware protects routes, validates tokens, and checks for admin privileges.
* **Database:** MongoDB with Mongoose for schema modeling and data management.

### Frontend (Supportive)
* **Register & Login:** UI forms to register new users and log in.
* **Protected Dashboard:** Shows a welcome message and task dashboard only to logged-in users.
* **Token Management:** Stores JWT in `localStorage` on login and sends it with all protected API requests.
* **Task Management:** Users can create, view, and delete their own tasks from the UI.
* **Error Handling:** Displays error and success messages from the API.

---

##  Tech Stack

* **Backend:** Node.js, Express.js, `morgan` (for logging)
* **Frontend:** React.js (using Vite)
* **Database:** MongoDB (using Mongoose)
* **Authentication:** JSON Web Tokens (JWT), bcrypt.js

---

## ⚙️ How to Run This Project

You will need two terminals to run this project: one for the backend and one for the frontend.

### 1. Backend Setup

1.  **Navigate to the backend folder:**
    ```bash
    cd backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Create a `.env` file:**
    Create a file named `.env` in the `backend` folder and add the following variables. Replace them with your own values.
    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    ```

4.  **Run the backend server:**
    ```bash
    node server.js
    ```
    *The server will be running at `http://localhost:5000`.*

### 2. Frontend Setup

1.  **Open a new terminal** and navigate to the frontend folder:
    ```bash
    cd frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the frontend dev server:**
    ```bash
    npm run dev
    ```
    *The React app will be running at `http://localhost:5173` (or a similar port).*

4.  **Open the app** in your browser to use the application.

---

##  API Documentation

The API endpoints can be tested using the included Postman collection:
`Intern.Assignment.postman_collection.json` .

All routes are versioned under `/api/v1/`.

---

##  Short Scalability Note

This project is built with a monolithic structure for simplicity. To scale this application to handle millions of users, I would implement the following strategies:

1.  **Microservices:** Break down the application into smaller, independent services (e.g., a "User Service" for auth and a "Task Service" for CRUD). This allows for independent scaling, deployment, and development.
2.  **Load Balancing:** Use a load balancer (like Nginx) to distribute incoming API requests across multiple instances of the backend server.
3.  **Caching:** Implement a caching layer using **Redis**. This would be used to store frequently accessed data (like user profiles) in memory, drastically reducing database read operations.
4.  **Database Scaling:**
    * **Read Replicas:** Create read-only copies of the database to handle high read traffic.
    * **Sharding:** Distribute the database across multiple machines (shards) based on a key (e.g., `userId`) to handle massive write loads.