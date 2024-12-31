## API Endpoints

### POST /users/register

#### Description
Registers a new user in the system.

#### Request Body
```json
{
  "fullname": {
    "firstname": "string (min 3 characters, required)",
    "lastname": "string (min 3 characters, optional)"
  },
  "email": "string (valid email format, required)",
  "password": "string (required)"
}
```

#### Responses

##### Success
- **Status Code:** 201 Created
- **Response Body:**
  ```json
  {
    "user": {
      "_id": "string",
      "fullname": {
        "firstname": "string",
        "lastname": "string"
      },
      "email": "string",
      "socketId": "string"
    },
    "token": "string"
  }
  ```

##### Error
- **Status Code:** 400 Bad Request
- **Response Body:**
  ```json
  {
    "errors": [
      {
        "msg": "string",
        "param": "string",
        "location": "string"
      }
    ]
  }
  ```
### POST /users/login

#### Description
Logs in an existing user.

#### Request Body
```json
{
    "email": "string (valid email format, required)",
    "password": "string (required)"
}
```

#### Responses

##### Success
- **Status Code:** 200 OK
- **Response Body:**
    ```json
    {
        "user": {
            "_id": "string",
            "fullname": {
                "firstname": "string",
                "lastname": "string"
            },
            "email": "string",
            "socketId": "string"
        },
        "token": "string"
    }
    ```

##### Error
- **Status Code:** 401 Unauthorized
- **Response Body:**
    ```json
    {
        "errors": [
            {
                "msg": "Invalid email or password",
                "param": "email/password",
                "location": "body"
            }
        ]
    }
    ```