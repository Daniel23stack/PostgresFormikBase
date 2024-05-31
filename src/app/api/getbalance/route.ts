import { NextResponse } from "next/server";
import { findAct } from "@/components/hooks/accountManagement";

export async function POST(req: Request) {
  const {userName, accountType} = await req.json();
  if(!userName || !accountType){
    return NextResponse.json({message: 'Invalid Send'}, {status: 400});
  }
  let acctInfo = await findAct(userName, accountType);
  return NextResponse.json({ message: "Hello get balance", ...acctInfo}, {status: 200});
}