import {$authHost, $host} from './index';

export const changeLimit = async(newLimit) => {
    const {data} = await $authHost.post('api/preferences/changelimit', newLimit)
    return data;
}

export const getLimit = async() => {
    const {data} = await $host.get('api/preferences/getlimit');
    return data;
} 