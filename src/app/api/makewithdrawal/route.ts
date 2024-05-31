import { NextResponse } from "next/server";
import { makeWithdrawal } from "@/components/hooks/accountManagement";

export async function POST(req: Request) {
  const {acct_num, withdrawal ,accountType} = await req.json();

  if(!acct_num || !accountType || !withdrawal){
    return NextResponse.json({message: 'Invalid Send'}, {status: 400});
  }

  let acctInfo = await makeWithdrawal(acct_num, withdrawal, accountType);
  return NextResponse.json({ message: "Hello make deposit", ...acctInfo}, {status: 200});
}