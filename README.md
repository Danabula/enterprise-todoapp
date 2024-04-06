# Todoapp

The industrial grade todo application.
Tailored to have te neccesaties for all business needs!

## Creating the database

The database should have a table tododb and you can change the .env file to change the password.
Or if you don't have a dedicated database, create a new user with permission to create a database and update the .env file.
Then run
```shell
npx prisma db push
```
to sync the prisma schema to the database.

