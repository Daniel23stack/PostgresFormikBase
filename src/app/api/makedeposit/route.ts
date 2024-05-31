import { NextResponse } from "next/server";
import { makeDeposit } from "@/components/hooks/accountManagement";

export async function POST(req: Request) {
  const {acct_num, deposit} = await req.json();
  if(!acct_num || !deposit){
    return NextResponse.json({message: 'Invalid Send'}, {status: 400});
  }
  let acctInfo = await makeDeposit(acct_num, deposit);
  return NextResponse.json({ message: "Hello make deposit", ...acctInfo}, {status: 200});
}