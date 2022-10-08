import { urlFor } from "../../client";

export default function Asset({ url }) {
  return (
    <div
      className="m-0 p- 0 d-flex align-items-center justify-content-center"
      style={{ width: "100px" }}
    >
      <img src={urlFor(url)} width="90px" />
    </div>
  );
}
