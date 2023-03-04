const { Brand } = require("./models");

class DeviceModel {
    constructor({id, name, img, price, description, brandId, typeId, info}) {
        this.id = id;
        this.name = name;
        this.img = img;
        this.price = price;
        this.description = description || null;//TODO
        this.brandId = brandId;
        this.typeId = typeId;
        this.info = info;
    }

    async setBrandName() {
        try {
            const brand = await Brand.findOne(
                { where: {id: this.brandId} }
            );

            this.brandName = brand.name;
        } catch (error) {
            var a = null;//TODO
        }
    }
    
    static async createDeviceModel(values) {
        const deviceModel = new DeviceModel(values);
        await deviceModel.setBrandName();

        return deviceModel;
    }
}

module.exports = DeviceModel;
