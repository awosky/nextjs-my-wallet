import Head from "next/head";

import Navbar from "@/components/Navbar";
import PieChart from "@/components/PieChart";

export default function Home() {
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
        <PieChart />
      </main>
    </>
  );
}
