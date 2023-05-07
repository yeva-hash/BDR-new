import { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Form, ListGroup, Row } from "react-bootstrap";
import SocketClient from "../http/socket/index";
import { Context } from "..";
import { SocketMessage, SocketRoom } from "../http/socket/components/rooms";

const Chat = ({clientRoom}) => {
  const {user} = useContext(Context);

  const [rooms, setRooms] = useState(clientRoom);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([])

  SocketClient.onEvent('receiveMessage', (messageData) => {
    setMessages(messageData);
  })

  const sendMessage = () => {
    setMessage('');

    const room = user.isAdmin ? SocketRoom.selectedRoom : clientRoom[0];
    const messageObject = new SocketMessage(message);

    SocketClient.emitEvent('sendMessage', {
      room: room,
      message: messageObject
    });
  }

  const showRoomContent = (room) => {
    SocketRoom.setSelectedRoom(room);
    SocketClient.emitEvent('getMessages', room);
  }

  useEffect(() => {
    messages.sort(SocketMessage.sortMessages);
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
        {user.isAdmin ?
          <Col className="border-end border-2" md={3} >
              <ListGroup variant="flush">
                  {rooms.map(room => 
                      <ListGroup.Item
                          className="border-bottom"
                          action variant="light"
                          style={{cursor: 'pointer'}} 
                          active={room.id === SocketRoom.selectedRoom.id}
                          onClick={()=>{showRoomContent(room)}}
                          key={room.id}
                      >
                          {room.id}
                      </ListGroup.Item>
                  )}
              </ListGroup>
          </Col> 
        : ''}
        {/* {!user.isAdmin || Object.keys(SocketRoom.selectedRoom).length > 0 ?  */}
          <Col md={9}>
          {!user.isAdmin || Object.keys(SocketRoom.selectedRoom).length > 0 ? 
          <Container style={{ height: '500px' }} className="d-flex flex-column" >
            {messages.map(m => 
              <Form.Control
                className="mt-3"
                variant={"outline-dark"}
                value={m.message}
                key={m.createdAt}
              />
            )}
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
          </Container>
            : <Row className="ms-2">Please select the room</Row>}
          </Col>
        </Row>
      </Container>
  );
};

export default Chat;
