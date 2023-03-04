import {observer} from 'mobx-react-lite';
import { useContext } from 'react';
import { Row } from 'react-bootstrap';
import { Context } from '..';
import DeviceItem from './DeviceItem';

const DeviceList = observer(() => {
    const {device} = useContext(Context);
    return (
        <Row className='d-flex ms-2'>
            {device.devices.map(device => 
                <DeviceItem
                    key={device.id}
                    device={device}
                />
            )}
        </Row>
    );
  })
  
  export default DeviceList;