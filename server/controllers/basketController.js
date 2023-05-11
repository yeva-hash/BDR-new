const uuid = require('uuid');
const path = require('path');
const {Device, DeviceInfo, Basket, BasketDevice} = require('../models/models');
// const BasketDevice = require('../models/models');
const DeviceListModel = require('../models/deviceListModel');
const ApiError = require('../error/ApiError');
const DeviceModel = require('../models/deviceModel');

class BasketController {
    constructor() {
        this.getBasketDevices = this.getBasketDevices.bind(this);
        this.addToCart = this.addToCart.bind(this);
        this.changeQuantity = this.changeQuantity.bind(this);
        this.getBasketDeviceList = this.getBasketDeviceList.bind(this);
        this.placeOrder = this.placeOrder.bind(this);
    }

    async getBasketDeviceList(user) {
        const basket = await this.getBasket(user);
        const basketDevices = await BasketDevice.findAndCountAll({where: {basketId: basket.id}});
        const deviceListModel = new DeviceListModel(basketDevices.count);

        for (const basketDevice of basketDevices.rows) {
            const device = await Device.findOne({where: {id: basketDevice.deviceId}})

            const deviceInBasket = deviceListModel.devices.find((d) => {
                return d.id === basketDevice.deviceId;
            })

            if (deviceInBasket) {
                deviceInBasket.quantity++;
            } else {
                const deviceModel = await DeviceModel.createDeviceModel(device.dataValues, 'basketDevice');
                deviceListModel.setDevice(deviceModel);
            }
        }
        deviceListModel.setTotal();

        return deviceListModel;
    }
    
    async getBasket(user) {
        return Basket.findOne({where: { userId: user.id}})
    }
    async addToCart(req, res, next) {
        try {
            const { user, device } = req.body;
            const basket = await this.getBasket(user);
            const basketDevice = await BasketDevice.create({
                basketId: basket.id, 
                deviceId: device.id
            });
            return res.json(basketDevice);
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }

    async getBasketDevices(req, res, next) {
        try {
            const { user } = req.query;
            return res.json(await this.getBasketDeviceList(user));
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }

    async changeQuantity(req, res, next) {
        try {
            const {user, bDeviceId, action } = req.body;
            const basket = await this.getBasket(user);
            
            if (action === '-' ) {
                const basketDevice = await BasketDevice.findOne({where: {deviceId: bDeviceId}});
                await BasketDevice.destroy({where: {id: basketDevice.id}})
            } else {
                await BasketDevice.create({
                    basketId: basket.id, 
                    deviceId: bDeviceId
                });
            }

            return res.json(await this.getBasketDeviceList(user));
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }

    async placeOrder(req, res, next) {
        try {
            const {user} = req.body;
            const basket = await this.getBasket(user);
            await BasketDevice.destroy({where: {basketId: basket.id}})
            return res.json(true);
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }
}

module.exports = new BasketController();