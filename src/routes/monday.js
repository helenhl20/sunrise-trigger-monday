const router = require('express').Router();
const { authenticationMiddleware } = require('../middlewares/authentication');
const mondayController = require('../controllers/monday-controller');

router.post('/monday/subscribe', authenticationMiddleware, mondayController.subscribe);
router.post('/monday/unsubscribe', authenticationMiddleware, mondayController.unsubscribe);

module.exports = router;
