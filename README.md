# Rare Things back

This repository contains de backend files for the Rare Things app which allows users to upload images and vote them. This app is generated with Node.js and Express.


## Technologies

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Bcryptjs](https://www.npmjs.com/package/bcrypt)
- [Jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [Multer](https://www.npmjs.com/package/multer)
- [MySQL](https://www.mysql.com/)

## Requirements

- Node.js and npm installed in your system.

## Instruccions to start the server

**✔️ Step 1:** Start database server using XAMPP or a similar tool. Import database from **database/rare_things.sql**.

**✔️ Step 2:** Clone the repository:

```bash
git clone https://github.com/fran-cesc/Sprint_9_Rare_Things_back.git
```

**✔️ Step 3:** Go to the project directory:

```bash
cd things_back
```

**✔️ Step 4:** Copy the file **_.env.template_** and rename it to **_.env_**. This file will contain the environment variables needed for project configuration.

**✔️ Step 5:** Open the file **_.env_** and fill variables with your database info.

**✔️ Step 6:** Install dependencies:

```bash
npm install
```

## Execution

Run the application with:

```bash
npm start
```

## API Endpoints

### Users

- **GET /api/users**: Get all users
- **GET /api/users/:email**: Get user by email
- **POST /api/register**: Register new user
- **POST /api/login**: User login

### Things

- **GET /api/things**: Get all things
- **GET /api/things/:id**: Get thing by ID
- **POST /api/things**: Upload new Thing
- **POST /api/things/updatevotes**: Update Thing votes
- **DELETE /api/thing/:id**: Delete a Thing

### Votes

- **GET /api/hasvoted**: Verify if an user has voted a Thing
- **POST /api/vote**: Register user vote

## Contributions

If you would like to contribute to this project or report issues, please feel free to create an issue or submit a pull request.
