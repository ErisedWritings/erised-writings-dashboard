import { client, urlFor } from "../client";
import CountUp from "react-countup";
import { Col, Container, Form, Row } from "react-bootstrap";
import Navbar from "../components/Navbar/navbar";
import { ImSearch } from "react-icons/im";
import { useState, useCallback, useEffect } from "react";
import LargeNavbar from "../components/Navbar/largeNavbar";
import PostCard from "../components/posts/postCard";
import Link from "next/link";
import PostSmallCard from "../components/posts/postSmallCard";

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
export default function Dashboard({
  analytics,
  comments,
  responses,
  posts,
  categories,
}) {
  const isBreakpoint = useMediaQuery(991);
  const noPosts = posts.length;
  const isMobileBreakpoint = useMediaQuery(500);

  const noComments = comments.length;
  const noResponses = responses.length;
  const [searchVal, setSearchVal] = useState("");
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
        style={{ fontFamily: "Nunito", overflow: "auto" }}
        className="p-3"
      >
        <Container fluid>
          <h1>Dashboard</h1>
        </Container>
        <div className="d-flex flex-column" style={{ marginTop: "20px" }}>
          <Container fluid style={{ width: "100%" }}>
            <div>
              <Row>
                <Col sm={12} md={6} lg={3} style={{ marginBottom: "15px" }}>
                  {" "}
                  <Container
                    fluid
                    className="p-2"
                    style={{
                      background: "#fefefe",
                      border: "none",
                      borderRadius: "10px",
                      boxShadow:
                        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                    }}
                  >
                    <h3>
                      <CountUp start={0} end={298} duration={3} decimal="," />
                    </h3>
                    <h3> Views</h3>
                  </Container>
                </Col>
                <Col sm={12} md={6} lg={3} style={{ marginBottom: "15px" }}>
                  {" "}
                  <Container
                    fluid
                    className="p-2"
                    style={{
                      background: "#fefefe",
                      border: "none",
                      borderRadius: "10px",
                      boxShadow:
                        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                    }}
                  >
                    <h3>
                      {" "}
                      <CountUp
                        start={0}
                        end={noPosts}
                        duration={3}
                        decimal=","
                      />
                    </h3>
                    <h3> Posts</h3>
                  </Container>
                </Col>
                <Col sm={12} md={6} lg={3} style={{ marginBottom: "15px" }}>
                  {" "}
                  <Container
                    fluid
                    className="p-2"
                    style={{
                      background: "#fefefe",
                      border: "none",
                      borderRadius: "10px",
                      boxShadow:
                        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                    }}
                  >
                    <h3>
                      {" "}
                      <CountUp
                        start={0}
                        end={noComments}
                        duration={3}
                        decimal=","
                      />
                    </h3>
                    <h3> Comments</h3>
                  </Container>
                </Col>
                <Col sm={12} md={6} lg={3} style={{ marginBottom: "15px" }}>
                  {" "}
                  <Container
                    fluid
                    className="p-2"
                    style={{
                      background: "#fefefe",
                      border: "none",
                      borderRadius: "10px",
                      boxShadow:
                        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                    }}
                  >
                    <h3>
                      {" "}
                      <CountUp
                        start={0}
                        end={noResponses}
                        duration={3}
                        decimal=","
                      />
                    </h3>
                    <h3> Responses</h3>
                  </Container>
                </Col>
              </Row>
            </div>
          </Container>
          <Container fluid style={{ width: "100%", marginTop: "30px" }}>
            <div className="d-flex flex-row justify-content-between">
              <div>
                <h1>Posts</h1>
              </div>
              <div>
                <div className="d-flex flex-row align-items-center">
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
            </div>
            <div>
              {isBreakpoint ? (
                <Row>
                  {posts
                    ?.filter((val) => {
                      if (searchVal === "") {
                        return val;
                      } else if (
                        (val.title &&
                          val.title
                            .toLowerCase()
                            .includes(searchVal.toLowerCase())) ||
                        (val.description &&
                          val.description
                            .toLowerCase()
                            .includes(searchVal.toLowerCase())) ||
                        (val.body &&
                          val.body
                            .toLowerCase()
                            .includes(searchVal.toLowerCase()))
                      ) {
                        return val;
                      }
                    })
                    .slice(0, 10)
                    .map((e, key) => {
                      return (
                        <Col
                          sm={12}
                          key={key}
                          md={6}
                          className="d-flex justify-content-center"
                        >
                          <div
                            style={{
                              marginTop: "20px",
                              marginBottom: "20px",
                              padding: "0px",
                            }}
                          >
                            <Link href={"/posts/" + e._id}>
                              <div>
                                {" "}
                                <PostSmallCard
                                  title={
                                    e.title !== undefined ? e.title : "Untitled"
                                  }
                                  image={
                                    e.mainImage !== undefined
                                      ? urlFor(e.mainImage.asset._ref)
                                      : "/1600x900.png"
                                  }
                                  description={
                                    e.description ? e.description : ""
                                  }
                                  isPub={e.isPublished}
                                  category={
                                    categories.find(
                                      (x) => x._id === e.category._ref
                                    ).title
                                  }
                                  categoryColor={
                                    categories.find(
                                      (x) => x._id === e.category._ref
                                    ).color
                                  }
                                  date={
                                    e.publishAt !== undefined ? e.publishAt : ""
                                  }
                                  pubColor={
                                    e.isPublished === true
                                      ? "#90EE90"
                                      : "#FF4444"
                                  }
                                />
                              </div>
                            </Link>
                          </div>
                        </Col>
                      );
                    })}
                </Row>
              ) : (
                <>
                  {posts
                    ?.filter((val) => {
                      if (searchVal === "") {
                        return val;
                      } else if (
                        (val.title &&
                          val.title
                            .toLowerCase()
                            .includes(searchVal.toLowerCase())) ||
                        (val.description &&
                          val.description
                            .toLowerCase()
                            .includes(searchVal.toLowerCase())) ||
                        (val.body &&
                          val.body
                            .toLowerCase()
                            .includes(searchVal.toLowerCase()))
                      ) {
                        return val;
                      }
                    })
                    .slice(0, 10)
                    .map((e, key) => {
                      return (
                        <div
                          key={key}
                          style={{
                            marginTop: "20px",
                            marginBottom: "20px",
                            padding: "0px",
                          }}
                        >
                          <Link href={"/posts/" + e._id}>
                            <div>
                              <PostCard
                                title={
                                  e.title !== undefined ? e.title : "Untitled"
                                }
                                image={
                                  e.mainImage !== undefined
                                    ? urlFor(e.mainImage.asset._ref)
                                    : "/1600x900.png"
                                }
                                description={e.description ? e.description : ""}
                                isPub={e.isPublished}
                                category={
                                  categories.find(
                                    (x) => x._id === e.category._ref
                                  ).title
                                }
                                categoryColor={
                                  categories.find(
                                    (x) => x._id === e.category._ref
                                  ).color
                                }
                                date={
                                  e.publishAt !== undefined ? e.publishAt : ""
                                }
                                pubColor={
                                  e.isPublished === true ? "#90EE90" : "#FF4444"
                                }
                              />
                            </div>
                          </Link>
                        </div>
                      );
                    })}
                </>
              )}
            </div>
            <div className="d-flex justify-content-end">
              <Link href="/posts">
                <div>
                  <h6>View all posts...</h6>
                </div>
              </Link>
            </div>
          </Container>
        </div>
      </Container>
    </div>
  );
}

export const getServerSideProps = async () => {
  const query = '*[_type=="comment"]';
  const comments = await client.fetch(query);

  const query2 = '*[_type=="response" ]';
  const responses = await client.fetch(query2);

  const query3 = '*[_type=="post" ]';
  const posts = await client.fetch(query3);
  const query4 = '*[_type=="category"]';
  const categories = await client.fetch(query4);
  return {
    props: {
      comments,
      responses,
      posts,
      categories,
    },
  };
};
