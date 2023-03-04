import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import CreateAdmin from "../components/modals/CreateAdmin";
import CreateBrand from "../components/modals/CreateBrand";
import CreateDevice from "../components/modals/CreateDevice";
import CreateType from "../components/modals/CreateType";

const Admin = observer(() => {
  const [brandVisible, setBrandVisible] = useState(false);
  const [typeVisible, setTypeVisible] = useState(false);
  const [deviceVisible, setDeviceVisible] = useState(false);
  const [adminVisible, setAdminVisible] = useState(false);
  
  return (
    <Container className="d-flex flex-column">
      <Button
        onClick={() => setTypeVisible(true)}
        variant={"outline-dark"}
        className="mt-4 p-2"
      >
        Add a type
      </Button>
      <Button
        onClick={() => setBrandVisible(true)}
        variant={"outline-dark"}
        className="mt-4 p-2"
      >
        Add a brand
      </Button>
      <Button
        onClick={() => setDeviceVisible(true)}
        variant={"outline-dark"}
        className="mt-4 p-2"
      >
        Add a device
      </Button>

      <Button
        onClick={() => setAdminVisible(true)}
        variant={"outline-dark"}
        className="mt-4 p-2"
      >
        Add new admin
      </Button>

      <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
      <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
      <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)} />
      <CreateAdmin show={adminVisible} onHide={() => setAdminVisible(false)} />

    </Container>
  );
})

export default Admin;
