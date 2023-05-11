const uuid = require('uuid');
const path = require('path');
const {Device, DeviceInfo} = require('../models/models');
const DeviceModel = require('../models/deviceModel');
const DeviceListModel = require('../models/deviceListModel');
const ApiError = require('../error/ApiError');

class DeviceController {
    async create(req, res, next) {
        try {
            let {name, price, description, brandId, typeId, info} = req.body;
            const {img} = req.files;
            let fileName = uuid.v4() + ".jpg";
            img.mv(path.resolve(__dirname, '..', 'static', fileName));

            const device = await Device.create({name, price, description, brandId, typeId, img: fileName});

            if (info) {
                info = JSON.parse(info);
                info.forEach(element => {
                    DeviceInfo.create({
                        title: element.title,
                        description: element.description,
                        deviceId: device.id
                    })
                });
            }

            return res.json(device);   
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }

    async getAll(req, res, next) {
        try {
            let devices = [];

            let {brandId, typeId, limit, page} = req.query;

            brandId = Number(brandId);
            typeId = Number(typeId);
            limit = Number(limit > 0) ? limit : 5;

            let offset = page * limit - limit;
    
            if (!brandId && !typeId) {
                devices = await Device.findAndCountAll({limit, offset});
            } else if (brandId && !typeId) {
                devices = await Device.findAndCountAll({where: {brandId}, limit, offset});
            } else if (!brandId && typeId) {
                devices = await Device.findAndCountAll({where: {typeId}, limit, offset});
            } else {
                devices = await Device.findAndCountAll({where: {brandId, typeId}, limit, offset});
            }
    
            const deviceListModel = new DeviceListModel(devices.count);

            for (const device of devices.rows) {
                const deviceModel = await DeviceModel.createDeviceModel(device.dataValues, 'device');
                deviceListModel.setDevice(deviceModel);
            }
            
            return res.json(deviceListModel);

        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }

    async getOne(req, res) {
        const {id} = req.params;
        const device = await Device.findOne(
            {
                where: {id},
                include: [{model: DeviceInfo, as: 'info'}]
            }
        )

        const deviceModel = await DeviceModel.createDeviceModel(device.dataValues, 'device');
        return res.json(deviceModel);
    }
}

module.exports = new DeviceController();