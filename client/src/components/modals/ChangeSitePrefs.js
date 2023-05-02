import { useContext, useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Context } from "../..";
import { changeLimit, getLimit } from "../../http/preferencesApi";

const ChangeSitePrefs = ({ show, showToast, onHide }) => {
  const {device} = useContext(Context);

  const [value, setValue] = useState("");
  const [currentLimit, setCurrentLimit] = useState('');

  useEffect(() => {//TODO refactor?
    async function fetchData() {
        if (device.limit === 0) {
            await getLimit().then(data => device.setLimit(data));
        }
        setCurrentLimit(device.limit);
    }
    fetchData();
  }, [device.limit])

  const changeProductLimit = () => {
    changeLimit({ newLimit: value }).then((data) => {
      device.setLimit(data)
      setValue("");
      showToast();
    });
  };
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Change Site Prefs
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
            <div>
                <Row>
                    <Col md={2}>
                        Current value:
                    </Col>
                    <Col md={2}>
                        {currentLimit}
                    </Col>
                </Row>
                <Row className="mt-3 d-flex align-items-baseline">
                    <Col md={2}>
                        <Form.Label>Product limit:</Form.Label>
                    </Col>
                    <Col md={6}>
                        <Form.Control
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            type="number"
                            placeholder={"Enter new limit"}
                        />
                    </Col>
                    <Col md={4}>
                        <Button
                        variant="outline-dark"
                        onClick={() => changeProductLimit()}
                        >
                        Change
                        </Button>
                    </Col>
                </Row>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button className="w-25" variant={"outline-dark"} onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChangeSitePrefs;
