class DeviceListModel {
    constructor(count) {
        this.count = count;
        this.devices = [];
    }

    setDevice(device) {
        this.devices.push(device);
    }
}

module.exports = DeviceListModel;