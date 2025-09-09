```
course-management/
│
├── config/
│   └── db.js               
│
├── controllers/              
│   ├── authController.js
│   ├── courseController.js
│   └── purchaseController.js
│
├── middlewares/
│   ├── authMiddleware.js     
│   └── errorHandler.js       
│
├── models/                  
│   ├── User.js
│   ├── Course.js
│   └── Purchase.js
│
├── routes/                  
│   ├── authRoutes.js
│   ├── courseRoutes.js
│   └── purchaseRoutes.js
│
├── utils/
│   └── tokenUtils.js         
│
├── .env                      
├── .gitignore
├── package.json
|__ app.js                     # api collection 
├── server.js                 # Entry point
└── README.md
```




---

## **Base URL**

```
http://localhost:5000/api
```

---

## **1. Register User**

**Endpoint:**

```
POST /auth/register
```

**Body (JSON):**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456",
  "role": "user"
}
```

**Response:**

```json
{
  "message": "User registered successfully",
  "user": {
    "id": "64fabc1234abcd...",
    "email": "john@example.com",
    "role": "user"
  }
}
```

---

## **2. Login User**

**Endpoint:**

```
POST /auth/login
```

**Body (JSON):**

```json
{
  "email": "john@example.com",
  "password": "123456"
}
```

**Response:**

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## **3. Refresh Token**

**Endpoint:**

```
POST /auth/refresh
```

**Body (JSON):**

```json
{
  "token": "<refreshToken>"
}
```

**Response:**

```json
{
  "accessToken": "new_access_token_here"
}
```

---

## **4. Logout**

**Endpoint:**

```
POST /auth/logout
```

(No body needed)
**Response:**

```json
{
  "message": "Logged out successfully (client should delete tokens)"
}
```

---

## **5. Purchase a Course**

**Endpoint:**

```
POST /purchases
```

**Headers:**

```
Authorization: Bearer <accessToken>
```

**Body (JSON):**

```json
{
  "courseId": "64fabc5678efgh..." 
}
```

**Response:**

```json
{
  "message": "Course purchased successfully",
  "purchase": {
    "_id": "64fabcd12345...",
    "userId": "64fabc1234abcd...",
    "courseId": "64fabc5678efgh...",
    "amount": 100,
    "date": "2025-09-08T19:15:00.000Z"
  }
}
```

---

## **6. View Purchased Courses**

**Endpoint:**

```
GET /purchases
```

**Headers:**

```
Authorization: Bearer <accessToken>
```

**Response:**

```json
{
  "purchases": [
    {
      "_id": "64fabcd12345...",
      "courseId": {
        "_id": "64fabc5678efgh...",
        "title": "Node.js Masterclass",
        "price": 100
      },
      "amount": 100,
      "date": "2025-09-08T19:15:00.000Z"
    }
  ]
}
```

---



