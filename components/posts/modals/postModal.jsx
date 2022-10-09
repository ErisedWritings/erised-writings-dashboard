import { Form, Button, Modal } from "react-bootstrap";
import { useState } from "react";
import { useRouter } from "next/router";
import { client } from "../../../client";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
export default function PostModal(props) {
  const router = useRouter();
  const [blogTitle, setBlogTitle] = useState("");

  const createError = () => {
    toast("Post create failed due to some error.");
  };
  const handleclose = () => {
    setBlogTitle("");
    props.onHide();
  };
  const handleSubmit = async () => {
    const doc = {
      _type: "post",
      title: blogTitle,
      isPublished: false,
      isFeatured: "false",
      category: {
        _type: "reference",
        _ref: "gG84kGwBecGHwo0HJCW14S",
      },
    };
    client
      .create(doc)
      .then((res) => {
        router.push("/posts/" + res._id);
      })
      .catch((err) => {
        if (err) {
          createError();
          console.log(err);
        }
      });
    setBlogTitle("");
  };

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
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
      <Modal.Body>
        <h2>Create New Post!</h2>
        <Form>
          <Form.Group controlId="blog">
            <Form.Control
              type="text"
              value={blogTitle}
              onChange={(e) => setBlogTitle(e.target.value)}
              placeholder="Blog Title"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" type="submit" onClick={handleSubmit}>
          Create
        </Button>
        <Button variant="outline-dark" onClick={handleclose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
