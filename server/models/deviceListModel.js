class DeviceListModel {
    constructor(count) {
        this.count = count;
        this.devices = [];
        this.total = 0;
    }

    setDevice(device) {
        this.devices.push(device);
    }

    setTotal() {
        this.devices.forEach((d) => {
            this.total += (d.price * d.quantity);
        })
        var a = null;
    }
}

module.exports = DeviceListModel;