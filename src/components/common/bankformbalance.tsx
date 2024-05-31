"use client"
import {BankForm, BankStep } from "../common/bankform";
import { ErrorMessage, Field} from 'formik';
import style from '@/styles/bankforms.module.scss';
import axios from 'axios';
import { ReactNode, useState } from "react";

export default function BalanceForm(){
    const [account, setAccount] = useState<ReactNode>(<></>);
    return(
        <>
        <BankForm 
            initialValues={{
                userName: '',
                accountType: 'checking',
            }}
            onSubmit={async (values: Object) => {
            let options = {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                data: JSON.stringify(values),
                url : "/api/getbalance",
              };
                try {
                    let response = await axios(options);
                    if(response.data?.status === 'success'){
                        
                        let ad = response.data?.data[0];
                        let c = (ad?.credit_limit) ? <p key='bal_credit'>{ad.credit_limit}</p> : <></>;
                        let t = <>
                        <p key='bal_acctNum'>Account Number: {ad?.account_number}</p> 
                        <p key='bal_name'>Account Name: {ad?.name}</p>
                        <p key='bal_amount'> Account Amount: {ad?.amount}</p>
                        <p key='bal_type'>Account Type: {ad?.type}</p>
                        {c}
                        </>;
                        setAccount(t);
                    }else{
                        setAccount(<></>);
                    }
                } catch (error) {
                    setAccount(<><p>An Error has Occured</p></>);
                }
            }}>
                    <BankStep
                        >
                        <div>
                        <label htmlFor="userName">Full Name</label><br/>
                        <Field
                            autoComplete="given-name"
                            component="input"
                            id="userName"
                            name="userName"
                            placeholder="Full Name"
                            type="text"
                        />
                        <ErrorMessage className="error" component="div" name="userName" />
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
            {account}

        </>
    )
}