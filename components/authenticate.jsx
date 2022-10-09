import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useCallback, useEffect } from "react";
import { Button } from "react-bootstrap";
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
  return (
    <>
      {isBreakpoint ? (
        <div
          style={{ width: "100vw", height: "100vh" }}
          className="d-flex flex-column justify-content-center align-items-center"
        >
          <Image src={"/10258681_4384874.svg"} width="300px" height="300px" />
          <div className="d-flex flex-column justify-content-center align-items-center">
            <h1>Authenticate to Continue</h1>
            <Button
              variant="outline-dark"
              onClick={() => router.push("/api/auth/login")}
              style={{ width: "80px" }}
            >
              Login
            </Button>
          </div>
        </div>
      ) : (
        <div
          style={{ width: "100vw", height: "100vh" }}
          className="d-flex flex-row justify-content-center align-items-center"
        >
          <Image src={"/10258681_4384874.svg"} width="300px" height="300px" />
          <div className="d-flex flex-column justify-content-center align-items-center">
            <h1>Authenticate to Continue</h1>
            <Button
              style={{ width: "80px" }}
              variant="outline-dark"
              onClick={() => router.push("/api/auth/login")}
            >
              Login
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
