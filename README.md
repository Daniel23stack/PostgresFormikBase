This project serves as a foundation for future developments of different websites, the initial form taking the form of a simple bank.
It was a pure and simple Next.JS 14+ Template that allows the developer to instantly have a PostgreSQL, Next.JS, and Formik base installed.
Allowing for expanded development but a simple and pure base that can be added to for your needs. 
Currently there are three forms that allow for hook modification that run systems of postgres. 
Feel free to use as a credited template. 

Getting Started

To set up the environment, follow these steps:

Install Node.js version 20 or higher by visiting https://nodejs.org/en/download/.

Clone the repository using Git: git clone https://github.com/Daniel23stack/simplebankapp.

Navigate to the cloned directory: cd simplebankapp.

Create a new PostgreSQL database matching your POSTGRES_DB variable in the .env file You may use any client tool like pgAdmin or pgcli.
    
Update the values in the env variables file (.env) with the PostgreSQL connection information:
    DATABASE_URL=postgres://postgres:password@127.0.0.1:5432/test
    POSTGRES_HOST=localhost
    POSTGRES_PORT=5432
    POSTGRES_DB=test
    POSTGRES_USER=postgres
    POSTGRES_PASSWORD=password
    PGM_MIGRATIONS_DIRECTORY=migrations
    PGM_MIGRATIONS_TABLE=public.migrations
    
Once completed, run the following scripts:

    ```bash
    npm i 
    npm run migrate up
    ```

This should have resulted in the creation of two tables in your database: accounts and transactions, both under the public schema.
If the tables can be seen correctly, the final command to perform is:

    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.