import { Card, Col } from 'react-bootstrap';
import { useNavigate } from "react-router-dom"
import { DEVICE_ROUTE } from '../utils/consts';

const DeviceItem = ({device}) => {
    const navigate = useNavigate();
    return (
        <Col className="mt-4" md={4} onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)}>
            <Card style={{width: 250, cursor: 'pointer'}} border={'light'}>
                <div style={{backgroundImage: `url(${process.env.REACT_APP_API_URL + device.img})`, 
                     backgroundSize: 'cover',
                     backgroundColor: '#fcfcfc', 
                     width: '100%', 
                     height: 180,
                     backgroundPosition: 'center'}}>
                </div>
                <div className='text-black-50 mt-1 d-flex justify-content-between align-items-center'>
                    <div>{device.brandName}</div>
                </div>
                <div>{device.name}</div>
            </Card>
        </Col>   
    );
  }
  
  export default DeviceItem;