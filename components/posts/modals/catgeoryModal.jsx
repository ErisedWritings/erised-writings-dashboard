import Router from "next/router";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { SketchPicker } from "react-color";
import { client } from "../../../client";

export default function CategoryModal(props) {
  const [category, setCategory] = useState("");
  const [color, setColor] = useState("#ffffff");
  const handler = () => {
    const doc = {
      _type: "category",
      title: category,
      color: color,
    };

    client.create(doc).then((res) => {
      setCategory("");
      setColor("");
      // props.save();
      Router.reload(props.path);
      props.onHide();
    });
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
          Add Category
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>
              <h5>Category</h5>
            </Form.Label>
            <Form.Control
              value={category}
              style={{ marginBottom: "10px" }}
              onChange={(e) => setCategory(e.target.value)}
            />{" "}
            <Form.Label>
              <h5>Pick Color</h5>
              <SketchPicker
                color={color}
                onChangeComplete={(e) => {
                  setColor(e.hex);
                }}
              />
            </Form.Label>
          </Form.Group>
        </Form>
        <div
          style={{ width: "100%" }}
          className="d-flex flex-row justify-content-end"
        >
          <Button variant="outline-dark" onClick={handler}>
            Add Category
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
