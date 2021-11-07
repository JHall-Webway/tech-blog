const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const sequelize = require('../config/connection');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
    Post.findAll({
        where: { user_id: req.session.user_id },
        attributes: ['id', 'post_title', 'post_text', 'user_id', 'createdAt', [sequelize.literal('(SELECT COUNT(*) FROM comment WHERE post.id = comment.post_id)'), 'comment_count']],
        include: [
            {
                model: Comment,
                attributes: ['id',
                    'comment_text',
                    'user_id'
                ]
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbResponse => dbResponse.map(post => post.get({ plain: true })))
        .then(posts => {
            Comment.findAll({
                where: { user_id: req.session.user_id },
                attributes: ['id', 'comment_text']
            })
                .then(res => res.map(comment => comment.get({ plain: true })))
                .then(comments => res.render('dashboard', { posts, comments, loggedIn: req.session.loggedIn, username: req.session.username, id: req.session.user_id }))
                .catch(err => res.status(500).json(err));
        });
});

module.exports = router