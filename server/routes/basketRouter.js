const Router = require('express');
const router = new Router();
const BasketController = require('../controllers/basketController');
const AuthMiddleware = require('../middleware/AuthMiddleware');

// router.post('/', AuthMiddleware.CheckRole('ADMIN'), BrandController.create);
router.post('/', BasketController.addToCart);
router.post('/quantity', BasketController.changeQuantity);
router.post('/placeOrder', BasketController.placeOrder);
router.get('/', BasketController.getBasketDevices);

module.exports = router;