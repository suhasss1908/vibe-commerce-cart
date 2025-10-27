# Vibe Commerce - Full Stack Cart Assignment

This is a full-stack e-commerce shopping cart application built for the Vibe Commerce screening. It features a React frontend, a Node.js/Express backend API, and a MongoDB database for cart persistence.

-   **Frontend:** React, Axios
-   **Backend:** Node.js, Express, Mongoose
-   **Database:** MongoDB
-   **Bonus:** Products are fetched live from the [Fake Store API](https://fakestoreapi.com/).

---

## 

## Features

* **Product Listing:** Fetches and displays 20 products from the external Fake Store API.
* **Add to Cart:** Users can add products to their cart. The backend handles logic for adding new items or incrementing the quantity of existing items.
* **Cart Management:** A persistent cart sidebar shows all items, quantities, and the total price. Items are stored in a MongoDB database.
* **Remove from Cart:** Users can remove items from the cart.
* **Mock Checkout:** A checkout modal collects user details (name, email) and, upon submission, "processes" the payment.
* **Receipt Generation:** The backend clears the cart and returns a mock receipt with a timestamp, item list, and total.
* **Responsive Design:** The application is usable on mobile devices, with the cart toggling as a slide-in sidebar.

---

## Setup & Installation

You must have **Node.js** and **MongoDB** (either local or a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account) installed.

### 1. Backend Setup

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the `/backend` directory and add your MongoDB connection string:
    ```
    PORT=5001
    MONGO_URI=your_mongodb_connection_string_here
    ```
4.  Start the backend server (it will run on `http://localhost:5001`):
    ```bash
    npm start
    ```

### 2. Frontend Setup

1.  Open a **new terminal** and navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the React development server (it will open `http://localhost:3000` in your browser):
    ```bash
    npm start
    ```

The app should now be fully functional.

---

## API Endpoints

All endpoints are prefixed with `/api`.

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/products` | Fetches a list of 20 products from the Fake Store API. |
| `GET` | `/cart` | Retrieves all items currently in the cart and the total price. |
| `POST` | `/cart` | Adds a new item to the cart. If the item already exists, it updates the quantity. |
| `DELETE` | `/cart/:id` | Removes an item from the cart using its MongoDB `_id`. |
| `POST` | `/checkout` | Clears all items from the cart and returns a mock receipt. |

---

## Project Explanation

This project is structured as a monorepo with two separate, co-located applications: `frontend` and `backend`.

* **`backend`**: A standard Express server that exposes a REST API. It uses Mongoose to define a `CartItem` schema and interact with a MongoDB database. It serves as a true backend, managing its own state (the cart) while also acting as a proxy to fetch data from an external service (Fake Store API) for the products. This separation of concerns is critical for a real e-commerce app.

* **`frontend`**: A React application created with `create-react-app`. It manages its state using React hooks (`useState`, `useEffect`). All data is fetched or mutated via `axios` calls to the `backend` API. This keeps the frontend "dumb" and ensures that the server is the single source of truth for the cart's state.

* **State Management**: The primary state (the cart) is managed by the backend/database. The React app simply fetches this state on load (`useEffect`) and re-fetches it after every major action (add/remove/checkout) to ensure the UI is always in sync with the database.