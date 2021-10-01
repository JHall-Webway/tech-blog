const router = require('express').Router();
const { Post, Comment } = require('../../models');

router.post('/', ({ body }, res) => {
    Post.create(body)
        .then(dbResponse => res.json(dbResponse))
});

router.get('/', (req, res) => {
    Post.findAll({
        include: {
            model: Comment,
            attributes: [
                'id',
                'comment_text',
                'user_id'
            ]
        }
    })
        .then(dbResponse => res.json(dbResponse))
});

router.get('/:id', (req, res) => {
    Post.findOne(
        {
            where: {
                id: req.params.id
            },
            include: {
                model: Comment,
                attributes: [
                    'id',
                    'comment_text',
                    'user_id'
                ]
            }
        }
    )
        .then(dbResponse => res.json(dbResponse));
});

router.put('/:id', (req, res) => {
    Post.update(req.body, {
        where: {
            id: req.params.id
        }
    })
        .then(dbResponse => res.json(dbResponse));
});

router.delete('/:id', (req, res) => {
    Post.destroy({ where: { id: req.params.id }})
        .then(dbResponse => res.json(dbResponse));
});

module.exports = router; 