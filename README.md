# SBA318 Inventory Management System

This is an inventory management system developed using Node.js with Express. It allows managing products, users, and reviews through a RESTful API. The application renders views using EJS templates and interacts with a backend server to retrieve, add, update, and delete data.

## Features

- **Product Management**: Add, edit, and delete products.
- **User Management**: Manage users including creating new users, editing existing users, and deleting users.
- **Review Management**: Handle reviews for products, including posting new reviews and deleting existing ones.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need Node.js and npm installed on your machine. To install these, you can follow the [Node.js download guide](https://nodejs.org/en/download/).

### Installing

Clone the repository to your local machine:

```bash
git clone https://github.com/JunW62/SBA318.git
```

Navigate into the project directory:

```bash
cd your project directory
```

Install the dependencies:

```bash
npm i axios body-parser ejs express
```

### Running the application

Start the server:

```bash
nodemon server.js
```

Start the app:

```bash
nodemon index.js
```

This will launch the backend server on http://localhost:3000 and connect to the API server running at http://localhost:4000.

## API Endpoints

Below is a list of available API endpoints that allow you to manage products, users, and reviews in the inventory management system:

### Products

- **GET `/api/products`**

  - **Description**: Retrieves a list of all products.
  - **Response**: Array of product objects.

- **GET `/api/products/:id`**

  - **Description**: Retrieves a product by its ID.
  - **Response**: Product object.

- **POST `/api/products`**

  - **Description**: Adds a new product.
  - **Request Body**: `{"name": "string", "description": "string", "price": number, "quantity": number}`
  - **Response**: Newly created product object.

- **PATCH `/api/products/:id`**

  - **Description**: Updates an existing product.
  - **Request Body**: Fields to update, e.g., `{"price": number, "quantity": number}`
  - **Response**: Updated product object.

- **DELETE `/api/products/:id`**
  - **Description**: Deletes a product.
  - **Response**: Confirmation message.

### Users

- **GET `/api/users`**

  - **Description**: Retrieves a list of all users.
  - **Response**: Array of user objects.

- **GET `/api/users/:id`**

  - **Description**: Retrieves a user by their ID.
  - **Response**: User object.

- **POST `/api/users`**

  - **Description**: Adds a new user.
  - **Request Body**: `{"name": "string", "username": "string", "email": "string"}`
  - **Response**: Newly created user object.

- **PATCH `/api/users/:id`**

  - **Description**: Updates an existing user.
  - **Request Body**: Fields to update, e.g., `{"email": "string"}`
  - **Response**: Updated user object.

- **DELETE `/api/users/:id`**
  - **Description**: Deletes a user.
  - **Response**: Confirmation message.

### Reviews

- **GET `/api/reviews`**

  - **Description**: Retrieves all reviews.
  - **Response**: Array of review objects.

- **GET `/api/reviews/:id`**

  - **Description**: Retrieves a review by its ID.
  - **Response**: Review object.

- **POST `/api/reviews`**

  - **Description**: Adds a new review for a product.
  - **Request Body**: `{"productId": number, "comments": "string"}`
  - **Response**: Newly created review object.

- **DELETE `/api/reviews/:id`**
  - **Description**: Deletes a review.
  - **Response**: Confirmation message.

### Usage Example

Here is how you might call the API to get a list of products using curl:

```bash
curl -X GET http://localhost:3000/api/products
```
