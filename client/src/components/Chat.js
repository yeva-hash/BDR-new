import { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import SocketClient from "../http/socket/index";
import { Context } from "..";

const Chat = () => {
  const {user} = useContext(Context);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    if (user.isAdmin) {
      SocketClient.emitEvent('initGetRooms');
      SocketClient.onEvent('getRooms', (socketRooms) => {
        setRooms(socketRooms);
      })
    }
  },[])
  return (
      <Container>
        <Row>
          <Col className="border-end border-2" md={3} >
            {rooms.map(room => 
              <Row
                key={room.id}
              >
                {room.id}
              </Row>  
            )}
          </Col>
          <Col md={9}>
            chat
          </Col>
        </Row>
      </Container>
  );
};

export default Chat;
