import { Container } from "react-bootstrap";
import { HiUserCircle } from "react-icons/hi";
import { MdOutlineDashboard, MdPostAdd } from "react-icons/md";
import { BsFileRichtext, BsChatSquareQuote } from "react-icons/bs";
import { useRouter } from "next/router";
import Link from "next/link";
import PostModal from "../posts/modals/postModal";
import { useState } from "react";
import Button from "react-bootstrap/Button";

export default function Navbar() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  return (
    <Container
      fluid
      className="p-0 d-flex flex-column justify-content-between"
      style={{ height: "100vh", width: "45px", background: "#fff" }}
    >
      <PostModal show={showModal} onHide={() => setShowModal(false)} />
      <div className="d-flex justify-cotent-center flex-column">
        <div
          style={{
            width: "40px",
            height: "40px",
            alignSelf: "center",
            marginTop: "10px",
          }}
          className="p-1 d-flex justify-content-center align-items-center"
        >
          <h2>
            {" "}
            <HiUserCircle />
          </h2>
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
                      width: "4px",
                      height: "30px",
                      borderTopRightRadius: "5px",
                      borderBottomRightRadius: "5px",
                      background: "#d0ccfb",
                    }}
                  />{" "}
                  <div
                    style={{ width: "35px" }}
                    className="d-flex justify-content-center"
                  >
                    <h5>
                      <MdOutlineDashboard />
                    </h5>
                  </div>
                </>
              ) : (
                <>
                  <div
                    style={{
                      width: "4px",
                      height: "30px",
                      borderTopRightRadius: "5px",
                      borderBottomRightRadius: "5px",
                      background: "transparent",
                    }}
                  />{" "}
                  <div
                    style={{ width: "35px", color: "#555" }}
                    className="d-flex justify-content-center"
                  >
                    <h5>
                      <MdOutlineDashboard />
                    </h5>
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
                      width: "4px",
                      height: "30px",
                      borderTopRightRadius: "5px",
                      borderBottomRightRadius: "5px",
                      background: "#d0ccfb",
                    }}
                  />{" "}
                  <div
                    style={{ width: "35px" }}
                    className="d-flex justify-content-center"
                  >
                    <h5>
                      <BsFileRichtext />
                    </h5>
                  </div>
                </>
              ) : (
                <>
                  <div
                    style={{
                      width: "4px",
                      height: "30px",
                      borderTopRightRadius: "5px",
                      borderBottomRightRadius: "5px",
                      background: "transparent",
                    }}
                  />{" "}
                  <div
                    style={{ width: "35px", color: "#555" }}
                    className="d-flex justify-content-center"
                  >
                    <h5>
                      <BsFileRichtext />
                    </h5>
                  </div>
                </>
              )}
            </div>
          </Link>
          <Link href="/responses">
            <div
              className="d-flex flex-row align-items-center"
              style={{ margin: "8px 0px 8px 0px" }}
            >
              {router.pathname.includes("/responses") ? (
                <>
                  <div
                    style={{
                      width: "4px",
                      height: "30px",
                      borderTopRightRadius: "5px",
                      borderBottomRightRadius: "5px",
                      background: "#d0ccfb",
                    }}
                  />{" "}
                  <div
                    style={{ width: "35px" }}
                    className="d-flex justify-content-center"
                  >
                    <h5>
                      <BsChatSquareQuote />
                    </h5>
                  </div>
                </>
              ) : (
                <>
                  <div
                    style={{
                      width: "4px",
                      height: "30px",
                      borderTopRightRadius: "5px",
                      borderBottomRightRadius: "5px",
                      background: "transparent",
                    }}
                  />{" "}
                  <div
                    style={{ width: "35px", color: "#555" }}
                    className="d-flex justify-content-center"
                  >
                    <h5>
                      <BsChatSquareQuote />
                    </h5>
                  </div>
                </>
              )}
            </div>
          </Link>
        </div>
      </div>
      <div className="d-flex justify-content-center p-2">
        <Button
          style={{
            background: "transparent",
            border: "none",
            color: "#000",
          }}
          onClick={() => setShowModal(true)}
        >
          <h3 style={{ marginBottom: "0px" }}>
            <MdPostAdd />
          </h3>
        </Button>
      </div>
    </Container>
  );
}
