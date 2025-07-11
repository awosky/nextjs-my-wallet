import Head from "next/head";
import { useContext, useEffect, useState } from "react";

import Balance from "@/components/Balance";
import Chart from "@/components/Chart";
import Loading from "@/components/Loading";
import Navbar from "@/components/Navbar";
import Transactions from "@/components/Transaction";
import { SyncContext } from "@/providers/SyncProvider";
import { getDates, getExpenseTransactions, getTotalBalance, getTotalIncome, getTransactions, Transaction } from "@/utils/storage";

interface Data {
  income: number;
  balance: number;
  dates: string[];
  transactions: Transaction[];
  expenses: Transaction[];
}

export default function Home() {
  const { sync, setSync } = useContext(SyncContext);
  const [data, setData] = useState<Data>({
    income: 0,
    balance: 0,
    dates: [],
    transactions: [],
    expenses: [],
  });

  useEffect(() => {
    if (!sync) {
      setData({
        income: getTotalIncome(),
        balance: getTotalBalance(),
        dates: getDates(),
        transactions: getTransactions(),
        expenses: getExpenseTransactions(),
      });

      setTimeout(() => setSync(true), 500);
    }
  }, [setSync, sync]);

  return (
    <>
      <Head>
        <title>My Wallet</title>
        <meta
          name="description"
          content="Our wallet website helps you manage your money online. With easy-to-use tools, you can track your expenses, income, and make secure transactions. Our platform is designed to simplify financial management for everyone, whether you're a student or a business owner."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Loading isLoading={!sync}>
          <Navbar />
          <Balance income={data.income} balance={data.balance} />
          <Chart expenses={data.expenses} />
          <Transactions dates={data.dates} data={data.transactions} />
        </Loading>
      </main>
    </>
  );
}
