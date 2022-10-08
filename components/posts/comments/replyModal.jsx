import Router from "next/router";
import { useState } from "react";
import { Modal, Button, Form, Stack } from "react-bootstrap";
import { client } from "../../../client";

export default function ReplyModal(props) {
  const [value, setValue] = useState(props.value);
  const handler = () => {
    client
      .patch(props.id)
      .set({ reply: value })
      .commit()
      .then(() => {
        Router.reload(props.path);
        props.setShow();
        setValue("");
      });
  };
  const removeHandler = () => {
    client
      .patch(props.id)
      .unset(["reply"])
      .commit()
      .then(() => {
        Router.reload(props.path);
        props.setShow();
        setValue("");
      });
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>
              <h5>Reply</h5>
            </Form.Label>
            <Form.Control
              as="textarea"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Stack direction="horizontal" gap={2}>
          <Button variant="dark" onClick={handler}>
            Submit
          </Button>
          <Button variant="danger" onClick={removeHandler}>
            Remove
          </Button>
          <Button
            variant="outline-dark"
            onClick={() => {
              props.setShow(false);
              setValue("");
            }}
          >
            Cancel
          </Button>
        </Stack>
      </Modal.Footer>
    </Modal>
  );
}
