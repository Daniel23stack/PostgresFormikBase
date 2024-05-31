"use client"
import {BankForm, BankStep } from "../common/bankform";
import * as Yup from 'yup';
import { ErrorMessage, Field} from 'formik';
import style from '@/styles/bankforms.module.scss';
import axios from 'axios';
import { ReactNode, useState } from "react";

export default function DepositForm(){
    const [depAccount, setDepAccount] = useState<ReactNode>(<></>);
    return(
        <>
        <BankForm 
            initialValues={{
                acct_num: 0,
                deposit: 0,
            }}
            onSubmit={async (values: Object) => {
            let options = {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                data: JSON.stringify(values),
                url : "/api/makedeposit",
              };
                try {
                    let dres = await axios(options);
                    
                    if(dres.data?.status === 'success'){
                        let t = <>
                        <p key='bal_acctNum'>Deposit Made!</p>
                        </>;
                        setDepAccount(t);
                    }else{
                        setDepAccount(<></>);
                    }
                } catch (error) {
                    setDepAccount(<><p>An Error has Occured</p></>);
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
                        <label htmlFor="deposit">Deposit Amount</label><br/>
                        <Field
                            autoComplete="deposit"
                            component="input"
                            id="deposit"
                            name="deposit"
                            placeholder="Deposit Amount"
                            type="number"
                        >
                        </Field>
                        <ErrorMessage className="error" component="div" name="deposit" />
                        </div>
                    </BankStep>
            </BankForm>
            <br/>
            {depAccount}
        </>
    )
}