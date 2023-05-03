import { Col, Container, Row } from "react-bootstrap";

const Chat = () => {
  return (
      <Container>
        <Row>
          <Col className="border-end border-2" md={3} >
            users
          </Col>
          <Col md={9}>
            chat
          </Col>
        </Row>
      </Container>
  );
};

export default Chat;
