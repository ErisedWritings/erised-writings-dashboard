import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { useState, useCallback, useEffect } from "react";
import { Button } from "react-bootstrap";
import Image from "next/image";
import Head from "next/head";
const useMediaQuery = (width) => {
  const [targetReached, setTargetReached] = useState(false);

  const updateTarget = useCallback((e) => {
    if (e.matches) {
      setTargetReached(true);
    } else {
      setTargetReached(false);
    }
  }, []);

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${width}px)`);
    media.addEventListener("change", updateTarget);
    // Check on mount (callback is not called until a change occurs)
    if (media.matches) {
      setTargetReached(true);
    }

    return () => media.removeEventListener("change", updateTarget);
  }, []);

  return targetReached;
};

export default function Authenticate() {
  const isBreakpoint = useMediaQuery(768);
  const router = useRouter();
  if (isBreakpoint === undefined || isBreakpoint === undefined) {
    return <></>;
  }
  return (
    <>
      <Head>
        <title>Erised Writings Dashboard</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {isBreakpoint ? (
        <div
          style={{ width: "100%", height: "100vh" }}
          className="d-flex flex-column justify-content-center align-items-center"
        >
          <Image src={"/10258681_4384874.svg"} width="300px" height="300px" />
          <div className="d-flex flex-column justify-content-center align-items-center">
            <h1>Authenticate to Continue</h1>
            <Button
              variant="outline-dark"
              onClick={() => signIn()}
              style={{ width: "80px" }}
            >
              Login
            </Button>
          </div>
        </div>
      ) : (
        <div
          style={{ width: "100%", height: "100vh" }}
          className="d-flex flex-row justify-content-center align-items-center"
        >
          <Image src={"/10258681_4384874.svg"} width="300px" height="300px" />
          <div className="d-flex flex-column justify-content-center align-items-center">
            <h1>Authenticate to Continue</h1>
            <Button
              style={{ width: "80px" }}
              variant="outline-dark"
              onClick={() => signIn()}
            >
              Login
            </Button>
          </div>
        </div>
      )}
      <div style={{ marginTop: "100vh", fontSize: "10px", color: "#aaa" }}>
        <a href="https://www.freepik.com/free-vector/fingerprint-concept-illustration_10258681.htm#query=authentication&position=14&from_view=keyword">
          Image by storyset
        </a>{" "}
        on Freepik
      </div>
    </>
  );
}
