## Getting Started

First, run to install the nessary packages:
```bash
npm i 
```

This project is a base that is to be expanded upon and will utualize the migration function in the future. 
Currently it relies on the following configurations laid out in the accountManagement.tsx. 
This includes the local / postgreSQL running to allow for a simple database and form hooks. 

If the database 'challenge' and the tables 'accounts' and 'transactions' are available on the users system the postgres Queries will run as expected. Once the setup is down run the following command below and the forms will be available for you.

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
