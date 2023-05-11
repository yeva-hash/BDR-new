const { Brand } = require("./models");

class DeviceModel {
    constructor({id, name, img, price, description, brandId, typeId, info}) {
        this.id = id;
        this.name = name;
        this.img = img;
        this.price = price;
        this.description = description;
        this.brandId = brandId;
        this.typeId = typeId;
        this.info = info;
    }

    async setBrandName() {
        const brand = await Brand.findOne(
            { where: {id: this.brandId} }
        );

        this.brandName = brand.name;
    }
    
    static async createDeviceModel(values, type) {
        const deviceModel = type === 'device' ? new DeviceModel(values) : new BasketDeviceModel(values);
        if (deviceModel.brandId) await deviceModel.setBrandName();

        return deviceModel;
    }
}

class BasketDeviceModel extends DeviceModel {
    constructor({id, name, img, price, brandId}) {
        super({id, name, img, price, brandId});
        this.quantity = 1;
    }
}

module.exports = DeviceModel, BasketDeviceModel;
