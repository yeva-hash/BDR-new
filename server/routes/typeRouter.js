const Router = require('express');
const router = new Router();
const TypeController = require('../controllers/typeController');
const AuthMiddleware = require('../middleware/AuthMiddleware');

router.post('/', AuthMiddleware.CheckRole('ADMIN'), TypeController.create);
router.get('/', TypeController.getAll);

module.exports = router;