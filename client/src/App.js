import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { BrowserRouter } from "react-router-dom";
import { Context } from ".";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { check } from "./http/userApi";
import { userRoleType } from "./utils/consts"
import { Beforeunload } from 'react-beforeunload'; // импортируем компонент

const App = observer(() => {
  const { user } = useContext(Context);
  const { SocketClient } = useContext(Context);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    SocketClient.init();

    check().then(data => {
      user.setUser(data);
      user.setIsAuth(true);
      if (data.role === userRoleType.admin) {
        user.setIsAdmin(true);
        SocketClient.emitEvent('adminJoin');
      }
    }).finally(() => setLoading(false));

    return () => {
      SocketClient.disconnect();
    };
  }, [user, SocketClient])

  return (
    <Beforeunload onBeforeunload={(event) => {
      if (event.target.activeElement.href) return;

      const socketRoom = localStorage.getItem("chatRoom") ? JSON.parse(localStorage.getItem("chatRoom")) : [];
      if (socketRoom.length > 0) {
        SocketClient.emitEvent('user-disconnected', socketRoom[0]);
        localStorage.setItem("chatRoom", JSON.stringify([]));
      }

    }}>
      <BrowserRouter>
        <NavBar />
        {loading ?
          <Spinner animation="grow" /> :
          <AppRouter />
        }
      </BrowserRouter>
    </Beforeunload>
  );
})

export default App;