const router = require('express').Router();

router.use('/users', require('./User-routes'));
router.use('/posts', require('./Post-routes'));
router.use('/comments', require('./Comment-routes'));

module.exports = router;