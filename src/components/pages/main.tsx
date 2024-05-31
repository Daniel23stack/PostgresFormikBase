import WithdrawalForm from "@/components/common/bankformwithdrawal";
import BalanceForm from "@/components/common/bankformbalance";
import DepositForm from "@/components/common/bankformdeposit";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MainPage(){


    return (
        <>
        <div>
            <div className="m-auto w-6/12 p-8 mt-6 text-gray-700 bg-white rounded shadow-lg">
                <Tabs defaultValue="balance" className="w-[400px] m-auto">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="balance">Check Balance</TabsTrigger>
                        <TabsTrigger value="deposit">Deposit</TabsTrigger>
                        <TabsTrigger value="withdrawal">Withdrawal</TabsTrigger>
                    </TabsList>
                    <TabsContent value="balance"><BalanceForm/></TabsContent>
                    <TabsContent value="deposit"><DepositForm/></TabsContent>
                    <TabsContent value="withdrawal"><WithdrawalForm/></TabsContent>
                </Tabs>
            </div>  
        </div>
        </>
    )
}