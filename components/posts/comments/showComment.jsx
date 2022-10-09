import { Stack } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { client } from "../../../client";
import Router from "next/router";

export default function ShowComment(props) {
  const handler = () => {
    client
      .patch(props.id)
      .set({ show: true })
      .commit()
      .then(() => {
        props.onHide();
        Router.reload("/posts/" + props.slug);
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
  };
  const closeHandler = () => {
    props.onHide();
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h4>Show Comment</h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>The comment will be made visible to readers on the blog website.</p>
      </Modal.Body>
      <Modal.Footer>
        <Stack direction="horizontal" gap={3}></Stack>
        <Button onClick={handler} variant="dark">
          Confirm
        </Button>
        <Button onClick={closeHandler} variant="outline-dark">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
