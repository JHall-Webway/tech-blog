const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

router.post('/', ({ body }, res) => {
    User.create(body)
        .then(dbResponse => res.json(dbResponse));
});

router.get('/', (req, res) => {
    User.findAll({
        attributes: [
            'id',
            'username',
            'password'
        ],
        include: [
            {
                model: Post,
                attributes: [
                    'id',
                    'post_title',
                    'post_text'
                ]
            },
            {
                model: Comment,
                attributes: [
                    'id',
                    'comment_text'
                ],
                include: {
                    model: Post,
                    attributes: [
                        'id',
                        'post_title',
                        'post_text'
                    ]
                }
            }
        ]
    })
        .then(dbResponse => res.json(dbResponse));
});

router.get('/:id', (req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'username',
            'password'
        ],
        include: [
            {
                model: Post,
                attributes: [
                    'id',
                    'post_title',
                    'post_text'
                ]
            },
            {
                model: Comment,
                attributes: [
                    'id',
                    'comment_text'
                ],
                include: {
                    model: Post,
                    attributes: [
                        'id',
                        'post_title',
                        'post_text'
                    ]
                }
            }
        ]
    })
        .then(dbResponse => res.json(dbResponse));
});

router.delete('/:id', (req, res) => {
    User.destroy(
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbResponse => res.json(dbResponse));
});

module.exports = router;

