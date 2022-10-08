import { Container } from "react-bootstrap";

export default function PostCard({
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
      fluid
      style={{
        width: "100%",
        height: "200px",
        border: "none",
        borderRadius: "10px",
        background: "#fefefe",
        fontFamily: "Nunito",
        boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      }}
      className="p-2 d-flex flex-row"
    >
      <Container
        fluid
        style={{ width: "350px", alignSelf: "center", alignItems: "center" }}
      >
        <img src={image} width="300px" style={{ borderRadius: "10px" }} />
      </Container>
      <Container fluid className="p-1 d-flex flex-column align-items-between">
        <div>
          <div>
            <h3>{title}</h3>
          </div>
          <div>
            <p>{description}</p>
          </div>
        </div>{" "}
        <div className="d-flex flex-row justify-content-between mt-auto">
          <div className="d-flex flex-row">
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
          <div>
            <small>{date}</small>
          </div>
        </div>
      </Container>
    </Container>
  );
}
