"use server"
import postgres from "postgres";


/**
 * Daniel23Stack - Foundational work for the connection and postgres logic.
 * 
*/
const sql = postgres({ 
      host : process.env.POSTGRES_HOST,
      port : Number(process.env.POSTGRES_PORT),
      database: process.env.POSTGRES_DB,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD
    });


export async function makeDeposit(act_num : number, amount: number){
      try{
        if(act_num <= 0 || amount <= 0 ){
          return {status: 'fail', data: {}};
        }
        const pullAccount = await sql`SELECT account_number, amount FROM accounts WHERE account_number = ${act_num}`;
        
        let preAmount = Number(pullAccount[0]?.amount);
        let curAmount = Number(preAmount + amount);
        
        await sql`
        UPDATE accounts set amount =${curAmount} WHERE account_number=${act_num} 
        `;
        
        const transaction = {
          account_number: Number(act_num),
          cur_amount: curAmount,
          pre_amount: preAmount,
          type: 'deposit'
        }
       await sql`INSERT INTO transactions ${sql(transaction,'account_number','cur_amount', 'pre_amount','type')}`;

        
       return {status: 'success'};

      }catch(e){
        return {status: 'fail', data: {}}
      }
}

export async function findAct (name: string, type: string){
    try{
   const find = await sql`SELECT account_number, name, amount, type, credit_limit 
   FROM accounts
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
  if(act_num <= 0){
    return {status: 'unaccepted', message: 'Invalid Account.'};
  }
  if(amount > 200 || amount <= 0){
    return {status: 'unaccepted', message: 'Invalid Withdrawal Amount.'};
  }
  if(Number(amount) % 5 !== 0){
    return {status: 'unaccepted', message: 'Not Divisable by 5.'}
  }
  try{

    const transactions = await sql`SELECT account_number, cur_amount, pre_amount, type, tact_time
	FROM transactions WHERE account_number =${act_num} AND type='withdrawal' AND DATE(tact_time) = CURRENT_DATE ORDER BY tact_time ASC;`;
    const acct = await sql`SELECT account_number, name, amount, type, credit_limit 
    FROM accounts WHERE account_number=${act_num}`;
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
                  UPDATE accounts set amount =${wamount} WHERE account_number=${act_num} 
                `;
              await sql`INSERT INTO transactions ${sql(transaction,'account_number','cur_amount', 'pre_amount','type')}`;
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
              UPDATE accounts set amount =${wamount} WHERE account_number=${act_num} 
            `;
          await sql`INSERT INTO transactions ${sql(transaction,'account_number','cur_amount', 'pre_amount','type')}`;
          return {status:'success', message: 'Accepted Withdrawal'} 
        }
      }else{
        return {status: 'unaccepted', message: 'Account does not exist.'};
      }
  }catch(e){
       return {status: 'fail', data: {}};
  }
}
