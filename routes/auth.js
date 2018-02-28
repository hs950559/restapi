const router = require('express-promise-router')();
const AuthController = require('../controllers/auth');

router.route('/signup')
    .post(AuthController.signup);
    
router.route('/login')
    .post(AuthController.login);
    
router.route('/secret')
    .get(AuthController.secret);

module.exports = router;