const Router = require('express');
const router = new Router();
const DeviceController = require('../controllers/deviceController');
const AuthMiddleware = require('../middleware/AuthMiddleware');

router.post('/', AuthMiddleware.CheckRole('ADMIN'), DeviceController.create);
router.get('/', DeviceController.getAll);
router.get('/:id', DeviceController.getOne);

module.exports = router;