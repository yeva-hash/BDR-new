const Router = require('express');
const router = new Router();
const PreferencesController = require('../controllers/preferencesController');
const AuthMiddleware = require('../middleware/AuthMiddleware');

router.post('/changelimit', AuthMiddleware.CheckRole('ADMIN'), PreferencesController.changeLimit);
router.get('/getlimit', PreferencesController.getLimit);

module.exports = router;