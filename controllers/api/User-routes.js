const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

router.post('/', (req, res) => {
    User.create(req.body)
        .then(dbResponse => {
            req.session.save(() => {
                req.session.user_id = dbResponse.id;
                req.session.username = dbResponse.username;
                req.session.loggedIn = true;

                res.json(dbResponse);
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
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
        .then(dbResponse => res.json(dbResponse))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
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
        .then(dbResponse => {
            if (!dbResponse) {
                res.status(404).json({ message: 'user not found' });
                return;
            }
            res.json(dbResponse)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/:id', (req, res) => {
    User.destroy(
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbResponse => {
            if (!dbResponse) {
                res.status(404).json({ message: 'user not found' });
                return;
            }
            res.json(dbResponse)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;

