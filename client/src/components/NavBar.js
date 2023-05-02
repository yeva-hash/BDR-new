import { useContext } from "react";
import { Context } from "..";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from "../utils/consts";
import {observer} from 'mobx-react-lite';
import { useNavigate } from "react-router-dom"

const NavBar = observer(() => {
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
          {user.isAuth ? 
            <Nav className="ml-auto" style={{color: 'white'}}>
                {user.isAdmin ? <Button variant={"outline-light"} onClick={() => navigate(ADMIN_ROUTE)}>Admin Panel</Button> : ''}
                <Button variant={"outline-light"} onClick={() => logOut()} className="ms-2">Log Out</Button>
            </Nav>
            :
            <Nav className="ml-auto" style={{color: 'white'}}>
                <Button variant={"outline-light"} onClick={() => {navigate(LOGIN_ROUTE)}}>Authorization</Button>
            </Nav>
            }
        </Container>
      </Navbar>
    );
  })

export default NavBar;