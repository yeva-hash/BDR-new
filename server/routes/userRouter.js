const Router = require('express');
const router = new Router();
const UserController = require('../controllers/userController');
const AuthMiddleware = require('../middleware/AuthMiddleware');
const CheckRole = require('../middleware/CheckRoleMiddleware');

router.post('/adminRegistartion', CheckRole('ADMIN'), UserController.adminRegistartion);
router.post('/registration', UserController.registration);
router.post('/login', UserController.login);
router.get('/auth', AuthMiddleware, UserController.checkAuth);

module.exports = router;