import "@/styles/globals.scss";

import { ConfigProvider } from "antd";
import type { AppProps } from "next/app";

import CategoryProvider from "@/providers/CategoryProvider";
import SyncProvider from "@/providers/SyncProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
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
