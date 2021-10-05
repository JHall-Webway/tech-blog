const router = require('express').Router();

router.use('/api', require('./api'));
router.get('/', (req, res) => {
    res.render('login')
});

module.exports = router;