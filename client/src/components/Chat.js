import { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import SocketClient from "../http/socket/index";
import { Context } from "..";

const Chat = ({clientRoom}) => {
  const {user} = useContext(Context);
  const [rooms, setRooms] = useState(clientRoom);
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    //roomid id get active
      SocketClient.emitEvent('sendMessage', {
        message: message,
        room: clientRoom[0]
      });
  }

  useEffect(() => {
    if (user.isAdmin) {
      SocketClient.emitEvent('initGetRooms');
      SocketClient.onEvent('getRooms', (socketRooms) => {
        setRooms(socketRooms);
      })
    }
  },[user])
  return (
      <Container>
        <Row>
          {/* {user.isAdmin ? */}
            <Col className="border-end border-2" md={3} >
              {rooms.map(room => 
                <Row className="border-bottom"
                  key={room.id}
                >
                  {room.id}
                </Row>  
              )}
            </Col> 
            {/* : ''} */}
          <Col className="d-flex flex-column" style={{ height: '500px' }} md={9}>
            <Form className="mt-auto d-flex">
              <Form.Control
                className="me-1"
                variant={"outline-dark"}
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Enter your message here..."
              />
              <Button
                  onClick={sendMessage}
                  variant={"outline-dark"}>
                    Send
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
  );
};

export default Chat;
