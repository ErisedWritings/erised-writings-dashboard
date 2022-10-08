import Navbar from "../../../components/Navbar/navbar";
import { ImSearch } from "react-icons/im";
import { client } from "../../../client";
import CommentCard from "../../../components/posts/comments/commentCard";
import { useState, useCallback, useEffect } from "react";
import LargeNavbar from "../../../components/Navbar/largeNavbar";
import { useUser } from "@auth0/nextjs-auth0";
import Authenticate from "../../../components/authenticate/authentiate";
import { Container, Form } from "react-bootstrap";
import { useRouter } from "next/router";

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

export default function Comments({ comments }) {
  const router = useRouter();
  const slug = router.query.slug;
  const isBreakpoint = useMediaQuery(991);
  const isMobileBreakpoint = useMediaQuery(500);

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
          <Container
            fluid
            style={{ marginBottom: "20px" }}
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
          {comments
            ?.filter((val) => {
              if (searchVal === "") {
                return val;
              } else if (
                (val.email.toLowerCase().includes(searchVal.toLowerCase()) ||
                  val.user.toLowerCase().includes(searchVal.toLowerCase()) ||
                  val.comment.toLowerCase().includes(searchVal.toLowerCase()) ||
                  (val.reply !== undefined &&
                    val.reply
                      .toLowerCase()
                      .includes(searchVal.toLowerCase()))) &&
                val.postid === slug
              ) {
                return val;
              }
            })
            .map((e, key) => {
              return (
                <div key={key}>
                  <CommentCard
                    path={"/editor/" + slug + "/comments"}
                    key={key}
                    show={e.show}
                    date={e.publishedAt}
                    email={e.email}
                    user={e.user}
                    id={e._id}
                    slug={slug}
                    comment={e.comment}
                    reply={e.reply ? e.reply : null}
                    style={{ marginBottom: "10px" }}
                  />
                </div>
              );
            })}
        </Container>
      </div>
    );
}

export const getServerSideProps = async () => {
  const query = '*[_type=="comment"]';
  const comments = await client.fetch(query);

  return {
    props: {
      comments,
    },
  };
};
