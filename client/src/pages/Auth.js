import { observer } from 'mobx-react-lite';
import { useContext, useState } from 'react';
import {Container, Form, Card, Button, Row} from 'react-bootstrap'
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Context } from '..';
import { login, registration } from '../http/userApi';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { useInput } from '../utils/clientValidation';
import { vProperties } from '../resources/fieldsValidationResources';

const Auth = observer(() => {
    const {user} = useContext(Context);
    const location = useLocation();
    const navigate = useNavigate();
    const isLogin = location.pathname === LOGIN_ROUTE ? true : false;
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');

    const email = useInput('', {email: vProperties.email});
    const password = useInput('', {password: vProperties.password});
    
    const userAuth = async() => {//TODO REFACTOR
        try {
            let userData = isLogin ? await login(email, password) : await registration(email, password, 'USER');
            if (userData.role === 'ADMIN') user.setIsAdmin(true);
            user.setUser(userData);
            user.setIsAuth(true);
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
                        // onChange={e => setEmail(e.target.value)}
                        onChange={e => email.onChange(e)}
                        onBlur={e => email.onBlur(e)}
                    />
                    {/* {(email.isDirty && email.isEmpty) && <div>{process.fieldsValidation.hello}</div>}
                    {(email.isDirty && email.minLengthError) && <div>Min length should be more than 3 symbols</div>} */}
                    <Form.Control
                        className="mt-3"
                        placeholder="Enter the password..."
                        value={password.value}
                        // onChange={e => setPassword(e.target.value)}
                        onChange={e => password.onChange(e)}
                        onBlur={e => password.onBlur(e)}
                        type="password"
                    />
                    {/* {(password.isDirty && password.isEmpty) && <div>This field is required</div>}
                    {(password.isDirty && password.minLengthError) && <div>Min length should be more than 3 symbols</div>} */}
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
  