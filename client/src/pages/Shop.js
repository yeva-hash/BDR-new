import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Context } from "..";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import Pages from "../components/Pages";
import TypeBar from "../components/TypeBar";
import { getTypes, getBrands, getDevices } from "../http/deviceApi";
import { getLimit } from "../http/preferencesApi";

const Shop = observer(() => {
    const {device} = useContext(Context);

    useEffect(() => {
        async function fetchData() {
            if (device.limit === 0) await getLimit().then(data => device.setLimit(data));
            if (!device.types) getTypes().then(data => device.setTypes(data));
            if (!device.brands) getBrands().then(data => device.setBrands(data));

            getDevices(device.selectedType.id, device.selectedBrand.id, device.page, device.limit).then(data => {
                device.setDevices(data.devices);
                device.setTotalCount(data.count);
            });
        }
        fetchData();
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
  