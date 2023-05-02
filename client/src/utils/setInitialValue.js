export const setInitialValue = (device, list, setValue) => {
    const initialValue = list.find((elem) => {
        return elem.id === 0;
    })
    setValue.call(device, initialValue);
}