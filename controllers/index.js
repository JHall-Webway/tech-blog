const router = require('express').Router();

router.use('/api', require('./api'));

router.get('/login', (req, res) => res.render('login'));

router.get('/register', (req, res) => res.render('register'));

router.get('/dashboard', (req, res) => res.render('dashboard'));

router.get('/post/:id', (req, res) => res.render('/single-post'));

router.get('/', (req, res) => res.render('homepage'));

module.exports = router;