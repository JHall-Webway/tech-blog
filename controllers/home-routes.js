const router = require('express').Router();
require('../config/connection');
const { Post, User, Comment } = require('../models');

router.get('/', (req, res) => {
    Post.findAll({
        attributes: ['id', 'post_title', 'post_text', 'created_at'],
        include: {
            model: User,
            attributes: ['username']
        }
    })
        .then(dbResponse => {
            const posts = dbResponse.map(post => post.get({ plain: true }));
            res.render('homepage', { posts, loggedIn: req.session.loggedIn});
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/posts/:id', (req, res) => {
    Post.findOne({
        where: { id: req.params.id },
        attributes: ['id', 'post_title', 'post_text', 'created_at'],
        include: {
            model: User,
            attributes: ['username']
        }
    })
        .then(dbResponse => {
            if (!dbResponse) {
                res.status(404).json({ message: 'Page not found!'});
                return;
            }
            const post = dbResponse.get({ plain: true });
            res.render('single-post', { post, loggedIn: req.session.loggedIn });
        })
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return
    }
    res.render('login')
});

module.exports = router;