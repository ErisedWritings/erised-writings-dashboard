import Link from "next/link";
import { Container } from "react-bootstrap";
import { urlFor } from "../../client";

export default function PostSmallCard({
  image,
  title,
  description,
  category,
  categoryColor,
  isPub,
  date,
  pubColor,
}) {
  return (
    <Container
      className="d-flex flex-column justify-content-start"
      fluid
      style={{
        width: "250px",
        height: "500px",
        border: "none",
        padding: "0px",
        background: "#fefefe",
        borderRadius: "10px",
      }}
    >
      <div>
        <img
          src={image}
          width="250px"
          style={{ borderTopRightRadius: "10px", borderTopLeftRadius: "10px" }}
        />
      </div>
      <Container fluid className="p-3 d-flex justify-content-between">
        <div className="d-flex flex-column">
          <div className="d-flex flex-row justify-content-between mt-auto">
            <div className="d-flex flex-row" style={{ marginBottom: "10px" }}>
              <div
                className="d-flex justfiy-content-center align-items-center"
                style={{
                  background: categoryColor,
                  borderRadius: "10px",
                  marginRight: "10px",
                  marginLeftt: "10px",
                }}
              >
                <h6 style={{ margin: "3px 8px 3px 8px" }}>{category}</h6>
              </div>
              <div
                style={{
                  background: pubColor,
                  borderRadius: "10px",
                  marginRight: "10px",
                  marginLeftt: "10px",
                }}
              >
                <h6 style={{ margin: "3px 8px 3px 8px" }}>
                  {isPub ? "Published" : "Unpublished"}
                </h6>
              </div>
            </div>
          </div>
          <div>
            <div>
              <h3>{title}</h3>
            </div>
            <div>
              <p>{description}</p>
            </div>
          </div>{" "}
        </div>
      </Container>
      <div className="p-3 mt-auto d-flex justify-content-end">
        <small>{date}</small>
      </div>
    </Container>
  );
}
