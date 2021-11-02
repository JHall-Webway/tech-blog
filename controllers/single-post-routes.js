const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'post_title',
            'post_text',
            'created_at'
        ],
        include: {
            model: User,
            attributes: ['username']
        },
        include: {
            model: Comment,
            attributes: [
                'comment_text',
                'created_at'
            ],
            include: {
                model: User,
                attributes: ['username']
            }
        }
    })
        .then(dbResponse => {
            const post = dbResponse.get({ plain: true });
            res.render('single-post', {
                post,
                loggedIn: req.session.loggedIn
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;