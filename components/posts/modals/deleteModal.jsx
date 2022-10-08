import { Stack } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function DeleteModal(props) {
  const handler = () => {
    props.delete();
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
          Delete Post
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          The post and the related comments will be deleted and can't be
          retreived.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Stack direction="vertical" gap={3}>
          <Button variant="danger" onClick={handler}>
            Confirm
          </Button>
          <Button variant="outline-dark" onClick={props.onHide}>
            Close
          </Button>
        </Stack>
      </Modal.Footer>
    </Modal>
  );
}
