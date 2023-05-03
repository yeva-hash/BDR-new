import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Chat from "../Chat";
import { useContext, useState } from "react";
import { Context } from "../..";

const OpenChat = ({ show, onHide }) => {
  const {user} = useContext(Context);
  const {SocketClient} = useContext(Context);
  const [showChat, setShowChat] = useState(user.isAdmin ? true : false);

  const createRoom = () => {
    setShowChat(true);

    const {userData} = user;
    const roomId = Object.keys(userData) > 0 ? userData.email : `anonymous ${new Date().getTime()}`

    SocketClient.socket.emit('createRoom', roomId);
  }

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
          <Button onClick={createRoom} >Connect with support</Button>
        }
    </Modal.Body>
    <Modal.Footer>
      <Button className="w-25" variant={"outline-dark"} onClick={onHide}>Close</Button>
    </Modal.Footer>
  </Modal>
  );
};

export default OpenChat;
