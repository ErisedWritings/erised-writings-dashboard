import { useEffect, useState, useCallback } from "react";
import { Container, Form } from "react-bootstrap";
import { client } from "../client";
import { useSession } from "next-auth/react";
import { ImSearch } from "react-icons/im";
import LargeNavbar from "../components/Navbar/largeNavbar";
import Navbar from "../components/Navbar/navbar";
import ResponseCard from "../components/responses/responseCard";
import Authenticate from "../components/authenticate";
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

export default function Responses({ responses }) {
  const isBreakpoint = useMediaQuery(991);
  const isMobileBreakpoint = useMediaQuery(500);
  const [searchVal, setSearchVal] = useState("");
  const { data: session } = useSession();
  if (session) {
    return (
      <div
        style={{ width: "100vw", height: "100vh" }}
        className="d-flex flex-row justify-content-start"
      >
        {isBreakpoint ? (
          <div style={{ padding: "0px", width: "45px", height: "80%" }}>
            <Navbar />
          </div>
        ) : (
          <div style={{ padding: "0px", width: "200px", height: "80%" }}>
            <LargeNavbar />
          </div>
        )}
        <Container
          fluid
          className="p-3"
          style={{ fontFamily: "Nunito", overflow: "auto" }}
        >
          <Container fluid>
            <div
              style={{ marginBottom: "20px" }}
              className="d-flex justify-content-between align-items-center"
            >
              <div>
                <h1>Responses</h1>
              </div>
              <div className="d-flex flex-row">
                <h4 style={{ marginRight: "7px" }}>
                  <ImSearch />{" "}
                </h4>
                <Form>
                  <Form.Group>
                    {isMobileBreakpoint ? (
                      <Form.Control
                        style={{
                          borderRadius: "0px",
                          borderWidth: "0px 0px 2px 0px",
                          borderColor: "#222",
                          width: "100px",
                          background: "transparent",
                        }}
                        value={searchVal}
                        onChange={(e) => setSearchVal(e.target.value)}
                        type="text"
                        placeholder="Search..."
                      />
                    ) : (
                      <Form.Control
                        style={{
                          borderRadius: "0px",
                          borderWidth: "0px 0px 2px 0px",
                          borderColor: "#222",
                          width: "200px",
                          background: "transparent",
                        }}
                        value={searchVal}
                        onChange={(e) => setSearchVal(e.target.value)}
                        type="text"
                        placeholder="Search..."
                      />
                    )}
                  </Form.Group>
                </Form>
              </div>
            </div>
            <div>
              {responses
                ?.filter((val) => {
                  if (searchVal === "") {
                    return val;
                  } else if (
                    (val.user &&
                      val.user
                        .toLowerCase()
                        .includes(searchVal.toLowerCase())) ||
                    (val.email &&
                      val.email
                        .toLowerCase()
                        .includes(searchVal.toLowerCase())) ||
                    (val.response &&
                      val.response
                        .toLowerCase()
                        .includes(searchVal.toLowerCase())) ||
                    (val.publishedAt &&
                      val.publishedAt
                        .toLowerCase()
                        .includes(searchVal.toLowerCase()))
                  ) {
                    return val;
                  }
                })
                .map((e, key) => {
                  return (
                    <ResponseCard
                      key={key}
                      user={e.user}
                      email={e.email}
                      date={e.publishedAt}
                      response={e.response}
                    />
                  );
                })}
            </div>
          </Container>
        </Container>
      </div>
    );
  }
  return <Authenticate />;
}

export const getServerSideProps = async () => {
  const query = '*[_type=="response"]';
  const responses = await client.fetch(query);
  return {
    props: {
      responses,
    },
  };
};
