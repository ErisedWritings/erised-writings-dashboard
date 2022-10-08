import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import Head from "next/head";
import "../styles/globals.css";
import { UserProvider } from "@auth0/nextjs-auth0";
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div style={{ background: "rgba(220, 208, 255, 0.5)" }}>
        <UserProvider>
          {" "}
          <Component {...pageProps} />
        </UserProvider>{" "}
      </div>
    </>
  );
}

export default MyApp;
