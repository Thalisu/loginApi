# LOGIN API WITH PSQL

## Install

    npm install

## .env configuration

    JWT_SECRET: any secret value
    DATABASE_URL: your postgres url

## Run the app

    npm run dev

## Login with a user

### Request

`POST /api/user/login`

    body: {
        email: string email
        password: string min(6) 1 capital 1 number 1 special character
    }

### Response

    Status: 200 OK

    response: {
        accessToken: string;
        user: {
            name: string;
        };
        }

## Create a new user

### Request

`POST /api/user/register`

    body: {
        name: string min(2)
        email: string email
        password: string min(6) 1 capital 1 number 1 special character
        confirmPassword: same as password
    }

### Response

    Status: 201 CREATED

    response: {
        name: string;
        email: string;
        id: string;
    }

## Get user

### Request

`GET /api/user/id`

    header Authorization: Bearer accessToken

### Response

    Status: 200 OK

    user: {
        id: string;
        name: string;
        email: string;
    }

## Update user name or email

### Request

`PATCH /api/user/id`

    body: {
        name?: string min(2)
        email?: string email
    }

    header Authorization: Bearer accessToken

### Response

    Status: 200 OK

    updatedUser: {
        name: string;
        email: string;
    }

## Update user password

### Request

`PATCH /api/user/password/id`

    body: {
        oldPassword: string min(6) 1 capital 1 number 1 special character;
        newPassword: string min(6) 1 capital 1 number 1 special character;
        confirmNewPassword: same as newPassword;
    }

    header Authorization: Bearer accessToken

### Response

    Status: 200 OK

    updatedUser: {
        name: string;
        email: string;
    }

## Delete current user

### Request

`Delete /api/user/id`

### Response

    Status 204 NO CONTENT