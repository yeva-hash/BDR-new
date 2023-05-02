import { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { createBrand } from "../../http/deviceApi";

const CreateBrand = ({ show, showToast, onHide }) => {
  const [value, setValue] = useState("");

  const addBrand = () => {
    createBrand({ name: value }).then((data) => {
      setValue("");
      onHide();
      showToast();
    });
  };
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add new brand
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            placeholder={"Enter the name of the brand"}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="w-25"
          variant={"outline-dark"}
          onClick={() => addBrand()}
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

export default CreateBrand;
