const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User } = require('../models');

router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'post_title',
            'post_text',
            'created_at'
        ],
        include: {
            model: User,
            attributes: ['username']
        }
    })
        .then(dbResponse => {
            const posts = dbResponse.map(post => post.get({ plain: true }))
            res.render('homepage', {
                posts,
                loggedIn: req.session.loggedIn
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return
    }
    res.render('login')
});

module.exports = router;