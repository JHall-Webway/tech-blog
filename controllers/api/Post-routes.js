const router = require('express').Router();
const { Post, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, ({ body }, res) => {
    Post.create(body)
        .then(dbResponse => res.json(dbResponse))
        .catch(data => {
            let errorResponse = { message: 'POST request error', data }
            console.log(errorResponse);
            res.status(500).json(errorResponse);
        });
});

router.get('/', (req, res) => {
    Post.findAll({
        attributes:['id', 'post_title', 'post_text', 'user_id', [sequelize.literal('(SELECT COUNT(*) FROM comment WHERE post.id = comment.post_id)'), 'comment_count']],
        include: {
            model: Comment,
            attributes: ['id',
                'comment_text',
                'user_id'
            ]
        }
    })
        .then(dbResponse => {
            if (!dbResponse.length) {
                res.status(404).json({ message: 'No posts found' });
                return;
            }
            res.json(dbResponse);
        })
        .catch(data => {
            let errorResponse = { message: 'GET request error', data }
            console.log(errorResponse);
            res.status(500).json(errorResponse);
        });
});

router.get('/:id', ({ params }, res) => {
    Post.findOne({
        where: { id: params.id },
        attributes:['id', 'post_title', 'post_text', 'user_id', [sequelize.literal('(SELECT COUNT(*) FROM comment WHERE post.id = comment.post_id)'), 'comment_count']],
        include: {
            model: Comment,
            attributes: ['id',
                'comment_text',
                'user_id'
            ]
        }
    })
        .then(dbResponse => {
            if (!dbResponse) {
                res.status(404).json({ message: 'post not found' });
                return;
            }
            res.json(dbResponse)
        })
        .catch(data => {
            let errorResponse = { message: 'GET request error', data }
            console.log(errorResponse);
            res.status(500).json(errorResponse);
        });
});

router.put('/:id', withAuth, (req, res) => {
    Post.update(req.body, { where: { id: req.params.id } })
        .then(dbResponse => {
            if (!dbResponse) {
                res.status(404).json({ message: 'post not found' });
                return;
            }
            res.json({ message: 'Post updated', sqlres: dbResponse })
        })
        .catch(data => {
            let errorResponse = { message: 'PUT request error', data }
            console.log(errorResponse);
            res.status(500).json(errorResponse);
        });
});

router.delete('/:id', withAuth, ({ params }, res) => {
    Post.destroy({ where: { id: params.id } })
        .then(dbResponse => {
            if (!dbResponse) {
                res.status(404).json({ message: 'post not found' });
                return;
            }
            res.json({ message: 'Post deleted', sqlres: dbResponse })
        })
        .catch(data => {
            let errorResponse = { message: 'DELETE request error', data }
            console.log(errorResponse);
            res.status(500).json(errorResponse);
        });
});

router.post('/:id', withAuth, (req, res) => {
    Comment.create({
        comment_text: req.body.comment_text,
        user_id: req.body.user_id,
        post_id: req.params.id
    })
        .then(dbResponse => res.json(dbResponse))
        .catch(data => {
            let errorResponse = { message: 'POST request error', data }
            console.log(errorResponse);
            res.status(500).json(errorResponse);
        });
});

router.delete('/comment/:id', withAuth, ({ params }, res) => {
    Comment.destroy({ where: { id: params.id } })
        .then(dbResponse => {
            if (!dbResponse) {
                res.status(404).json({ message: 'Comment not found' })
                return;
            }
            res.json({ message: 'Comment deleted', sqlres: dbResponse })
        })
        .catch(data => {
            let errorResponse = { message: 'DELETE request error', data }
            console.log(errorResponse);
            res.status(500).json(errorResponse);
        });
})

module.exports = router;