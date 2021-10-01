const router = require('express').Router();
const { Post, Comment } = require('../../models');

router.post('/', ({ body }, res) => {
    Post.create(body)
        .then(dbResponse => res.json(dbResponse))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
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
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
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
        .then(dbResponse => {
            if (!dbResponse) {
                res.status(404).json({ message: 'post not found' });
                return;
            }
            res.json(dbResponse)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.put('/:id', (req, res) => {
    Post.update(req.body, {
        where: {
            id: req.params.id
        }
    })
        .then(dbResponse => {
            if (!dbResponse) {
                res.status(404).json({ message: 'post not found' });
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
    Post.destroy({ where: { id: req.params.id } })
        .then(dbResponse => {
            if (!dbResponse) {
                res.status(404).json({ message: 'post not found' });
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