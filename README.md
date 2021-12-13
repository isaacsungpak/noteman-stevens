# Noteman Stevens
[Noteman Stevens](https://noteman-stevens.herokuapp.com/) is a minimalistic note-taking application inspired by [Evernote](https://evernote.com/).

## Running the Project
### Installation Instructions
In the root directory, run `npm install` to install all dependencies.

### Setting up
1. Clone the GitHub repo from `https://github.com/isaacsungpak/noteman-stevens`
2. Start PostgreSQL, if necessary
3. Create a user with CREATEDB privileges
4. Copy the contents of `backend/.env.example` into a new `backend/.env` file, and replace the example credentials with the values used in step 3
5. Create the database with the command: `npx dotenv sequelize db:create`
6. Run migrations with the command: `npx dotenv sequelize db:migrations`
7. Seed the database with the command: `npx dotenv sequelize db:seed:all`
8. Run the backend with the command `npm start` in the `backend` directory
9. In a new terminal, run `npm start` in the `frontend` directory

## Technologies Used
* PostgreSQL
* Express
* React
* Node.js
* BCrypt
* Sequelize
* Redux
