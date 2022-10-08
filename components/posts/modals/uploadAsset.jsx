import { Button, Modal } from "react-bootstrap";
import { client } from "../../../client";
import { ToastContainer, toast } from "react-toastify";

import { useState } from "react";
import { Form } from "react-bootstrap";
import Router from "next/router";

export default function UploadAsset(props) {
  const [imagesAssets, setImagesAssets] = useState(null);
  const [upload, setUpload] = useState(false);
  const [wrongTypeofImage, setWrongTypeofImage] = useState(false);
  const [field, setField] = useState();

  const uploadErrorToast = () => {
    toast("Upload failed due to some error!");
  };

  const uploadImage = (e) => {
    if (e.target.files[0] != null) {
      const selectedImage = e.target.files[0];

      //to input an image to the upload field
      if (
        selectedImage.type === "image/png" ||
        selectedImage.type === "image/svg" ||
        selectedImage.type === "image/jpeg" ||
        selectedImage.type === "image/gif" ||
        selectedImage.type === "image/tiff"
      ) {
        setWrongTypeofImage(false);
        setUpload(true);

        client.assets
          .upload("image", selectedImage, {
            contentType: selectedImage.type,
            filename: selectedImage.name,
          })
          .then((document) => {
            setImagesAssets(document);
            setUpload(false);
          })
          .catch((error) => {
            uploadErrorToast();
          });
      } else {
        setWrongTypeofImage(true);
        setUpload(false);
      }
    } else {
      setUpload(false);
      setWrongTypeofImage(false);
    }
  };

  const saveImage = () => {
    if (imagesAssets?._id) {
      const doc = {
        _type: "photo",
        image: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: imagesAssets?._id,
          },
        },
      };
      client.create(doc).then(() => {});
    } else {
      setField(true);

      setTimeout(() => {
        setField(false);
      }, 2000);
    }
    props.save();
    Router.reload(props.path);
    props.onHide;
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
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

      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Upload Asset
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <Form>
            <Form.Group>
              <Form.Control
                style={{ marginBottom: "10px" }}
                type="file"
                onChange={(e) => uploadImage(e)}
              />
            </Form.Group>
            {wrongTypeofImage ? <h6>Invalid File Type!</h6> : <></>}
          </Form>
          <div
            style={{ width: "100%" }}
            className="d-flex flex-row justify-content-end"
          >
            <Button
              disabled={!upload}
              onClick={saveImage}
              variant="outline-dark"
            >
              Upload
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
