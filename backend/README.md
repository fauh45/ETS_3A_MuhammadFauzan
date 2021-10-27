# DVD Rental Backend

Backend of midterm tasks for web development class of Bandung State Polytechnic 2021.

# Note on Prisma Schema

From the original schema that are provided there are a slight changes, in some of the fields. The reason are type mismatch from the referenced field from another table and the id in the table itself. For example in table "store" the field "manager_staff_id" references field "staff_id" in table "staff". The field type of "manager_staff_id" are SmallInt while in the field it references "staff_id" the type are Integer, this could couse a problem if the "staff_id" is sufficiently high.

This only affects the prisma schema `./prisma/schema.prisma` and not the database.

# Setup

To run the backend app, the requirement are,

1. NodeJS
2. Yarn
3. An already setup database using the README from the root of the repository

After all of the requirement are installed and setup. Then follow these tutorial below sequentially.

## Project Setup

To setup the project, install all the depedencies first, execute command `yarn` at the root of this repository.

## Prisma Setup

1. Create `.env` file in the root of this backend repository, the content are following,

   ```
   DATABASE_URL="postgresql://your-postgres-username:your-postgres-password@localhost:5432/your-postgres-db?schema=public"
   ```

   If you are following the database using docker tutorial, use these `.env` content,

   ```
   DATABASE_URL="postgresql://dvdrental:dvdrental@localhost:5432/dvdrental?schema=public"
   ```

2. Create type defintion for the prisma client

   ```sh
   yarn prisma generate
   ```

# Usage

To start the backend,

1. Make sure the correct Postgresql have been started
2. Start using

   ```sh
   yarn dev
   ```

3. Go to the link shown in the terminal

## API Documentation

All API routes are documented in `/docs` of the backend.
