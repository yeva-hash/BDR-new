import { useContext, useState } from "react";
import { Context } from "..";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE, BASKET_ROUTE } from "../utils/consts";
import OpenChat from "../components/modals/OpenChat";
import {observer} from 'mobx-react-lite';
import { useNavigate } from "react-router-dom"
import AppState from "./AppState";
import { Badge } from "react-bootstrap";
import BasketPage from "../pages/BasketPage";

const NavBar = observer(() => {
    const [chatVisible, setChatVisible] = useState(false);

    const {user} = useContext(Context);
    const navigate = useNavigate();

    const logOut = () => {
        user.setUser({});
        user.setIsAuth(false);
        user.setIsAdmin(false);
        localStorage.setItem('token', '');
        navigate(SHOP_ROUTE);
    }
    return (
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href={SHOP_ROUTE}>SoftComp</Navbar.Brand>
          {user.isAdmin ?
            <Button variant={"outline-light"} onClick={() => {navigate(ADMIN_ROUTE)}} className="ms-2">Admin Panel</Button>
            :
             <Button variant={"outline-light"} onClick={() => setChatVisible(true)}>Chat</Button>
          }
          {user.isAuth ? 
          
            <Nav className="ml-auto" style={{color: 'white'}}>
                <Button variant={"outline-light"} onClick={() => navigate(BASKET_ROUTE)}>Basket</Button>        
                <Button variant={"outline-light"} onClick={() => logOut()} className="ms-2">Log Out</Button>
            </Nav>
            :
            <Nav className="ml-auto" style={{color: 'white'}}>
                <Button variant={"outline-light"} onClick={() => {navigate(LOGIN_ROUTE)}}>Authorization</Button>
            </Nav>
            }
            <OpenChat show={chatVisible} onHide={() => setChatVisible(false)} />
        </Container>
      </Navbar>
    );
  })

export default NavBar;