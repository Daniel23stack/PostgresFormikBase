## Getting Started

First, run to install the nessary packages:
```bash
npm i 
```

This project serves as a foundation for future development of the migration function. 
Currently, it is based on the configurations given in accountManagement.tsx. 
This includes the local / postgreSQL server, which allows for a rudimentary database and form hooks. 

If the database 'challenge' and the tables 'accounts' and 'transactions' are available on the user's workstation, the postgres queries will work as intended. Once the setup is complete, use the following command to make the forms available to you.

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
