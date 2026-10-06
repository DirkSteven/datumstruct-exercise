# Datumstruct User Management Dashboard 

## Overview 
A full-stack user management application built for the Datumstruct Software Engineer coding activity.
The application allows users to view, search, create, update, and delete user records. User data is stored in a JSON file.

## Tech Stack

| Category | Technologies |
|---|---|
| <b> Backend </b> | Node.js, Express.js |
| <b> Frontend </b> | React, Vite |
| <b> Styling </b> | Tailwind CSS, shadcn/ui |
| <b> Forms </b> | React Hook Form |
| <b> Validation </b> | Zod |
| <b> Data Storage </b> | JSON File |

## Setup

1. Clone the repository
   ```bash
    git clone https://github.com/DirkSteven/datumstruct-exercise.git
   ```
2. In the project root folder, start the server by running the command below: 
   ```js
    npm start  // This will both start the servers for the frontend and backend
   ```

3. To access the website, type the URL in the browser `http://localhost:5173/`

## API Endpoints

As specified in the requirements, the application only has one model: User. Therefore, the API endpoints below are used for managing user data.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | Get all users |
| GET | `/api/users/:id` | Get a user by ID |
| POST | `/api/users` | Create a user |
| PUT | `/api/users/:id` | Update a user |
| DELETE | `/api/users/:id` | Delete a user |

### API Testing

A Postman collection is included in the postman/ directory for testing the API endpoints.

The collection includes successful responses and examples for validation and error cases.   

To test the `500 Internal Server` Error response, uncomment the test code in `backend/src/services/userService.js` and comment out the valid usersFilePath. This intentionally causes a server-side error when accessing the user data.

```js
// Uncomment the code below to test 505 
const usersFilePath = path.join(__dirname, "../../data/does-not-exist.json");

// AND 

// This code should be commented
// const usersFilePath = path.join(__dirname, "../../data/users.json");
```


## Validation and Error Handling

User input is validated on both the frontend and backend using Zod. The frontend also uses React Hook Form for form validation and handling.

The API returns appropriate HTTP status codes for different errors:

| Status | Description |
|---|---|
| 400 | Invalid user data |
| 404 | User not found |
| 500 | Internal server error |