import { observer } from "mobx-react-lite";
import {useState } from "react";
import { Button, Container  } from "react-bootstrap";
import CreateAdmin from "../components/modals/CreateAdmin";
import CreateBrand from "../components/modals/CreateBrand";
import CreateDevice from "../components/modals/CreateDevice";
import CreateType from "../components/modals/CreateType";
import ChangeSitePrefs from "../components/modals/ChangeSitePrefs";
import OpenChat from "../components/modals/OpenChat";
import Toasts from "../components/Toasts";

const Admin = observer(() => {
  const [brandVisible, setBrandVisible] = useState(false);
  const [typeVisible, setTypeVisible] = useState(false);
  const [deviceVisible, setDeviceVisible] = useState(false);
  const [adminVisible, setAdminVisible] = useState(false);
  const [prefsVisible, setPrefsVisible] = useState(false);
  const [chatVisible, setChatVisible] = useState(false);

  const [toastVisible, setToastVisible] = useState(false);

  return (
    <Container className="d-flex flex-column">
      <Button
        onClick={() => setChatVisible(true)}
        variant={"outline-dark"}
        className="mt-4 p-2"
      >
        Chat
      </Button>

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

      <Button
        onClick={() => setPrefsVisible(true)}
        variant={"outline-dark"}
        className="mt-4 p-2"
      >
        Change site preferences
      </Button>

      <CreateBrand show={brandVisible} showToast={() => setToastVisible(true)} onHide={() => setBrandVisible(false)} />
      <CreateType show={typeVisible} showToast={() => setToastVisible(true)} onHide={() => setTypeVisible(false)} />
      <CreateDevice show={deviceVisible} showToast={() => setToastVisible(true)} onHide={() => setDeviceVisible(false)} />
      <CreateAdmin show={adminVisible} showToast={() => setToastVisible(true)}  onHide={() => setAdminVisible(false)} />
      <ChangeSitePrefs show={prefsVisible} showToast={() => setToastVisible(true)}  onHide={() => setPrefsVisible(false)} />
      <OpenChat show={chatVisible} onHide={() => setChatVisible(false)} />

      <Toasts show={toastVisible} onHide={() => setToastVisible(false)} />
    </Container>
  );
})

export default Admin;
