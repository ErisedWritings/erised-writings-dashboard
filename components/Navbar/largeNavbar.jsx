import { Button, Container } from "react-bootstrap";
import { HiUserCircle } from "react-icons/hi";
import PostModal from "../posts/modals/postModal";
import { signOut } from "next-auth/react";
import { MdOutlineDashboard, MdPostAdd } from "react-icons/md";
import { BsFileRichtext, BsChatSquareQuote } from "react-icons/bs";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";

export default function LargeNavbar() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  return (
    <Container
      fluid
      className="p-0 d-flex flex-column justify-content-between"
      style={{ height: "100vh", width: "200px", background: "#fff" }}
    >
      <PostModal show={showModal} onHide={() => setShowModal(false)} />
      <div className="d-flex justify-cotent-center flex-column">
        <div
          style={{
            alignSelf: "center",
            marginTop: "10px",
          }}
          className="p-1 d-flex flex-row justify-content-center align-items-center"
        >
          <div style={{ marginRight: "7px" }}>
            <Button
              style={{
                background: "transparent",
                color: "#000",
                border: "none",
              }}
              onClick={() => signOut()}
            >
              <h1>
                {" "}
                <HiUserCircle />
              </h1>
            </Button>
          </div>
          <div
            style={{ fontSize: "14px" }}
            className="d-flex flex-column align-items-center"
          >
            <div className="p-0">
              <b style={{ padding: "0px" }}>Erised Writings</b>
            </div>
            <div className="p-0">
              <small>Content Manager</small>
            </div>
          </div>
        </div>
        <div className="d-flex flex-column" style={{ marginTop: "10px" }}>
          <Link href="/">
            <div
              className="d-flex flex-row align-items-center"
              style={{ margin: "8px 0px 8px 0px" }}
            >
              {router.pathname.includes("/") && router.pathname.length === 1 ? (
                <>
                  <div
                    style={{
                      width: "5px",
                      height: "30px",
                      borderTopRightRadius: "30px",
                      borderBottomRightRadius: "30px",
                      background: "#734F96",
                    }}
                  />{" "}
                  <div
                    style={{
                      width: "180px",
                      marginLeft: "40px",
                    }}
                    className="d-flex flex-row justify-content-start"
                  >
                    <div style={{ marginRight: "8px" }}>
                      <h5>
                        <MdOutlineDashboard />
                      </h5>
                    </div>
                    <div style={{ alignSelf: "center" }}>
                      <h6>Dashboard</h6>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div
                    style={{
                      width: "5px",
                      height: "30px",
                      borderTopRightRadius: "30px",
                      borderBottomRightRadius: "30px",
                      background: "transparent",
                    }}
                  />{" "}
                  <div
                    style={{
                      width: "180px",
                      marginLeft: "40px",
                      color: "#555",
                    }}
                    className="d-flex justify-content-start"
                  >
                    <div style={{ marginRight: "8px" }}>
                      <h5>
                        <MdOutlineDashboard />
                      </h5>
                    </div>
                    <div style={{ alignSelf: "center" }}>
                      <h6>Dashboard</h6>
                    </div>
                  </div>
                </>
              )}
            </div>
          </Link>
          <Link href="/posts">
            <div
              className="d-flex flex-row align-items-center"
              style={{ margin: "8px 0px 8px 0px" }}
            >
              {router.pathname.includes("/posts") ? (
                <>
                  <div
                    style={{
                      width: "5px",
                      height: "30px",
                      borderTopRightRadius: "30px",
                      borderBottomRightRadius: "30px",
                      background: "#734F96",
                    }}
                  />{" "}
                  <div
                    style={{
                      width: "180px",
                      marginLeft: "40px",
                    }}
                    className="d-flex justify-content-start"
                  >
                    <div style={{ marginRight: "8px" }}>
                      <h5>
                        <BsFileRichtext />
                      </h5>
                    </div>
                    <div style={{ alignSelf: "center" }}>
                      <h6>Posts</h6>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div
                    style={{
                      width: "5px",
                      height: "30px",
                      borderTopRightRadius: "30px",
                      borderBottomRightRadius: "30px",
                      background: "transparent",
                    }}
                  />{" "}
                  <div
                    style={{
                      width: "180px",
                      marginLeft: "40px",
                      color: "#555",
                    }}
                    className="d-flex justify-content-start"
                  >
                    <div style={{ marginRight: "8px" }}>
                      <h5>
                        <BsFileRichtext />
                      </h5>
                    </div>
                    <div style={{ alignSelf: "center" }}>
                      <h6>Posts</h6>
                    </div>
                  </div>
                </>
              )}
            </div>
          </Link>
          <Link href="/responses">
            <div
              className="d-flex flex-row align-items-start"
              style={{ margin: "8px 0px 8px 0px" }}
            >
              {router.pathname.includes("/responses") ? (
                <>
                  <div
                    style={{
                      width: "5px",
                      height: "30px",
                      borderTopRightRadius: "30px",
                      borderBottomRightRadius: "30px",
                      background: "#734F96",
                    }}
                  />{" "}
                  <div
                    style={{
                      width: "180px",
                      marginLeft: "40px",
                    }}
                    className="d-flex justify-content-start"
                  >
                    <div style={{ marginRight: "8px" }}>
                      <h5>
                        <BsChatSquareQuote />
                      </h5>
                    </div>
                    <div style={{ alignSelf: "center" }}>
                      <h6>Responses</h6>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div
                    style={{
                      width: "5px",
                      height: "30px",
                      borderTopRightRadius: "30px",
                      borderBottomRightRadius: "30px",
                      background: "transparent",
                    }}
                  />{" "}
                  <div
                    style={{
                      width: "180px",
                      marginLeft: "40px",
                      color: "#555",
                    }}
                    className="d-flex justify-content-start"
                  >
                    <div style={{ marginRight: "8px" }}>
                      <h5>
                        <BsChatSquareQuote />
                      </h5>
                    </div>
                    <div style={{ alignSelf: "center" }}>
                      <h6>Responses</h6>
                    </div>
                  </div>
                </>
              )}
            </div>
          </Link>
        </div>
      </div>
      <div className="d-flex justify-content-center p-2">
        <div
          className="p-2 d-flex flex-column justify-content-center align-items-center"
          style={{
            width: "140px",
            height: "140px",
            marginBottom: "30px",
            borderRadius: "20px",
            border: "dashed",
            background: "rgba(220, 208, 255,0.6)",
            borderWidth: "2px",
            borderColor: "#333",
            fontFamily: "Allura",
          }}
        >
          <Button
            style={{
              width: "130px",
              height: "130px",
              background: "transparent",
              border: "none",
              color: "#000",
            }}
            onClick={() => setShowModal(true)}
          >
            <h2 style={{ marginBottom: "0px" }}>
              <MdPostAdd />
            </h2>
            <h4 style={{ textAlign: "center" }}>
              Express yourself to the world!
            </h4>
          </Button>
        </div>
      </div>
    </Container>
  );
}
