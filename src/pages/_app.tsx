import "@/styles/globals.scss";

import { ConfigProvider } from "antd";
import type { AppProps } from "next/app";

import CategoryProvider from "@/providers/CategoryProvider";
import SyncProvider from "@/providers/SyncProvider";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
      </Head>
      <ConfigProvider
        theme={{
          token: {
            fontFamily: "Open Sans",
            colorPrimary: "#6395F9",
            colorPrimaryBorder: "#6395F9",
          },
        }}
      >
        <SyncProvider>
          <CategoryProvider>
            <Component {...pageProps} />
          </CategoryProvider>
        </SyncProvider>
      </ConfigProvider>
    </>
  );
}
