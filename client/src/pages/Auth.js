import { observer } from 'mobx-react-lite';
import { useContext, useState } from 'react';
import {Container, Form, Card, Button, Row} from 'react-bootstrap'
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Context } from '..';
import { login, registration } from '../http/userApi';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE, userRoleType } from '../utils/consts';

const Auth = observer(() => {
    const {user} = useContext(Context);
    const location = useLocation();
    const navigate = useNavigate();
    const isLogin = location.pathname === LOGIN_ROUTE ? true : false;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const userAuth = async() => {
        try {
            let userData = isLogin ? await login(email, password) : await registration(email, password, userRoleType.user);
            user.setUser(userData);
            user.setIsAuth(true);

            if (userData.role === userRoleType.admin) user.setIsAdmin(true);

            navigate(SHOP_ROUTE);
        } catch (error) {
            alert(error.response.data.message);
        }
    }
    return (
      <Container 
        className="d-flex justify-content-center align-items-center"
        style={{height: window.innerHeight - 54}}>
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto"> {isLogin ? 'Authorization' : 'Registration'}</h2>
                <Row className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Enter the email..." 
                        value={email.value}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Enter the password..."
                        value={password.value}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                    <Form className="d-flex justify-content-between mt-3">
                        {isLogin ? 
                        <div>
                            Don't have an account? <NavLink to={REGISTRATION_ROUTE}> Register! </NavLink>
                        </div>
                        :
                        <div>
                            Have an account? <NavLink to={LOGIN_ROUTE}> Log In! </NavLink>
                        </div>
                        }
                        <Button
                            onClick={userAuth} 
                            variant={"outline-dark"}>
                            {isLogin ? 'Log In' : 'Register'} 
                        </Button>
                    </Form>
                </Row>
           </Card>
      </Container>
    );
  })
  
  export default Auth;
  