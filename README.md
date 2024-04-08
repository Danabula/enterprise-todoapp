# Todoapp

The enterprise todo application.
Tailored to have te necessities for all business needs!

## Installating

```shell
# clone the repository
git clone --depth=1 https://github.com/Danabula/enterprise-todoapp
cd enterprise-todoapp

# install the dependencies
npm i

# run the development server
npm run dev

# or build for use with a http(s) server
npm run build
```

## Creating the database

The database should have a table tododb and you can change the .env file to change the password.
Or if you don't have a dedicated database, create a new user with permission to create a database and update the .env file.
Then run

```shell
npx prisma db push
```

to sync the prisma schema to the database.

