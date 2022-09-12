# DrivenPass-API

A Typescript designed project to manage your passwords and store them safely.

<p align="center">
  <img src="https://img.icons8.com/clouds/200/000000/lock--v1.png"/>
</p>
<h1 align="center">
  DrivenPass
</h1>
<div align="center">

  <h3>Built With</h3>

  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" height="30px"/>  
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express.js&logoColor=white" height="30px"/>
  <!-- Badges source: https://dev.to/envoy_/150-badges-for-github-pnk -->
</div>

<br/>

# Description

DrivenPass simulates an API that manages your passwords, storing them in differents ways (Websites or services, Credit cards, Private notes and Wi-fi's connections).

</br>

## Features

- Create your user and log in.
- Choose what option do you want to save your passwords (sites, cards, wi-fis...)
- Store your credentials.
- You will never forgot your passwords again! :)

</br>

## API Reference

### Sign up

```http
POST /sign-up
```

#### Request:

| Body       | Type     | Description                 |
| :--------- | :------- | :-------------------------- |
| `email`    | `string` | **Required**. User email    |
| `password` | `string` | **Required**. User password |

#

### Login

```http
POST /log-in
```

#### Request:

| Body       | Type     | Description                 |
| :--------- | :------- | :-------------------------- |
| `email`    | `string` | **Required**. User email    |
| `password` | `string` | **Required**. User password |

</br>

#### Response:

```json
{
 "RandomTokenGenerated"
}
```

#

### Create a credential

```http
POST /credentials
```

#### Request:

| Body       | Type     | Description                       |
| :--------- | :------- | :-------------------------------- |
| `title`    | `string` | **Required**. Credential title    |
| `url`      | `string` | **Required**. Credential url      |
| `username` | `string` | **Required**. Credential username |
| `password` | `string` | **Required**. Credential password |

</br>

####

| Headers         | Type     | Description                    |
| :-------------- | :------- | :----------------------------- |
| `Authorization` | `string` | **Required**. 'Bearer `token`' |

####

#

### Get all credential from user

```http
GET /credentials
```

####

| Headers         | Type     | Description                    |
| :-------------- | :------- | :----------------------------- |
| `Authorization` | `string` | **Required**. 'Bearer `token`' |

####

#### Response:

```json
{
  "user": "user@email",
  "userId": "number",
  "credentials": ["array of user credentials"]
}
```

#

### Get credentials by ID

```http
GET /credentials/:id
```

#### Request:

| Params | Type      | Description                 |
| :----- | :-------- | :-------------------------- |
| `id`   | `integer` | **Required**. Credential Id |

####

| Headers         | Type     | Description                    |
| :-------------- | :------- | :----------------------------- |
| `Authorization` | `string` | **Required**. 'Bearer `token`' |

####

#### Response:

```json
{
  "id": "number",
  "title": "string",
  "url": "url",
  "username": "string",
  "password": "string",
  "userId": "number"
}
```

#

### Delete credentials by ID

```http
DELETE /credentials/:id
```

#### Request:

| Params | Type      | Description                 |
| :----- | :-------- | :-------------------------- |
| `id`   | `integer` | **Required**. Credential Id |

####

| Headers         | Type     | Description                    |
| :-------------- | :------- | :----------------------------- |
| `Authorization` | `string` | **Required**. 'Bearer `token`' |

####

#

### Create a safe notes

```http
POST /safe-notes
```

#### Request:

| Body          | Type     | Description                         |
| :------------ | :------- | :---------------------------------- |
| `title`       | `string` | **Required**. Title                 |
| `noteTitle`   | `string` | **Required**. Safe note name        |
| `description` | `string` | **Required**. Safe note description |

`noteTitle max length: 40`
`description max length: 1000`

</br>

####

| Headers         | Type     | Description                    |
| :-------------- | :------- | :----------------------------- |
| `Authorization` | `string` | **Required**. 'Bearer `token`' |

####

#

### Get all safe notes from user

```http
GET /safe-notes
```

####

| Headers         | Type     | Description                    |
| :-------------- | :------- | :----------------------------- |
| `Authorization` | `string` | **Required**. 'Bearer `token`' |

####

#### Response:

```json
{
  "user": "user@email",
  "userId": "number",
  "safeNotes": ["array of user safe notes"]
}
```

#

### Get safe notes by ID

```http
GET /safe-notes/:id
```

#### Request:

| Params | Type      | Description                 |
| :----- | :-------- | :-------------------------- |
| `id`   | `integer` | **Required**. Credential Id |

####

| Headers         | Type     | Description                    |
| :-------------- | :------- | :----------------------------- |
| `Authorization` | `string` | **Required**. 'Bearer `token`' |

####

#### Response:

```json
{
  "id": "number",
  "title": "string",
  "noteTitle": "url",
  "description": "string",
  "userId": "number"
}
```

#

### Delete safe notes by ID

```http
DELETE /safe-notes/:id
```

#### Request:

| Params | Type      | Description                 |
| :----- | :-------- | :-------------------------- |
| `id`   | `integer` | **Required**. Credential Id |

####

