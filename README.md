<h1 align="center">News Aggregator API</h1>

<p align="center">
<a href="#features">Features</a> •
<a href="#installation">Installation</a> •
<a href="#dependencies">Dependencies</a> •
<a href="#routes">API Endpoints</a> •
<a href="#testing">Testing</a> 
</p>



<h2 id="features">📂 Features</h2>

- 🔐 User Registration & Authentication (JWT-based)  
- 👤 Manage user preferences (topics of interest)  
- 📰 Fetch news based on preferences  
- 📖 Track read articles  
- ✅ Comprehensive automated tests (using **tap** & **supertest**)  

---

<h2 id="installation">⚙️ Installation</h2>

### 1️⃣ Clone the repository
```bash
git clone https://github.com/airtribe-projects/news-aggregator-api-Sharifa26.git
cd news-aggregator-api-Sharifa26
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Environment Setup
Create a `.env` file in the root directory:
```ini
MONGO_URI = YOUR_MONGO_URI
JWT_SECRET = YOUR_JWT_SECRET
PORT=3000
NEWS_API_KEY=YOUR_NEWS_API_KEY

```

### 4️⃣ Run the server
```bash
node server.js
```
or with **nodemon** (for development):
```bash
npm run dev
```

---

<h2 id="dependencies">📦 Dependencies</h2>

| Package       | Purpose |
|---------------|---------|
| **express**   | Web framework |
| **mongoose**  | MongoDB ODM |
| **bcrypt**    | Password hashing |
| **jsonwebtoken** | JWT authentication |
| **dotenv**    | Environment config |
| **axios**     | Fetching external news APIs |
| **cors**      | Cross-Origin support |

### Dev Dependencies
- **tap** – Test runner  
- **supertest** – API endpoint testing  
- **nodemon** – Development auto-restart  
- **cross-env** – Cross-platform env vars  

---

<h2 id="routes">🚀 API Endpoints</h2>

### 🔑 Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/users/auth/register` | Register a new user |
| `POST` | `/users/auth/login` | Login user and get JWT |

<details>
<summary>📌 Example: Register User</summary>

**Request**
```http
POST /users/auth/register
Content-Type: application/json

{
  "name": "Clark Kent",
  "email": "clark@test.com",
  "password": "Krypt()n8",
  "preferences": ["movies", "comics"]
}
```

**Response**
```json
{
  "status": "success",
  "message": "User registered successfully",
  "data": {
    "_id": "66c8f1e...",
    "name": "Clark Kent",
    "email": "clark@test.com",
    "preferences": ["movies", "comics"]
  }
}
```
</details>

<details>
<summary>📌 Example: Login User</summary>

**Request**
```http
POST /users/auth/login
Content-Type: application/json

{
  "email": "clark@test.com",
  "password": "Krypt()n8"
}
```

**Response**
```json
{
  "status": "success",
  "message": "Login successful",
  "total": 1,
  "data": {
    "token": "eyJhbGciOiJIUzI1..."
  }
}
```
</details>

---

### 👤 User Preferences
| Method | Endpoint | Description |
|--------|----------|-------------|
| `PUT` | `/users/preferences` | Update preferences (auth required) |
| `GET` | `/users/preferences` | Get preferences (auth required) |

<details>
<summary>📌 Example: Update Preferences</summary>

**Request**
```http
PUT /users/preferences
Authorization: Bearer <JWT>
Content-Type: application/json

{
  "preferences": ["tech", "science"]
}
```

**Response**
```json
{
  "status": "success",
  "message": "Preferences updated",
  "data": ["tech", "science"]
}
```
</details>
<details>
<summary>📌 Example: Get Preferences</summary>

**Request**
```http
GET /users/preferences
Authorization: Bearer <JWT>
```

**Response**
```json
{
  "status": "success",
  "message": "Preferences updated",
  "data": ["tech", "science"]
}
```
</details>

---

### 📰 News
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/users/news` | Get personalized news by preferences |
| `POST` | `/users/news/read` | Mark article as read |
| `GET` | `/users/news/read` | Get list of read articles |
|`GET` | `/users/news/search` | Search news by keywords |
|`GET` | `/users/news/favorites` | Get list of favorite news |
|`POST` | `/users/news/favorites` | Add news to favorites |

<details>
<summary>📌 Example: Fetch News</summary>

**Request**
```http
GET /users/news
Authorization: Bearer <JWT>
```

**Response**
```json
{
  "status": "success",
  "data": [
    {
      "title": "Latest Tech Trends 2025",
      "url": "https://example.com/article",
      "source": "TechCrunch"
    }
  ]
}
```
</details>

<details>
<summary>📌 Example: Mark Article as Read</summary>

**Request**
```http
POST /users/news/read
Authorization: Bearer <JWT>
Content-Type: application/json

{
  "url": "https://example.com/test-article"
}
```

**Response**
```json
{
  "status": "success",
  "message": "Article marked as read"
}
```
</details>

<details>
<summary>📌 Example: Get Read Articles</summary>

**Request**
```http
GET /users/news/read
Authorization: Bearer <JWT>
```

**Response**
```json
{
  "status": "success",
  "data": ["https://example.com/test-article"]
}
```
</details>

<details>
<summary>📌 Example: Search News</summary>

**Request**
```http
GET /users/news/search
Authorization: Bearer <JWT>
```

**Response**
```json
{
  "status": "success",
  "data": [
    {
      "title": "Latest Tech Trends 2025",
      "url": "https://example.com/article",
      "source": "TechCrunch"
    }
  ]
}
```
</details>

<details>
<summary>📌 Example: Get Favorites</summary>

**Request**
```http
GET /users/news/favorites
Authorization: Bearer <JWT>
```

**Response**
```json
{
  "status": "success",
  "data": [
    {
      "title": "Latest Tech Trends 2025",
      "url": "https://example.com/article",
      "source": "TechCrunch"
    }
  ]
}
```
</details>

<details>
<summary>📌 Example: Add Favorite</summary>

**Request**
```http
POST /users/news/favorites
Authorization: Bearer <JWT>
Content-Type: application/json

{
  "url": "https://example.com/test-article"
}
```

**Response**
```json
{
  "status": "success",
  "message": "Article marked as favorite"
}
```
</details>

---

<h2 id="testing">🧪 Running Tests</h2>

### Environment Setup for Testing
Create a `.env.test` file in the root directory:
```ini
MONGO_URI = YOUR_MONGO_URI_FOR_TESTING
JWT_SECRET = YOUR_JWT_SECRET_FOR_TESTING
PORT=3001
NEWS_API_KEY=YOUR_NEWS_API_KEY

```

### Run all tests
```bash
npm test
```

### Test Coverage ✅
- ✔️ Register user (success & fail)  
- ✔️ Login (success & invalid credentials)  
- ✔️ Update & fetch preferences  
- ✔️ Unauthorized access handling  
- ✔️ Fetch news by preferences  
- ✔️ Mark article as read & fetch read list  

---


## 📬 Postman Collection  

👉 Import Collection Here

bash 
```
https://api.postman.com/collections/22925333-07aec833-f0f5-4f9f-a1fb-b78a0bb744d3?access_key=PMAT-01K35KHT8DS04P699E8JM9H7Q2

```

---

## 👩‍💻 Author  
**Sharifa** ✨  
📧 Contact: [ sharifasheriff26@gmail.com ]  
