import { Container, Button } from "react-bootstrap";
import { BsPencilSquare } from "react-icons/bs";
import { AiOutlineComment } from "react-icons/ai";
import Link from "next/link";

export default function Navs({ slug }) {
  return (
    <Container
      fluid
      style={{ width: "100%", height: "70px", background: "#292b2c" }}
      className="p-3 d-flex flex-row justify-content-center"
    >
      <Link href={"/posts/" + slug}>
        <Button variant="outline-primary" style={{ margin: "0px 5px 0px 5px" }}>
          <BsPencilSquare />
        </Button>
      </Link>
      <Link href={"/posts/" + slug + "/comments"}>
        <Button variant="outline-primary" style={{ margin: "0px 5px 0px 5px" }}>
          <AiOutlineComment />
        </Button>
      </Link>
    </Container>
  );
}
