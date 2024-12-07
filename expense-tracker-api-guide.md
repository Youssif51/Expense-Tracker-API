# Expense Tracker API Setup Guide

## Install Dependencies

Run the following command to install all the required dependencies:

```bash
npm install
```

## Configure Environment Variables

Create a `.env` file in the root directory and add the following:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/expense_db?schema=public"
JWT_SECRET="your_jwt_secret"
```

Replace `USER`, `PASSWORD`, and `expense_db` with your PostgreSQL credentials.

## Database Setup

Run the following command to apply the Prisma migrations:

```bash
npx prisma migrate dev --name init
```

This will set up the database schema and apply the migrations.

## Run the Server

Start the server with:

```bash
npm start
```

The API will be available at http://localhost:3000.

## API Endpoints

### Authentication

#### Register User
- **Endpoint:** `POST /auth/register`
- **Request Body:**
```json
{
  "email": "user@example.com",
  "password": "yourpassword"
}
```
- **Response:**
```json
{
  "message": "User registered successfully"
}
```

#### Login User
- **Endpoint:** `POST /auth/login`
- **Request Body:**
```json
{
  "email": "user@example.com",
  "password": "yourpassword"
}
```
- **Response:**
```json
{
  "token": "your_jwt_token"
}
```

### Expense Management

#### Create Expense
- **Endpoint:** `POST /expense`
- **Request Body:**
```json
{
  "amount": 100.00,
  "category": "groceries",
  "description": "Grocery shopping"
}
```
- **Response:**
```json
{
  "id": 1,
  "amount": 100.00,
  "category": "groceries",
  "description": "Grocery shopping",
  "userId": 1,
  "createdAt": "2024-12-01T10:00:00Z",
  "updatedAt": "2024-12-01T10:00:00Z"
}
```

#### Get Expenses
- **Endpoint:** `GET /expense`
- **Headers:**
```
Authorization: Bearer {jwt_token}
```
- **Response:**
```json
[
  {
    "id": 1,
    "amount": 100.00,
    "category": "groceries",
    "description": "Grocery shopping",
    "userId": 1,
    "createdAt": "2024-12-01T10:00:00Z",
    "updatedAt": "2024-12-01T10:00:00Z"
  }
]
```

#### Update Expense
- **Endpoint:** `PUT /expense/:id`
- **Request Body:**
```json
{
  "amount": 150.00,
  "category": "groceries",
  "description": "Updated grocery shopping"
}
```
- **Response:**
```json
{
  "id": 1,
  "amount": 150.00,
  "category": "groceries",
  "description": "Updated grocery shopping",
  "userId": 1,
  "createdAt": "2024-12-01T10:00:00Z",
  "updatedAt": "2024-12-02T12:00:00Z"
}
```

#### Delete Expense
- **Endpoint:** `DELETE /expense/:id`
- **Response:**
```json
{
  "message": "Expense deleted successfully"
}
```

### Filtering Expenses

#### Filter Expenses
- **Endpoint:** `GET /expense/filter`
- **Query Parameters:**
  - `filterType`: Filter by type (e.g., `pastWeek`, `lastMonth`, `last3Months`, `custom`)
  - `startDate`: Required for `custom` filter (format: `YYYY-MM-DD`)
  - `endDate`: Required for `custom` filter (format: `YYYY-MM-DD`)

- **Example Request:**
```bash
GET http://localhost:3000/expense/filter?filterType=pastWeek
```

- **Response:**
```json
{
  "expenses": [
    {
      "id": 1,
      "amount": 100.00,
      "category": "groceries",
      "description": "Grocery shopping",
      "userId": 1,
      "createdAt": "2024-12-01T10:00:00Z",
      "updatedAt": "2024-12-01T10:00:00Z"
    }
  ]
}
```
