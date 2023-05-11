import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from "react-router-dom"
import { DEVICE_ROUTE } from '../utils/consts';
import { useContext, useEffect, useState } from 'react';
import { changeQuantity, getBasketDevices, placeOrder } from '../http/basketApi';
import { Context } from '..';

const BasketPage = () => {
    const {user} = useContext(Context);

    const [basketDevices, setBasketDevices] = useState([]);
    const [total, setTotal] = useState('');

    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        getBasketDevices(user.userData).then((deviceListModel) => {
            setBasketDevices(deviceListModel.devices);
            setTotal(deviceListModel.total);
        });
    }, [])

    const placeUserOrder = () => {
        placeOrder(user.userData).then(() => {
            setBasketDevices([]);
            setTotal(0);
        })
    }
    const changeItemQuantity = (bDeviceId, action) => {
        changeQuantity(user.userData, bDeviceId, action).then((deviceListModel) => {
            setBasketDevices(deviceListModel.devices);
            setTotal(deviceListModel.total);
        })
    } 
    return (
        <Container>
            { basketDevices.length > 0 ? 
            <Row className='mt-3'>
                <Col md={6}> 
                    {basketDevices.map(bDevice => 
                        <Row key={bDevice.id} className='border-bottom border-end mt-5'>
                            <Col
                                className="w-50"
                                md={6}
                                style={{
                                backgroundImage: `url(${
                                    process.env.REACT_APP_API_URL + bDevice.img
                                })`,
                                backgroundSize: "100%",
                                backgroundRepeat: "no-repeat",
                                backgroundColor: "#fcfcfc",
                                width: "100%",
                                height: 300,
                                backgroundPosition: "center"}}
                            >
                            </Col>
                            <Col className="d-flex flex-column mt-2 ms-2" md={5}>
                            <h4 className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
                                <div>{bDevice.brandName}</div>
                            </h4>
                            <h2>{bDevice.name}</h2>
                            <div className='d-flex mt-auto mb-5 justify-content-between align-items-center'>
                                <div>
                                    <Button onClick={() => {changeItemQuantity(bDevice.id, '-')}} variant={'outline-dark'} style={{ marginRight: '5px' }}>-</Button>
                                        <span style={{ marginRight: '5px' }}>{bDevice.quantity}</span>
                                    <Button onClick={() => {changeItemQuantity(bDevice.id, '+')}} variant={'outline-dark'}>+</Button>
                                </div>
                                <div>
                                    <h2>{bDevice.price}$</h2>
                                </div>
                            </div>
                            </Col>
                        </Row>
                    )}
                </Col>
                <Col className='mt-4 border-start ms-5'>
                    <h2>Enter you shipping information</h2>
                    <Form.Control
                        className="mt-3"
                        placeholder="Enter your name" 
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Enter your lastname"
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                        type='text'
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Enter your city"
                        value={city}
                        onChange={e => setCity(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Enter your address"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Enter your phone"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        type="number"
                    />
                    <div className='d-flex align-items-center justify-content-between mt-3'>
                        <h4>Total: {total}$</h4>
                        <Button
                            className='w-25'
                            onClick={placeUserOrder} 
                            variant={"outline-dark"}>
                            Place Order
                        </Button>
                    </div>
                </Col>
            </Row>
            :
            <h2 className='mt-5' style={{textAlign: 'center'}}>Your shopping cart is empty</h2>}
        </Container>
    )
}
  
export default BasketPage;