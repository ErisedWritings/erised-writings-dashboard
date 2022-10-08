import { Container } from "react-bootstrap";

export default function ResponseCard({ user, email, date, response }) {
  const mail = "mailto:" + email;
  return (
    <Container
      fluid
      className="p-3"
      style={{
        borderRadius: "10px",
        marginTop: "10px",
        marginBottom: "15px",
        background: "#fefefe",
        boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      }}
    >
      <div className="d-flex align-items-center flex-row">
        <div>
          {user !== "Anonymous" ? (
            <a
              style={{
                textDecoration: "none",
                color: "#000",
              }}
              href={mail}
            >
              <div>
                <h3>{user.length > 15 ? user.slice(0, 11) + "..." : user}</h3>
              </div>
            </a>
          ) : (
            <h3>{user}</h3>
          )}
        </div>

        <h4>
          <span style={{ marginRight: "5px", marginLeft: "5px" }}>&#183;</span>
        </h4>
        <h6>
          <small>{date}</small>
        </h6>
      </div>
      <div
        className="d-flex flex-row p-3 justify-content-end"
        style={{
          background: "#eee",
          textAlign: "right",
          border: "solid",
          borderWidth: "0px 3px 0px 0px",
          width: "100%",
        }}
      >
        <div style={{ width: "30%" }}></div>
        <h1 style={{ marginRight: "10px" }}>``</h1>
        <div> {response}</div>
      </div>
    </Container>
  );
}
