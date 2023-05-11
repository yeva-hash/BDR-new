import { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import { useNavigate, useParams } from "react-router-dom";
import { getOneDevice } from "../http/deviceApi";
import { addToCart } from "../http/basketApi";
import { Context } from "..";
import { LOGIN_ROUTE } from "../utils/consts";

function DevicePage() {
  const {user} = useContext(Context);
  const navigate = useNavigate();

  const [device, setDevice] = useState({ info: [] });
  const { id } = useParams();

  const addItemToCart = () => {
    if (!user.isAuth) {
      return navigate(LOGIN_ROUTE)
    }
    addToCart(user.userData, device);
  }
  useEffect(() => {
    getOneDevice(id).then((data) => setDevice(data));
  }, []);
  return (
    <Container className="mt-4">
      <Row>
        <Col md={3}>
          <TypeBar />
        </Col>
        <Col md={5}>
          <div
            className="border-end border-bottom"
            style={{
              backgroundImage: `url(${
                process.env.REACT_APP_API_URL + device.img
              })`,
              backgroundSize: "cover",
              backgroundColor: "#fcfcfc",
              width: "100%",
              height: 400,
              backgroundPosition: "center",
            }}
          ></div>
          <Row className="d-flex flex-column ms-3 mt-3">
            {device.info.map((info, index) => (
              <Row
                className="p-2 border-end border-top"
                key={info.id}
                style={{
                  background: index % 2 === 0 ? "#fcfcfc" : "transparent",
                }}
              >
                {info.title} : {info.description}
              </Row>
            ))}
          </Row>
        </Col>
        <Col md={4}>
          <div className="d-flex justify-content-between">
            <div>
              <h4 className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
                <div>{device.brandName}</div>
              </h4>
              <h2>{device.name}</h2>
            </div>
            <div className="fs-3">
              <p>{device.price}$</p>
            </div>
          </div>
                    
          <div>
            {device.description 
            ?
            <div>
                {device.description} 
            </div>
            : 
            <div>
                This is a test description
            </div>
            }
          </div>

          <Button   
            className="w-100 mt-3" 
            variant={"outline-dark"}
            onClick={addItemToCart}>
              ADD TO CART
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default DevicePage;
