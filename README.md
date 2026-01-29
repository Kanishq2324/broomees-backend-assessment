<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

 
## Description

🧩 Broomees Backend Assignment — NestJS + MongoDB

Backend API implementation for the Broomees technical assessment, built using NestJS and MongoDB.

This project demonstrates REST API design, authentication via API tokens, business-rule enforcement, MongoDB transactions, DTO validation, and system-wide metrics.

🚀 Features Implemented

User CRUD APIs

API token authentication

Guarded delete endpoint

User relationships (add/remove)

User hobbies (add/remove)

Reputation metrics endpoint

Business rules with correct HTTP status codes

MongoDB transactions

DTO validation using class-validator

Pagination for list endpoints

Environment-based configuration

🛠 Tech Stack

NestJS

TypeScript

MongoDB + Mongoose

bcrypt

class-validator

dotenv

⚙️ Setup Instructions
1️⃣ Clone Repository
git clone <YOUR_REPO_URL>
cd broomees-backend

2️⃣ Install Dependencies
npm install

3️⃣ Environment Setup

Create a .env file from .env.example.

Example:

PORT=3000

MONGO_URI=mongodb://localhost:27017/broomees-backend

TOKEN_EXPIRY_MINUTES=60

DELETE_REPUTATION_THRESHOLD=0

4️⃣ Run Server
npm run start:dev


Server runs at:

http://localhost:3000

🔐 Authentication

Issue API Token:

POST /api/auth/token


Use returned token in requests:

Authorization: Bearer <TOKEN>


Only guarded endpoints require a token (e.g. DELETE user).

📚 API Endpoints
🔹 Auth
Method	Endpoint
POST	/api/auth/token
🔹 Users
Method	Endpoint
GET	/api/users
GET	/api/users/:id
POST	/api/users
PUT	/api/users/:id
DELETE	/api/users/:id (guarded)
🔹 Relationships
Method	Endpoint
POST	/api/users/:id/relationships
DELETE	/api/users/:id/relationships
🔹 Hobbies
Method	Endpoint
POST	/api/users/:id/hobbies
DELETE	/api/users/:id/hobbies
🔹 Metrics
Method	Endpoint
GET	/api/metrics/reputation
📖 API Usage Examples
➕ Create User
POST /api/users

{
  "username": "kanishq",
  "age": 22
}

🔐 Issue Token
POST /api/auth/token

{
  "userId": "<USER_ID>"
}

🤝 Add Relationship
POST /api/users/<USER_ID>/relationships

{
  "friendId": "<FRIEND_ID>"
}

🎯 Add Hobby
POST /api/users/<USER_ID>/hobbies

{
  "name": "Cricket"
}

⚠️ Error Handling

The API returns correct HTTP codes:

Scenario	Status
Validation error	400
Unauthorized	401
Resource not found	404
Conflict (business rules)	409
Rate limit exceeded	429 (planned)
🧠 Design Notes

Delete user is guarded using API token authentication.

User deletion is blocked if:

reputationScore is above configured threshold

active relationships exist

MongoDB transactions are used to maintain relationship consistency.

DTOs handle request validation.

Metrics endpoint uses Mongo aggregation.

⚡ Limitations / Future Improvements

Rate limiting not implemented due to time constraints.

Reputation calculation is minimal and can be extended.

Redis-based caching for throttling.

Swagger API documentation.

Background jobs for reputation recalculation.

🧪 Testing

All endpoints were tested using Postman.

Recommended flow:

1️⃣ Create users
2️⃣ Issue token
3️⃣ Create relationships
4️⃣ Add hobbies
5️⃣ Test delete rules
6️⃣ Fetch metrics

📌 Author

Kanishq
Backend Developer Candidate
