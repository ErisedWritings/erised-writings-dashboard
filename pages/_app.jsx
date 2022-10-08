import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import Head from "next/head";
import "../styles/globals.css";
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div style={{ background: "rgba(220, 208, 255, 0.5)" }}>
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
