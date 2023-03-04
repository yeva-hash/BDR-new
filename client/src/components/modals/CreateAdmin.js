import { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { adminRegistartion } from "../../http/userApi";

const CreateAdmin = ({ show, onHide }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const addAdmin = async () => {
    adminRegistartion(email, password, 'ADMIN').then((data) => {
      setEmail("");
      setPassword("");
      onHide();
    });
  };
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add new admin
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            className="mb-2"
            placeholder={"Enter new admin email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Control
            placeholder={"Enter new admin password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="w-25"
          variant={"outline-dark"}
          onClick={() => addAdmin()}
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

export default CreateAdmin;
