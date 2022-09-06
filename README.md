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
  "token": "RandomTokenGenerated"
}
```

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

Create database

```bash
  cd src/db/dbConfig
```

```bash
  bash ./create-database
```

```bash
  cd ../../..
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
