import { useContext, useEffect, useState } from "react";
import { Col, Dropdown, Form, Row } from "react-bootstrap";
import { Context } from "../..";
import Button from "react-bootstrap/Button";

import Modal from "react-bootstrap/Modal";
import { createDevice, getBrands, getTypes } from "../../http/deviceApi";
import { observer } from "mobx-react-lite";

const CreateDevice = observer(({ show, showToast, onHide }) => {
  const { device } = useContext(Context);

  useEffect(() => {
    getTypes().then((data) => device.setTypes(data));
    getBrands().then((data) => device.setBrands(data));
  }, [device]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [info, setInfo] = useState([]);

  const addInfo = () => {
    setInfo([...info, { title: "", description: "", number: Math.random() * 100 }]);
  };
  const removeInfo = (number) => {
    setInfo(info.filter((i) => i.number !== number));
  };

  const changeInfo = (key, value, number) => {
    setInfo(
      info.map((i) => (i.number === number ? { ...i, [key]: value } : i))
    );
  };

  const selectFile = (e) => {
    setFile(e.target.files[0]);
  };

  const addDevice = () => {
    const formData = new FormData();
    formData.append("name", name)
    formData.append("price", price.toString())
    formData.append("img", file)
    formData.append("description", description)
    formData.append("brandId", device.selectedBrand.id)
    formData.append("typeId", device.selectedType.id)
    formData.append("info", JSON.stringify(info))
    createDevice(formData).then((data) => {
      onHide();
      showToast();
    })
  };
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add new device
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <div className="d-flex justify-content-start">
            <Dropdown className="mt-3">
              <Dropdown.Toggle variant={"outline-dark"} className="me-3">
                {device.selectedType.id && device.selectedType.id !== 0 ? device.selectedType.name : "Select the type"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {device.types.map((type) => (
                  type.id !== 0 ?  
                  <Dropdown.Item
                    onClick={() => device.setSelectedType(type)}
                    key={type.id}
                  >
                    {type.name}
                  </Dropdown.Item>
                : ''
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown className="mt-3">
              <Dropdown.Toggle variant={"outline-dark"}>
                {device.selectedBrand.id && device.selectedBrand.id !== 0 ? device.selectedBrand.name : "Select the brand"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {device.brands.map((brand) => (
                  brand.id !== 0 ?  
                  <Dropdown.Item
                    onClick={() => device.setSelectedBrand(brand)}
                    key={brand.id}
                  >
                    {brand.name}
                  </Dropdown.Item>
                  : ''
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <Form.Control
            className="mt-3"
            placeholder={"Enter the name of the device"}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Form.Control
            className="mt-3"
            placeholder={"Enter the price of the device"}
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
          <Form.Control
            className="mt-3"
            placeholder={"Choose the image of the device"}
            type="file"
            onChange={selectFile}
          />
          <Form.Control
            className="mt-3"
            placeholder={"Type the description of the device"}
            as="textarea" rows={3}
            onChange={(e) => setDescription(e.target.value)}
          />
          <hr />
          <Button onClick={addInfo} variant="outline-dark">
            Add new property
          </Button>

          {info.map((i) => (
            <Row className="mt-3" key={i.number}>
              <Col md={4}>
                <Form.Control
                  value={i.title}
                  onChange={(e) =>
                    changeInfo("title", e.target.value, i.number)
                  }
                  placeholder="Enter the title of property"
                />
              </Col>
              <Col md={4}>
                <Form.Control
                  value={i.description}
                  onChange={(e) =>
                    changeInfo("description", e.target.value, i.number)
                  }
                  placeholder="Enter the description of property"
                />
              </Col>
              <Col md={4}>
                <Button
                  variant="outline-dark"
                  onClick={() => removeInfo(i.number)}
                >
                  Remove
                </Button>
              </Col>
            </Row>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button className="w-25" variant={"outline-dark"} onClick={addDevice}>
          Add
        </Button>
        <Button className="w-25" variant={"outline-dark"} onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateDevice;
