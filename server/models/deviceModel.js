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
    
    static async createDeviceModel(values) {
        const deviceModel = new DeviceModel(values);
        if (this.brandId) await deviceModel.setBrandName();

        return deviceModel;
    }
}

module.exports = DeviceModel;
