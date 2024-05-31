"use server"
import postgres from "postgres";


/**
* Replace with your PostgreSQL URL; this software expects the following to exist. 
* Challenge is a PostgreSQL database with two tables: accounts and transactions.
* Accounts is the following table - account_number: integer, name: text, amount: numeric, type: text, credit_limit: integer
* Transactions is the following table - id: primary key integer, account_number: integer, cur_amount: numeric, pre_amount: numeric, type: text, tact_time: timestamp with time zone.
*/
const sql = postgres('postgres://postgres:password@127.0.0.1:5342/challenge',{ 
      host : 'localhost',
      port : 5432,
      database: 'challenge',
      username: 'postgres',
      password: 'password'
    });


export async function makeDeposit(act_num : number, amount: number){
      try{
        const pullAccount = await sql`SELECT account_number, amount FROM challenge.accounts WHERE account_number = ${act_num}`;
        let preAmount = Number(pullAccount[0]?.amount);
        let curAmount = Number(preAmount + amount);
        
        await sql`
        UPDATE challenge.accounts set amount =${curAmount} WHERE account_number=${act_num} 
        `;
        
        const transaction = {
          account_number: Number(act_num),
          cur_amount: curAmount,
          pre_amount: preAmount,
          type: 'deposit'
        }
       await sql`INSERT INTO challenge.transactions ${sql(transaction,'account_number','cur_amount', 'pre_amount','type')}`;

        
       return {status: 'success'};

      }catch(e){
        return {status: 'fail', data: {}}
      }
}

export async function findAct (name: string, type: string){
    try{
   const find = await sql`SELECT account_number, name, amount, type, credit_limit 
   FROM challenge.accounts 
   WHERE name like ${name} AND type = ${type}`;     
      if(find.length >0){
        return {status: 'success', data: await find};
      }else{
        return {status: 'fail', data: {}};
      }
    }catch(e){
      return {status: 'fail', data: {}};
    }
}

export async function makeWithdrawal(act_num: number, amount: number, type: string){
  if(amount > 200 || amount < 0){
    return {status: 'unaccepted', message: 'Invalid Withdrawal Amount.'};
  }
  if(Number(amount) % 5 !== 0){
    return {status: 'unaccepted', message: 'Not Divisable by 5.'}
  }
  try{

    const transactions = await sql`SELECT account_number, cur_amount, pre_amount, type, tact_time
	FROM challenge.transactions WHERE account_number =${act_num} AND type='withdrawal' AND DATE(tact_time) = CURRENT_DATE ORDER BY tact_time ASC;`;
    const acct = await sql`SELECT account_number, name, amount, type, credit_limit 
    FROM challenge.accounts WHERE account_number=${act_num}`;
      if(acct.length > 0){
        if(acct[0]?.type ==='credit'){
           let a = Number(acct[0]?.amount);
           if(a - amount < 0){
            let b = Math.abs(amount) + Math.abs(a);
            if(b > Number(acct[0]?.credit_limit)){
              return {status:'unaccepted', message: 'Credit Limit Reached.'}
            }else{
              let wamount = 0;
              if(transactions.length > 0){
                let prev = transactions[0]?.pre_amount;
                let curr = transactions[transactions.length-1]?.cur_amount;
                let diff = prev - curr;
                if(diff + amount > 400){
                  return {status:'unaccepted', message: 'Daily Withdrawal Limit Reached.'}
                }
              }
              wamount = acct[0]?.amount - amount;
              const transaction = {
                account_number: Number(act_num),
                cur_amount: wamount,
                pre_amount: acct[0]?.amount,
                type: 'withdrawal'
              }
              await sql`
                  UPDATE challenge.accounts set amount =${wamount} WHERE account_number=${act_num} 
                `;
              await sql`INSERT INTO challenge.transactions ${sql(transaction,'account_number','cur_amount', 'pre_amount','type')}`;
              return {status:'success', message: 'Accepted Withdrawal'} 
            }
           }

        }else{
          let wamount = 0;
          if(transactions.length > 0){
            let prev = transactions[0]?.pre_amount;
            let curr = transactions[transactions.length-1]?.cur_amount;
            let diff = prev - curr;
            if(diff + amount > 400){
              return {status:'unaccepted', message: 'Daily Withdrawal Limit Reached.'}
            }
          }
          wamount = acct[0]?.amount - amount;
          const transaction = {
            account_number: Number(act_num),
            cur_amount: wamount,
            pre_amount: acct[0]?.amount,
            type: 'withdrawal'
          }
          await sql`
              UPDATE challenge.accounts set amount =${wamount} WHERE account_number=${act_num} 
            `;
          await sql`INSERT INTO challenge.transactions ${sql(transaction,'account_number','cur_amount', 'pre_amount','type')}`;
          return {status:'success', message: 'Accepted Withdrawal'} 
        }
      }else{
        return {status: 'unaccepted', message: 'Account does not exist.'};
      }
  }catch(e){
       return {status: 'fail', data: {}};
  }
}
