export const setInitialValue = (device, list, setValue) => {
    const initialValue = list.find((elem) => {
        return elem.id === 0;
    })
    if (initialValue) {
        setValue.call(device, initialValue);
    }
}