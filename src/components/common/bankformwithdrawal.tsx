"use client"
import {BankForm, BankStep } from "./bankform";
import { ErrorMessage, Field } from 'formik';
import style from '@/styles/bankforms.module.scss';
import axios from 'axios';
import { ReactNode, useState } from "react";

export default function WithdrawalForm(){
    const [withAccount, setWithAccount] = useState<ReactNode>(<></>);
    return(
        <>
        <BankForm 
            initialValues={{
                acct_num: 0,
                withdrawal: 0,
                accountType: 'checking'
            }}
            onSubmit={async (values: Object) => {
            let options = {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                data: JSON.stringify(values),
                url : "/api/makewithdrawal",
              };
                try {
                    let dres = await axios(options);
                    let t = <></>;
                    if( dres.data?.status === 'success' || dres.data?.status === 'unaccepted'){
                        t=<><p key="with_mes">{dres.data?.message}</p></>
                    }
                    setWithAccount(t);
                } catch (error) {
                    setWithAccount(<><p>An Error has occured</p></>);
                }
            }}>
                    <BankStep
                        >
                        <div>
                        <label htmlFor="acct_num">Account Number</label><br/>
                        <Field
                            autoComplete="acct_num"
                            component="input"
                            id="acct_num"
                            name="acct_num"
                            placeholder="Account Number"
                            type="number"
                        />
                        <ErrorMessage className="error" component="div" name="acct_num" />
                        </div>
                        <div>
                        <label htmlFor="withdrawal">Withdrawl Amount</label><br/>
                        <Field
                            autoComplete="withdrawal"
                            component="input"
                            id="withdrawal"
                            name="withdrawal"
                            placeholder="Withdrawal Amount"
                            type="number"
                        >
                        </Field>
                        <ErrorMessage className="error" component="div" name="withdrawal" />
                        </div>
                        <div>
                        <label htmlFor="accountType">Account Type</label><br/>
                        <Field
                            autoComplete="accountType"
                            component="select"
                            id="accountType"
                            name="accountType"
                            placeholder="Account Type"
                            type="select"
                        >
                            <option value="checking">Checking</option>
                            <option value="savings">Savings</option>
                            <option value="credit">Credit</option>
                        </Field>
                        <ErrorMessage className="error" component="div" name="accountType" />
                        </div>
                    </BankStep>
            </BankForm>
            <br/>
            {withAccount}
        </>
    )
}