| Headers         | Type     | Description                    |
| :-------------- | :------- | :----------------------------- |
| `Authorization` | `string` | **Required**. 'Bearer `token`' |

####

#

### Create a cards

```http
POST /cards
```

#### Request:

| Body             | Type        | Description                             |
| :--------------- | :---------- | :-------------------------------------- |
| `title`          | `string`    | **Required**. Card Title                |
| `number`         | `string`    | **Required**. Card number               |
| `cardHolderName` | `string`    | **Required**. Card holder name          |
| `cvc`            | `string`    | **Required**. Card cvc                  |
| `password`       | `string`    | **Required**. Card password             |
| `expirationDate` | `date`      | **Required**. Card expirationDate       |
| `isVirtual`      | `boolean`   | **Required**. If Card is virtual or not |
| `type`           | `card Type` | **Required**. credit, debit or both     |

`card number length: 16`
`cvc length: 3`
`type can only be credit, debit or both (string)`

</br>

####

| Headers         | Type     | Description                    |
| :-------------- | :------- | :----------------------------- |
| `Authorization` | `string` | **Required**. 'Bearer `token`' |

####

#

### Get all cards from user

```http
GET /cards
```

####

| Headers         | Type     | Description                    |
| :-------------- | :------- | :----------------------------- |
| `Authorization` | `string` | **Required**. 'Bearer `token`' |

####

#### Response:

```json
{
  "user": "user@email",
  "userId": "number",
  "cards": ["array of user cards"]
}
```

#

### Get cards by ID

```http
GET /cards/:id
```

#### Request:

| Params | Type      | Description                 |
| :----- | :-------- | :-------------------------- |
| `id`   | `integer` | **Required**. Credential Id |

####

| Headers         | Type     | Description                    |
| :-------------- | :------- | :----------------------------- |
| `Authorization` | `string` | **Required**. 'Bearer `token`' |

####

#### Response:

```json
{
  "id": "number",
  "title": "string",
  "number": "string",
  "cardHolderName": "string",
  "cvc": "string",
  "expirationDate": "date",
  "password": "string",
  "isVirtual": "boolean",
  "type": "card Type",
  "userId": "number"
}
```

#

### Delete cards by ID

```http
DELETE /cards/:id
```

#### Request:

| Params | Type      | Description                 |
| :----- | :-------- | :-------------------------- |
| `id`   | `integer` | **Required**. Credential Id |

####

| Headers         | Type     | Description                    |
| :-------------- | :------- | :----------------------------- |
| `Authorization` | `string` | **Required**. 'Bearer `token`' |

####

#

### Create a wi-fi

```http
POST /wi-fis
```

#### Request:

| Body          | Type     | Description                 |
| :------------ | :------- | :-------------------------- |
| `title`       | `string` | **Required**. Wifi Title    |
| `networkName` | `string` | **Required**. Wifi name     |
| `password`    | `string` | **Required**. Wifi password |

</br>

####

| Headers         | Type     | Description                    |
| :-------------- | :------- | :----------------------------- |
| `Authorization` | `string` | **Required**. 'Bearer `token`' |

####

#

### Get all wi-fis from user

```http
GET /wi-fis
```

####

| Headers         | Type     | Description                    |
| :-------------- | :------- | :----------------------------- |
| `Authorization` | `string` | **Required**. 'Bearer `token`' |

####

#### Response:

```json
{
  "user": "user@email",
  "userId": "number",
  "wifis": ["array of user wifis"]
}
```

#

### Get wi-fis by ID

```http
GET /wi-fis/:id
```

#### Request:

| Params | Type      | Description                 |
| :----- | :-------- | :-------------------------- |
| `id`   | `integer` | **Required**. Credential Id |

####

| Headers         | Type     | Description                    |
| :-------------- | :------- | :----------------------------- |
| `Authorization` | `string` | **Required**. 'Bearer `token`' |

####

#### Response:

```json
{
  "id": "number",
  "title": "string",
  "networkName": "string",
  "password": "string",
  "userId": "number"
}
```

#

### Delete wi-fis by ID

```http
DELETE /wi-fis/:id
```

#### Request:

| Params | Type      | Description                 |
| :----- | :-------- | :-------------------------- |
| `id`   | `integer` | **Required**. Credential Id |

####

| Headers         | Type     | Description                    |
| :-------------- | :------- | :----------------------------- |
| `Authorization` | `string` | **Required**. 'Bearer `token`' |

####

#

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL = postgres://UserName:Password@Hostname:5432/DatabaseName`

`PORT = number #recommended:5000`

`SECRET_KEY = any string`

</br>

## Run Locally

Clone the project

```bash
  git clone https://github.com/ricardomartinso/DrivenPass-API
```

Go to the project directory

```bash
  cd DrivenPass-API/
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

</br>

## Lessons Learned

In this project I learned a lot about how to structure an API with TypeScript

</br>

## Acknowledgements

- [Awesome Badges](https://github.com/Envoy-VC/awesome-badges)

</br>

## Authors

- Ricardo Martins is a full stack student at Driven Education. Nowadays he studies Computer Engineering at UFPA,
  looking forward to become a Dev.
  <br/>

#
