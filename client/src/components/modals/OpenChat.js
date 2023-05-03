import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Chat from "../Chat";
import { useContext, useState } from "react";
import { Context } from "../..";

const OpenChat = ({ show, onHide }) => {
  const {user} = useContext(Context);
  const [showChat, setShowChat] = useState(user.isAdmin ? true : false);
  // const [password, setPassword] = useState("");

  // const addAdmin = async () => {
  //   adminRegistartion(email, password, 'ADMIN').then((data) => {
  //     setEmail("");
  //     setPassword("");
  //     onHide();
  //   });
  // };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered aria-labelledby="contained-modal-title-vcenter">
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
        Chat
      </Modal.Title>
    </Modal.Header>
    <Modal.Body className="show-grid">
          {showChat ?
            <Chat />
          :
          <Button onClick={() => setShowChat(true)} >Connect with support</Button>
        }
    </Modal.Body>
    <Modal.Footer>
      <Button className="w-25" variant={"outline-dark"} onClick={onHide}>Close</Button>
    </Modal.Footer>
  </Modal>
  );
};

export default OpenChat;
