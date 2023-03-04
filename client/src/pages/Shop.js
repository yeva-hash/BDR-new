import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Context } from "..";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import Pages from "../components/Pages";
import TypeBar from "../components/TypeBar";
import { getTypes, getBrands, getDevices } from "../http/deviceApi";

const Shop = observer(() => {
    const {device} = useContext(Context); 

    useEffect(() => {// TODO check what it is
        getTypes().then(data => device.setTypes(data));
        getBrands().then(data => device.setBrands(data));
        getDevices(device.selectedType.id, device.selectedBrand.id, device.page, 2).then(data => {
            device.setDevices(data.devices);
            device.setTotalCount(data.count);
        });
    }, [device, device.page, device.selectedType, device.selectedBrand])

    return (
      <Container>
            <Row className="mt-4">
                <Col md={3}>
                    <TypeBar/>
                </Col>
                <Col md={9}>
                    <BrandBar/>
                    <DeviceList/>
                    <Pages/>
                </Col>
            </Row>
      </Container>
    );
  })
  
  export default Shop;
  