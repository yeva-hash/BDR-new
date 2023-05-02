const Router = require('express');
const router = new Router();
const UserController = require('../controllers/userController');
const AuthMiddleware = require('../middleware/AuthMiddleware');

router.post('/adminregistartion', AuthMiddleware.CheckRole('ADMIN'), UserController.adminRegistartion);
router.post('/registration', UserController.registration);
router.post('/login', UserController.login);
router.get('/auth', AuthMiddleware.CheckAuth, UserController.checkAuth);

module.exports = router;