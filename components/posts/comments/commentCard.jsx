import { Container, Button } from "react-bootstrap";
import ReplyModal from "./replyModal";
import { useState } from "react";
import HideComment from "./hideComment";
import ShowComment from "./showComment";

export default function CommentCard({
  id,
  user,
  email,
  comment,
  reply,
  date,
  path,
  show,
  slug,
}) {
  console.log(show);
  const [modalShow, setModalShow] = useState(false);
  const [hideModal, setHideModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [stat, setStat] = useState(show);
  return (
    <Container
      fluid
      style={{
        background: "#fefefe",
        border: "none",
        borderRadius: "10px",
        boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      }}
      className="p-4"
    >
      <div style={{ fontSize: "17px" }}>
        <b>{user}</b>
        {user !== "Anonymous" && (
          <>
            {" "}
            <span style={{ marginLeft: "5px", marginRight: "5px" }}>
              &#183;
            </span>
            {email}
          </>
        )}
      </div>

      <div style={{ textAlign: "justify" }}>{comment} </div>
      <hr />
      <HideComment
        show={hideModal}
        slug={slug}
        onHide={() => setHideModal(false)}
        id={id}
      />
      <ShowComment
        slug={slug}
        show={showModal}
        onHide={() => setShowModal(false)}
        id={id}
      />
      {reply !== null && reply !== "" ? (
        <div className="p-3" style={{ textAlign: "justify" }}>
          <>
            <Button
              style={{
                width: "100%",
                background: "#fff",
                border: "none",
                color: "#000",
              }}
              className="d-flex justify-content-start"
              onClick={() => setModalShow(true)}
            >
              <b style={{ marginRight: "5px" }}>Edit Reply: </b> {reply}
            </Button>
            <ReplyModal
              path={path}
              show={modalShow}
              id={id}
              value={reply ? reply : ""}
              setShow={() => setModalShow(false)}
            />
          </>
        </div>
      ) : (
        <>
          <Button
            style={{
              width: "100%",
              background: "#fff",
              border: "none",
              color: "#000",
            }}
            className="d-flex justify-content-start"
            onClick={() => setModalShow(true)}
          >
            Reply...
          </Button>
          <ReplyModal
            path={path}
            show={modalShow}
            id={id}
            value={reply ? reply : ""}
            setShow={setModalShow}
          />
        </>
      )}
      <Container
        fluid
        style={{ width: "100%" }}
        className="d-flex flex-row  align-items-center justify-content-between"
      >
        <div>
          <b>{date}</b>
        </div>
        <div>
          {stat ? (
            <Button variant="outline-dark" onClick={() => setHideModal(true)}>
              Hide Comment
            </Button>
          ) : (
            <Button variant="outline-dark" onClick={() => setShowModal(true)}>
              Show Comment
            </Button>
          )}
        </div>
      </Container>
    </Container>
  );
}
