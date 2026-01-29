<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# 🧩 Broomees Backend Assignment (NestJS + MongoDB)

Backend REST API implementation for the **Broomees** technical assessment, built using **NestJS** and **MongoDB**.  
This project demonstrates API design, validation (DTOs), token-based auth, business rules (409), and relational features like friendships and hobbies.

---

## ✨ Highlights

- ✅ User CRUD (Create, Read, Update, Delete)
- ✅ Token-based authentication (`Bearer <token>`) for guarded routes
- ✅ Delete-user business rules with correct **409 Conflict**
- ✅ Relationships (add/remove)
- ✅ Hobbies (add/remove)
- ✅ Metrics endpoint for reputation system stats
- ✅ DTO validation using `class-validator`
- ✅ MongoDB transactions for relationship consistency (where applicable)

---

## 🧰 Tech Stack

- **NestJS**
- **TypeScript**
- **MongoDB + Mongoose**
- `bcrypt`
- `class-validator`, `class-transformer`
- `dotenv`

---

## 📦 Installation

### 1) Clone the repository

git clone <YOUR_REPO_URL>
cd broomees-backend

### 2) Install
npm install

### 3) Environment

Create .env from .env.example:

cp .env.example .env


📄 .env.example

PORT=3000
MONGO_URI=mongodb://localhost:27017/broomees-backend

TOKEN_EXPIRY_MINUTES=60
DELETE_REPUTATION_THRESHOLD=0

### 4) Run
npm run start:dev


## 📚 API References

👤 Users
- GET	/api/users	List users (paginated)
- GET	/api/users/:id	Get user
- POST	/api/users	Create user
- PUT	/api/users/:id	Update user
- DELETE	/api/users/:id	Delete user (guarded)


🤝 Relationships
- POST	/api/users/:id/relationships	Create relationship
- DELETE	/api/users/:id/relationships	Remove relationship

🎯 Hobbies
- POST	/api/users/:id/hobbies	Add hobby
- DELETE	/api/users/:id/hobbies	Remove hobby

📊 Metrics
- GET	/api/metrics/reputation	System-wide reputation stats


## .env example
MONGODB_URL= LINK


DELETE_REPUTATION_THRESHOLD= <>

TOKEN_HASH_ROUNDS=<>

TOKEN_EXPIRY_MINUTES=<>


--- Kanishq 
