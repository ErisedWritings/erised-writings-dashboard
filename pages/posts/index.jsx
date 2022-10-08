import { client, urlFor } from "../../client";

import Navbar from "../../components/Navbar/navbar";
import { ImSearch } from "react-icons/im";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import PostModal from "../../components/posts/modals/postModal";

import { useState, useCallback, useEffect } from "react";
import LargeNavbar from "../../components/Navbar/largeNavbar";
import PostCard from "../../components/posts/postCard";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0";
import Authenticate from "../../components/authenticate/authentiate";
import PostSmallCard from "../../components/posts/postSmallCard";
import { Container, Form, Row, Col, Button } from "react-bootstrap";

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

export default function Posts({ posts, categories }) {
  const isBreakpoint = useMediaQuery(991);
  const isMobileBreakpoint = useMediaQuery(500);
  const [showModal, setShowModal] = useState(false);

  const [searchVal, setSearchVal] = useState("");
  const { user, error, isLoading } = useUser();
  if (!isLoading && !user) return <Authenticate />;
  if (user && !isLoading)
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
          <PostModal show={showModal} onHide={() => setShowModal(false)} />

          <div
            style={{
              alignSelf: "end",
              position: "fixed",
              bottom: "0",
              right: "0",
            }}
            className="d-flex justify-content-end  align-items-end"
          >
            <Button
              variant="dark"
              style={{
                marginBottom: "20px",
                marginRight: "30px",
                borderRadius: "15px",
              }}
              onClick={() => setShowModal(true)}
            >
              <h4>
                <AiOutlineAppstoreAdd />
              </h4>
            </Button>
          </div>

          <Container
            fluid
            className="d-flex flex-row justify-content-between align-items-center"
          >
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
          </Container>
          <Container fluid>
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
          </Container>
        </Container>
      </div>
    );
}

export const getServerSideProps = async () => {
  const query = '*[_type=="post"]';
  const posts = await client.fetch(query);

  const query2 = '*[_type=="category"]';
  const categories = await client.fetch(query2);

  return {
    props: {
      posts,
      categories,
    },
  };
};
