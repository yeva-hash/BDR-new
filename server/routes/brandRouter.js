const Router = require('express');
const router = new Router();
const BrandController = require('../controllers/brandController');
const AuthMiddleware = require('../middleware/AuthMiddleware');

router.post('/', AuthMiddleware.CheckRole('ADMIN'), BrandController.create);
router.get('/', BrandController.getAll);

module.exports = router;