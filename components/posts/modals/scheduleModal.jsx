import { Button, Modal, Stack } from "react-bootstrap";
import { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
export default function ScheduleModal(props) {
  const [startDate, setStartDate] = useState(new Date());
  const handler = () => {
    props.onHide();
    props.pub(startDate);
  };
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <h4>Schedule post publish to...</h4>
        <div>
          <DatePicker
            selected={startDate}
            dateFormat="yyyy/MM/dd"
            onChange={(date) => setStartDate(date)}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Stack direction="horizontal" gap={3}>
          <Button variant="dark" onClick={handler}>
            Schedule
          </Button>
          <Button onClick={props.onHide} variant="outline-dark">
            Close
          </Button>
        </Stack>
      </Modal.Footer>
    </Modal>
  );
}
