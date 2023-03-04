import {observer} from 'mobx-react-lite';
import { useContext, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Context } from '..';
import { getTypes } from '../http/deviceApi';
import { SHOP_ROUTE } from '../utils/consts';

const TypeBar = observer(() => {
    const {device} = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        getTypes().then(data => device.setTypes(data));// TODO
    }, [device])

    const showShopPage = (type) => {
        device.setSelectedType(type)
        navigate(SHOP_ROUTE);
    }

    return (
        <ListGroup variant="flush">
            {device.types.map(type => 
                <ListGroup.Item
                    action variant="light"
                    style={{cursor: 'pointer'}} 
                    active={type.id === device.selectedType.id}
                    onClick={() => showShopPage(type)}
                    key={type.id}
                >
                    {type.name}
                </ListGroup.Item>
            )}
        </ListGroup>
    );
  })
  
  export default TypeBar;