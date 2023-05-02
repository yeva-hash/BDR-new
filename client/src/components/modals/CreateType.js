import { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { createType } from "../../http/deviceApi";

const CreateType = ({ show, showToast, onHide }) => {
  const [value, setValue] = useState("");
  const addType = () => {
    createType({ name: value }).then((data) => {
      setValue("");
      onHide();
      showToast();
    });
  };
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add new type
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={"Enter the name of the type"}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="w-25"
          variant={"outline-dark"}
          onClick={() => addType()}
        >
          Add
        </Button>
        <Button className="w-25" variant={"outline-dark"} onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateType;
