# ETS WebDev : DVD Rental

Midterm test of Web Development class of Bandung State Polytechnic 2021

# Setup

To run the app there are a few requirements to be installed and setup on your device,

1. Docker or a Postgresql Instance
2. NodeJS
3. Yarn

After all of the requirement are installed and setup. Then follow these tutorial below sequentially.

## Database Setup

Before setting up any part of the app, the first requirement are to hava a working instance of Postgresql database. There will be 2 ways to do it, if you have a working instance of Postgresql with pgadmin or access to `pg_restore`. And the other one if you rather use a docker to start the database.

### Using pgAdmin

Import the dump file located at `./dvdrental-db/dvdrental.tar` following the [restore dialog](https://www.pgadmin.org/docs/pgadmin4/development/restore_dialog.html).

### Using `pg_restore`

To import using `pg_restore` make sure you have a running instance of Postgresql first, then follow these commands

1. Make sure your console are on the repository root, a.k.a the directory this README file are located
2. Go to `dvdrental-db` directory

   ```sh
   cd ./dvdrental-db
   ```

3. Restore using the dump file (`dvdrental.tar`)

   ```sh
   pg_restore -U dvdrental -c -d dvdrental -v --no-owner --no-privileges "dvdrental.tar"
   ```

   In this example the user used are "dvdrental", you can change it to the user you've created or create a new user for this.

   NOTE : If there's no database named `dvdrental` in the database, change `-c` in the command to `-C`, it will create the database for you

### Using docker

To use docker to start an container of configured database follow these commands,

1. Make sure your console are on the repository root, a.k.a the directory this README file are located
2. Go to `dvdrental-db` directory

   ```sh
   cd ./dvdrental-db
   ```

3. Build the image, in this case we will name the image `dvdrental-db`

   ```sh
   docker build -t dvdrental-db .
   ```

4. Start an instance using `dvdrental-db` image

   ```sh
   docker run -d -p 5432:5432 --name dvdrental-db dvdrental-db
   ```

   This container will be named "dvdrental-db" and will expose port 5432 to communicate to the database.

## Backend Setup

To setup the backend, please follows the [setup guide](https://github.com/fauh45/ETS_3A_MuhammadFauzan/tree/main/backend#setup) at the backend folder.

## Frontend Setup

To setup the backend, please follows the [setup guide](https://github.com/fauh45/ETS_3A_MuhammadFauzan/tree/main/frontend#setup) at the frontend folder.

# Technology Used

This project uses,

1. Postgresql

   The database used in this project to store all of the Staff rows.

2. Docker, and Dockerfile

   Docker and Dockerfile used to create database container which will be reproducible nearly everywhere.

3. Node JS

   From tooling to code, Node JS are basically used everywhere in this project.

4. Vue 3

   UI libary used to make the frontend of the app itself.

5. Axios

   Promise based HTTP client, that has been proven by many, even by me to be easy to used, and Typescript friendly!

6. Vue Query

   Library like React Query, used to control query result, from caching, invalidation, error handling, and more.

7. Fastify

   Express-like framework that runs way faster than express, and more Typescript friendly.

8. Prisma

   ORM on steroids, from generating schema of the existing database, creating typescript mapping, and being postgresql client as well.

# License

MIT
