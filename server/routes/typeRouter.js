const Router = require('express');
const router = new Router();
const TypeController = require('../controllers/typeController');
const CheckRole = require('../middleware/CheckRoleMiddleware');

router.post('/', CheckRole('ADMIN'), TypeController.create);
router.get('/', TypeController.getAll);

module.exports = router;