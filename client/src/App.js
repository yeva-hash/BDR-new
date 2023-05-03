import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { BrowserRouter } from "react-router-dom";
import { Context } from ".";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { check } from "./http/userApi";
import { userRoleType } from "./utils/consts"

const App = observer(() => {
  const {user} = useContext(Context);
  const {socket} = useContext(Context);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    check().then(data => {
        // user.setUser(true);
        user.setIsAuth(true);
        if (data.role === userRoleType.admin) {
          user.setIsAdmin(true);
        }
    }).finally(() => setLoading(false));

    socket.init();
  },[user])

  if (loading) {
    return <Spinner animation="grow"/>
  }
  return (
    <BrowserRouter>
        <NavBar/>
        <AppRouter />
    </BrowserRouter>
  );
})

export default App;
