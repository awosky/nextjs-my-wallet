import Head from "next/head";
import { useContext, useEffect, useState } from "react";

import Balance from "@/components/Balance";
import Loading from "@/components/Loading";
import Navbar from "@/components/Navbar";
import PieChart from "@/components/PieChart";
import Transaction from "@/components/Transaction";
import { SyncContext } from "@/providers/SyncProvider";
import { getDates, getExpenseTransactions, getTotalBalance, getTransactions } from "@/utils/storage";

export default function Home() {
  const { sync, setSync } = useContext(SyncContext);
  const [data, setData] = useState<any>({
    balance: 0,
    dates: [],
    transactions: [],
    expenses: [],
  });

  useEffect(() => {
    if (!sync) {
      setData({
        balance: getTotalBalance(),
        dates: getDates(),
        transactions: getTransactions(),
        expenses: getExpenseTransactions(),
      });

      setSync(true);
    }
  }, [setSync, sync]);

  if (!sync) return <Loading />;

  return (
    <>
      <Head>
        <title>My Wallet</title>
        <meta
          name="description"
          content="Our wallet website helps you manage your money online. With easy-to-use tools, you can track your expenses, income, and make secure transactions. Our platform is designed to simplify financial management for everyone, whether you're a student or a business owner."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar />
        <Balance balance={data.balance} />
        <PieChart expense={data.expenses} />
        <Transaction dates={data.dates} data={data.transactions} />
      </main>
    </>
  );
}
