const router = require('express').Router();

router.use('/api', require('./api'));
router.use('/dashboard', require('./dashboard-routes'));
router.use('/', require('./home-routes'));

module.exports = router;