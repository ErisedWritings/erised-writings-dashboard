import Navbar from "../../../components/Navbar/navbar";
import { useState, useCallback, useEffect } from "react";
import LargeNavbar from "../../../components/Navbar/largeNavbar";
import { useRouter } from "next/router";
import { BsMenuDown } from "react-icons/bs";
import Authenticate from "../../../components/authenticate";
import DeleteModal from "../../../components/posts/modals/deleteModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";
import Assets from "../../../components/posts/assets";
import Navs from "../../../components/Navbar/navs";
import CategoryModal from "../../../components/posts/modals/catgeoryModal";
import { client, urlFor } from "../../../client";
import UploadAsset from "../../../components/posts/modals/uploadAsset";
import { Container, Form, Button, Row, Col, Stack } from "react-bootstrap";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import ScheduleModal from "../../../components/posts/modals/scheduleModal";

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
    if (media.matches) {
      setTargetReached(true);
    }

    return () => media.removeEventListener("change", updateTarget);
  }, []);

  return targetReached;
};

export default function BlogEditor({ post, categories, assets, comments }) {
  const isBreakpoint = useMediaQuery(991);
  const isMobileBreakpoint = useMediaQuery(768);
  const router = useRouter();
  const slug = router.query.slug;

  const [deletePost, setDeletePost] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showAssets, setShowAssets] = useState(false);
  const [body, setBody] = useState(post[0].body && post[0].body);
  const [uploadModalShow, setUploadModalShow] = useState(false);
  const [title, setTitle] = useState(post[0].title ? post[0].title : "");
  const [description, setDescription] = useState(
    post[0].description ? post[0].description : ""
  );
  const [mainImage, setMainImage] = useState(
    post[0].mainImage !== undefined ? post[0].mainImage.asset._ref : null
  );

  const [category, setCategory] = useState(
    categories.findIndex((x) => x._id === post[0].category._ref)
  );
  const { quill, quillRef } = useQuill();
  useEffect(() => {
    if (quill) {
      if (post[0].body !== undefined) {
        quill.clipboard.dangerouslyPasteHTML(post[0].body);
      }
      quill.on("text-change", (delta, oldDelta, source) => {
        setBody(quill.root.innerHTML);
      });
    }
  }, [quill]);
  const handler = (img) => {
    setShowAssets(false);
    setMainImage(img._id);
  };

  const missingFields = () => {
    toast("Missing Fields!");
  };
  const unpub = () => {
    toast("Post Unpublished");
  };
  const pub = () => {
    toast("Post Published");
  };
  const deleteCommentError = () => {
    toast(
      "Comments assosiated with the post failed to delete due to some error."
    );
  };
  const saveToast = () => {
    toast("Post Saved!");
  };
  const saveError = () => {
    toast("Some error occurred in saving the post!");
  };
  const unpubError = () => {
    toast("Post Unpublish failed due to some error.");
  };
  const pubError = () => {
    toast("Publish Post failed due to some error.");
  };
  const deleteError = () => {
    toast("Delete Post failed due to some error.");
  };

  const del = () => {
    if (deletePost === true) {
      client
        .delete(post[0]._id)
        .then(() => {
          router.push("/posts");
        })
        .catch((err) => {
          deleteError();
        });

      for (var i = 0; i < comments.length; i++) {
        if (comments[i].postid === post[0]._id) {
          client
            .delete(comments[i]._id)
            .then(() => {
              setDeletePost(false);
              router.push("/posts");
            })
            .catch((err) => {
              deleteCommentError();
            });
        }
      }
    }
  };
  const save = () => {
    client
      .patch(post[0]._id) // Document ID to patch
      .set({
        title: title,
        body: body,
        mainImage: {
          _type: "image",
          asset: { _type: "reference", _ref: mainImage },
        },
        description: description,
        category: { _type: "reference", _ref: categories[category]._id },
      })
      .commit() // Perform the patch and return a promise
      .then(() => {
        saveToast();
      })
      .catch((err) => {
        saveError();
      });
  };

  const unpublish = () => {
    client
      .patch(post[0]._id)
      .set({ isPublished: false })
      .commit()
      .then(() => {
        unpub();
        router.push("/posts");
      })
      .catch((err) => {
        if (err) {
          console.log(err);
          unpubError();
        }
      });
  };
  const publish = () => {
    const date = new Date();
    var today;
    if (date.getDate().toString().length === 2) {
      today =
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    } else {
      today =
        date.getFullYear() +
        "-" +
        (date.getMonth() + 1) +
        "-0" +
        date.getDate();
    }
    if (
      title !== "" &&
      title !== undefined &&
      title !== null &&
      description !== "" &&
      description !== undefined &&
      description !== null &&
      body !== "" &&
      body !== undefined &&
      body !== null &&
      category !== categories.findIndex((x) => x.title === "Undefined") &&
      category !== undefined &&
      category !== null &&
      mainImage !== "" &&
      mainImage !== undefined &&
      mainImage !== null
    ) {
      client
        .patch(post[0]._id) // Document ID to patch
        .set({
          title: title,
          description: description,
          isPublished: true,
          publishAt: today,
          mainImage: { asset: { _type: "reference", _ref: mainImage } },
          category: { _type: "reference", _ref: categories[category]._id },
        })
        .commit() // Perform the patch and return a promise
        .then(() => {
          router.push("/posts");
          pub();
        })
        .catch((err) => {
          pubError();
        });
    } else {
      missingFields();
    }
  };
  const schedulePublish = (date) => {
    var today = new Date();
    if (date.getDate().toString().length === 2) {
      today =
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    } else {
      today =
        date.getFullYear() +
        "-" +
        (date.getMonth() + 1) +
        "- 0" +
        date.getDate();
    }
    console.log(today);
    if (
      title !== "" &&
      title !== undefined &&
      title !== null &&
      description !== "" &&
      description !== undefined &&
      description !== null &&
      body !== "" &&
      body !== undefined &&
      body !== null &&
      category !== categories.findIndex((x) => x.title === "Undefined") &&
      category !== undefined &&
      category !== null &&
      mainImage !== "" &&
      mainImage !== undefined &&
      mainImage !== null
    ) {
      client
        .patch(post[0]._id) // Document ID to patch
        .set({
          title: title,
          description: description,
          isPublished: true,
          publishAt: today,
          mainImage: { asset: { _type: "reference", _ref: mainImage } },
          category: { _type: "reference", _ref: categories[category]._id },
        })
        .commit() // Perform the patch and return a promise
        .then(() => {
          router.push("/posts");
          pub();
        })
        .catch((err) => {
          pubError();
        });
    } else {
      missingFields();
    }
  };
  const { data: session } = useSession();
  if (session) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
        }}
        className="d-flex flex-row justify-content-start"
      >
        <ScheduleModal
          show={showScheduleModal}
          onHide={() => setShowScheduleModal(false)}
          pub={schedulePublish}
        />
        <UploadAsset
          save={save}
          path={"/posts/" + slug}
          show={uploadModalShow}
          onHide={() => setUploadModalShow(false)}
        />
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable={false}
          pauseOnHover={false}
        />
        <DeleteModal
          show={deletePost}
          onHide={() => setDeletePost(false)}
          delete={del}
        />
        <CategoryModal
          show={showCategoryModal}
          onHide={() => setShowCategoryModal(false)}
          path={"/posts/" + slug}
          save={save}
        />
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
          style={{
            fontFamily: "Nunito",
            overflow: "auto",
            backgroundImage: "url('/linus-nylund-JP23z_-dA74-unsplash.jpg')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="p-0"
        >
          <Container fluid style={{ width: "100%" }} className="p-0">
            <Navs slug={slug} />
          </Container>
          <div className="p-3">
            <Container
              fluid
              className="p-1 d-flex justify-content-center "
              style={{ color: "#000" }}
            >
              <div style={{ fontFamily: "Kaushan Script" }}>
                <h1>Blog Editor</h1>
              </div>
            </Container>
            {isMobileBreakpoint ? (
              <Container
                fluid
                style={{ width: "100%", marginBottom: "20px" }}
                className="p-0 d-flex flex-column justify-content-center"
              >
                <Container fluid style={{ width: "100%" }}>
                  <Form>
                    <Form.Group>
                      <Form.Label style={{ fontFamily: "Kaushan Script" }}>
                        <h4>Blog Title</h4>
                      </Form.Label>
                      <Form.Control
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        style={{
                          width: "100%",
                          background: "rgba(255,255,255, 0.5)",
                          border: "none",
                          borderRadius: "10px",
                          marginBottom: "20px",
                          boxShadow:
                            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                        }}
                      />
                      <Form.Label style={{ fontFamily: "Kaushan Script" }}>
                        <h4>Blog Description</h4>
                      </Form.Label>
                      <Form.Control
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        as="textarea"
                        rows={5}
                        style={{
                          width: "100%",
                          background: "rgba(255,255,255, 0.5)",
                          border: "none",
                          borderRadius: "10px",
                          marginBottom: "20px",
                          boxShadow:
                            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                        }}
                      />

                      <Form.Label style={{ fontFamily: "Kaushan Script" }}>
                        <h3>Category</h3>
                      </Form.Label>
                      <Container
                        fluid
                        className="d-flex flex-row justify-content-between"
                        style={{ padding: "0" }}
                      >
                        <Form.Control
                          as="select"
                          style={{
                            marginBottom: "20px",
                            width: "79%",
                            background: "rgba(255,255,255, 0.5)",
                            border: "none",
                            borderRadius: "10px",
                            marginBottom: "20px",
                            boxShadow:
                              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                            height: "45px",
                          }}
                          value={category}
                          onChange={(e) => {
                            setCategory(e.target.value);
                          }}
                          aria-label="Select Category..."
                        >
                          {categories?.map((e, key) => {
                            return (
                              <option value={key} key={key}>
                                {e.title}
                              </option>
                            );
                          })}
                        </Form.Control>
                        <Button
                          style={{
                            width: "19%",
                            height: "45px",
                            borderWidth: "2px",
                          }}
                          variant="outline-dark"
                          onClick={() => setShowCategoryModal(true)}
                        >
                          <b>Add</b>
                        </Button>
                      </Container>
                    </Form.Group>
                  </Form>
                </Container>
                <Container fluid style={{ width: "100%" }}>
                  <Form>
                    <Form.Group>
                      <Form.Label style={{ fontFamily: "Kaushan Script" }}>
                        <h3>Main Image</h3>
                      </Form.Label>
                      {mainImage && !showAssets ? (
                        <div className=" d-flex align-items-center">
                          <img
                            src={urlFor(mainImage)}
                            width="100%"
                            style={{
                              boxShadow:
                                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                              borderRadius: "10px",
                              marginBottom: "20px",
                            }}
                          />
                        </div>
                      ) : (
                        <></>
                      )}

                      <Container
                        fluid
                        style={{ marginBottom: "20px" }}
                        className="d-flex p-0  flex-row justify-content-between"
                      >
                        <Button
                          variant="outline-dark"
                          onClick={() => setShowAssets(!showAssets)}
                          style={{ width: "49%", borderWidth: "2px" }}
                        >
                          <b> Select</b>{" "}
                        </Button>
                        <Button
                          variant="outline-dark"
                          onClick={() => setUploadModalShow(true)}
                          style={{ width: "49%", borderWidth: "2px" }}
                        >
                          <b>Upload</b>
                        </Button>
                      </Container>

                      {showAssets ? (
                        <div
                          className="p-1 d-flex justify-content-center"
                          style={{
                            marginBottom: "10px",
                            borderRadius: "10px",
                            background: "rgba(255,255,255, 0.5)",
                            boxShadow:
                              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                          }}
                        >
                          <Row
                            className="d-flex justify-content-start p-1"
                            style={{ width: "100%" }}
                          >
                            {assets?.map((img, key) => {
                              return (
                                <Col
                                  key={key}
                                  style={{ padding: "5px" }}
                                  className="d-flex align-items-center justify-content-center"
                                  sm={6}
                                  xs={6}
                                >
                                  <Button
                                    onClick={() => {
                                      handler(img);
                                    }}
                                    style={{
                                      borderWidth: "0px",
                                      border: "none",
                                      padding: "0px",
                                      background: "transparent",
                                      width: "100px",
                                    }}
                                  >
                                    <Assets url={img} />
                                  </Button>
                                </Col>
                              );
                            })}
                          </Row>
                        </div>
                      ) : (
                        <></>
                      )}
                    </Form.Group>
                  </Form>
                </Container>
              </Container>
            ) : (
              <Container
                fluid
                style={{ width: "100%", marginBottom: "20px" }}
                className="p-0 d-flex justify-content-center align-items-center"
              >
                <Container fluid style={{ width: "59%" }}>
                  <Form>
                    <Form.Group>
                      <Form.Label style={{ fontFamily: "Kaushan Script" }}>
                        <h4>Blog Title</h4>
                      </Form.Label>
                      <Form.Control
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        style={{
                          width: "100%",
                          background: "rgba(255,255,255, 0.5)",
                          border: "none",
                          borderRadius: "10px",
                          marginBottom: "20px",
                          boxShadow:
                            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                        }}
                      />
                      <Form.Label style={{ fontFamily: "Kaushan Script" }}>
                        <h4>Blog Description</h4>
                      </Form.Label>
                      <Form.Control
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        as="textarea"
                        rows={5}
                        style={{
                          width: "100%",
                          background: "rgba(255,255,255, 0.5)",
                          border: "none",
                          borderRadius: "10px",
                          marginBottom: "20px",
                          boxShadow:
                            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                        }}
                      />

                      <Form.Label style={{ fontFamily: "Kaushan Script" }}>
                        <h3>Category</h3>
                      </Form.Label>
                      <Container
                        fluid
                        className="d-flex flex-row justify-content-between"
                        style={{ padding: "0" }}
                      >
                        <Form.Control
                          as="select"
                          style={{
                            marginBottom: "20px",
                            width: "79%",
                            background: "rgba(255,255,255, 0.5)",
                            border: "none",
                            borderRadius: "10px",
                            marginBottom: "20px",
                            boxShadow:
                              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                            height: "45px",
                          }}
                          value={category}
                          onChange={(e) => {
                            setCategory(e.target.value);
                          }}
                          aria-label="Select Category..."
                        >
                          {categories?.map((e, key) => {
                            return (
                              <option value={key} key={key}>
                                {e.title}
                              </option>
                            );
                          })}
                        </Form.Control>
                        <Button
                          style={{
                            width: "19%",
                            height: "45px",
                            borderWidth: "2px",
                          }}
                          variant="outline-dark"
                          onClick={() => setShowCategoryModal(true)}
                        >
                          <b>Add</b>
                        </Button>
                      </Container>
                    </Form.Group>
                  </Form>
                </Container>
                <Container fluid style={{ width: "39%" }}>
                  <Form>
                    <Form.Group>
                      <Form.Label style={{ fontFamily: "Kaushan Script" }}>
                        <h3>Main Image</h3>
                      </Form.Label>
                      {mainImage && !showAssets ? (
                        <div className=" d-flex align-items-center">
                          <img
                            src={urlFor(mainImage)}
                            width="100%"
                            style={{
                              boxShadow:
                                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                              borderRadius: "10px",
                              marginBottom: "20px",
                            }}
                          />
                        </div>
                      ) : (
                        <></>
                      )}

                      <Container
                        fluid
                        style={{ marginBottom: "20px" }}
                        className="d-flex p-0  flex-row justify-content-between"
                      >
                        <Button
                          variant="outline-dark"
                          onClick={() => setShowAssets(!showAssets)}
                          style={{ width: "49%", borderWidth: "2px" }}
                        >
                          <b> Select</b>{" "}
                        </Button>
                        <Button
                          variant="outline-dark"
                          onClick={() => setUploadModalShow(true)}
                          style={{ width: "49%", borderWidth: "2px" }}
                        >
                          <b>Upload</b>
                        </Button>
                      </Container>

                      {showAssets ? (
                        <div
                          className="p-1 d-flex justify-content-center"
                          style={{
                            marginBottom: "10px",
                            borderRadius: "10px",
                            background: "rgba(255,255,255, 0.5)",
                            boxShadow:
                              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                          }}
                        >
                          <Row
                            className="d-flex justify-content-start p-1"
                            style={{ width: "100%" }}
                          >
                            {assets?.map((img, key) => {
                              return (
                                <Col
                                  key={key}
                                  style={{ padding: "5px" }}
                                  className="d-flex align-items-center justify-content-center"
                                  md={6}
                                  lg={4}
                                  xl={3}
                                >
                                  <Button
                                    onClick={() => {
                                      handler(img);
                                    }}
                                    style={{
                                      borderWidth: "0px",
                                      border: "none",
                                      padding: "0px",
                                      background: "transparent",
                                      width: "100px",
                                    }}
                                  >
                                    <Assets url={img} />
                                  </Button>
                                </Col>
                              );
                            })}
                          </Row>
                        </div>
                      ) : (
                        <></>
                      )}
                    </Form.Group>
                  </Form>
                </Container>
              </Container>
            )}
            <Container fluid>
              <Form>
                <Form.Group>
                  <Form.Label style={{ fontFamily: "Kaushan Script" }}>
                    <h3>Blog Body</h3>
                  </Form.Label>
                  <div
                    style={{
                      width: "100%",
                      height: "500px",
                    }}
                  >
                    <div
                      ref={quillRef}
                      style={{
                        background: "rgba(255,255,255, 0.5)",
                        boxShadow:
                          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                      }}
                    />
                  </div>

                  <div style={{ height: "130px" }} />
                </Form.Group>
              </Form>
            </Container>
          </div>
        </Container>
        <Container
          fluid
          style={{ width: "100%" }}
          className="p-2 d-flex flex-column justify-content-end fixed-bottom"
        >
          {showOptions && (
            <div
              className="d-flex justify-content-center"
              style={{
                alignSelf: "end",
                marginRight: "30px",
                marginBottom: "10px",
                width: "90px",
              }}
            >
              <Stack direction="vertical" gap={2}>
                {post[0].isPublished ? (
                  <>
                    <Button
                      variant="outline-dark"
                      style={{
                        borderWidth: "2px",
                        background: "rgba(255,255,255,0.3)",
                      }}
                      onClick={() => {
                        unpublish();
                        setShowOptions(false);
                      }}
                    >
                      <b> Unpublish </b>
                    </Button>
                  </>
                ) : (
                  <>
                    {" "}
                    <Button
                      variant="dark"
                      style={{
                        background: "rgba(255,255,255,0.3)",
                        borderRadius: "10px",

                        borderWidth: "2px",
                        width: "100%",
                        color: "#000",
                      }}
                      onClick={() => {
                        save();
                        setShowOptions(false);
                      }}
                    >
                      <b>Save</b>
                    </Button>
                    <div
                      style={{
                        background: "rgba(255,255,255,0.3)",
                        borderRadius: "10px",
                      }}
                    >
                      <Button
                        variant="outline-dark"
                        style={{
                          borderWidth: "2px",
                          width: "100%",
                        }}
                        onClick={() => {
                          setShowScheduleModal(true);
                          setShowOptions(false);
                        }}
                      >
                        <b> Scehdule </b>
                      </Button>
                    </div>
                  </>
                )}
                <div
                  style={{
                    background: "rgba(255,255,255,0.3)",
                    borderRadius: "10px",
                  }}
                >
                  <Button
                    variant="outline-dark"
                    style={{
                      borderWidth: "2px",
                      width: "100%",
                    }}
                    onClick={() => setDeletePost(true)}
                  >
                    <b>Delete </b>
                  </Button>
                </div>{" "}
              </Stack>
            </div>
          )}
          <Container fluid className="d-flex flex-row justify-content-end">
            <div style={{ marginRight: "10px", marginBottom: "10px" }}>
              {post[0].isPublished ? (
                <Button
                  variant="dark"
                  style={{
                    margin: "0px 5px 0px 5px",
                    borderRadius: "10px",
                    height: "40px",
                  }}
                  onClick={save}
                >
                  Save
                </Button>
              ) : (
                <Button
                  variant="dark"
                  style={{
                    margin: "0px 5px 0px 5px",
                    borderRadius: "10px",
                    height: "40px",
                  }}
                  onClick={publish}
                >
                  Publish
                </Button>
              )}

              <Button
                variant="danger"
                style={{
                  margin: "0px 5px 0px 5px",
                  borderRadius: "10px",
                  height: "40px",
                }}
                onClick={() => router("/posts")}
              >
                Cancel
              </Button>
              <Button
                variant="dark"
                style={{
                  margin: "0px 5px 0px 5px",
                  borderRadius: "10px",
                  height: "40px",
                }}
                onClick={() => setShowOptions(!showOptions)}
              >
                <div className="d-flex align-items-center">
                  <BsMenuDown />
                </div>
              </Button>
            </div>
          </Container>
        </Container>
      </div>
    );
  }
  return <Authenticate />;
}

export const getServerSideProps = async ({ params: { slug } }) => {
  const postQuery = "*[_id==$slug]";
  const params = { slug: slug };
  const post = await client.fetch(postQuery, params);

  const categoriesQuery = '*[_type=="category"]';
  const categories = await client.fetch(categoriesQuery);

  const assetsQuery = '*[_type=="sanity.imageAsset"]';
  const assets = await client.fetch(assetsQuery);

  const commentsQuery = '*[_type=="comment"]';
  const comments = await client.fetch(commentsQuery);
  return {
    props: {
      categories,
      assets,
      post,
      comments,
    },
  };
};
