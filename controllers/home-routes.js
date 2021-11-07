const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

router.get('/:id', (req, res) => {
    Post.findOne({
        where: { id: req.params.id },
        attributes: ['id', 'post_title', 'post_text', 'user_id', 'createdAt'],
        include: [
            {
                model: Comment,
                attributes: ['id',
                    'comment_text',
                    'user_id',
                    'createdAt'
                ],
                include: [
                    {
                        model: User,
                        attributes: ['username']
                    }
                ]
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(post => {
            post = post.get({ plain: true })
            post.single = true;
            if (post.user_id === req.session.user_id) {
                post.current_user = true
            }
            post.comments = post.comments.map(comment => {
                if (comment.user_id === req.session.user_id) {
                    comment.current_user = true;
                }
                return comment;
            })
            res.render('single-post', { post, loggedIn: req.session.loggedIn, username: req.session.username, user_id: req.session.user_id, commentObj: { user_id: req.session.user_id, post_id: req.params.id} });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/', (req, res) => {
    Post.findAll({
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
        .then(dbResponse => {
            const posts = dbResponse.map(post => post.get({ plain: true }))
                .map(post => {
                    if (req.session.user_id === post.user_id) {
                        post.current_user = true;
                        post.comments.map(comment => {
                            if (req.session.user_id === comment.user_id) {
                                comment.current_user = true;
                            }
                            return comment;
                        });
                    }
                    return post;
                });
            res.render('homepage', { posts, loggedIn: req.session.loggedIn, username: req.session.username });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;