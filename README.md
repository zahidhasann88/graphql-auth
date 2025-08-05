# GraphQL Authentication API

A simple GraphQL API with JWT authentication built with Node.js, TypeScript, PostgreSQL, and Apollo Server.

## Features

- User registration and login
- JWT token-based authentication
- Password hashing with bcrypt
- Protected GraphQL queries/mutations
- PostgreSQL database integration

## Tech Stack

- **Node.js** + **TypeScript**
- **GraphQL** with Apollo Server
- **PostgreSQL** database
- **JWT** for authentication
- **bcrypt** for password hashing

## Quick Start

### 1. Clone and Install
```bash
git clone <your-repo>
cd graphql-auth
npm install
```

### 2. Database Setup
```bash
# Create PostgreSQL database
psql -U postgres
CREATE DATABASE graphql_auth;
\q
```

### 3. Environment Variables
Create `.env` file:
```env
JWT_SECRET=your-secret-key
DB_USER=postgres
DB_PASSWORD=your-password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=graphql_auth_practice
```

### 4. Run Migration
```bash
npm run migrate
```

### 5. Start Server
```bash
npm run dev
```

Server runs at: `http://localhost:4000/graphql`

## API Examples

### Register User
```graphql
mutation {
  register(input: {
    email: "user@example.com"
    password: "password123"
    name: "John Doe"
  }) {
    token
    user { id email name }
  }
}
```

### Login
```graphql
mutation {
  login(input: {
    email: "user@example.com"
    password: "password123"
  }) {
    token
    user { id email name }
  }
}
```

### Get Current User (Protected)
```graphql
# Headers: { "Authorization": "Bearer YOUR_JWT_TOKEN" }
query {
  me { id email name created_at }
}
```

## License

MIT