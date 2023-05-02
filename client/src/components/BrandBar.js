import {observer} from 'mobx-react-lite';
import { useContext, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { Form } from 'react-bootstrap'
import { Context } from '..';
import { getBrands } from '../http/deviceApi';
import { setInitialValue } from '../utils/setInitialValue';

const BrandBar = observer(() => {
    const {device} = useContext(Context);

    useEffect(() => {
        getBrands().then((data) => {
            device.setBrands(data);
            setInitialValue(device, device.brands, device.setSelectedBrand);
        });
    }, [device])

    return (
        <Form className="d-flex flex-wrap">
            {device.brands.map(brand => 
                <Card
                    style={{cursor: 'pointer'}}
                    key={brand.id}
                    className="px-3 py-1 ms-3 bg-light"
                    onClick={() => device.setSelectedBrand(brand)}
                    border={brand.id === device.selectedBrand.id ? 'secondary' : 'light'}
                >
                    {brand.name}
                </Card>
            )}
        </Form>
    );
  })
  
  export default BrandBar;