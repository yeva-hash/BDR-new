import {$authHost, $host} from './index';

export const addToCart = async(user, device) => {
    const {data} = await $host.post('api/basket', {user, device})
    return data;
}


export const getBasketDevices = async(user) => {
    const {data} = await $host.get('api/basket', {params: {user}})
    return data;
} 

export const changeQuantity = async(user, bDeviceId, action) => {
    const {data} = await $host.post('api/basket/quantity', {user, bDeviceId, action})
    return data;
}

export const placeOrder = async(user) => {
    const {data} = await $host.post('api/basket/placeOrder', {user})
    return data;
}