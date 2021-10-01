const router = require('express').Router();
const { Comment, Post } = require('../../models');

router.post('/', ({ body }, res) => {
    Comment.create(body)
        .then(dbResponse => res.json(dbResponse));
});

router.get('/', (req, res) => {
    Comment.findAll({
        include: {
            model: Post,
        }
    })
        .then(dbResponse => res.json(dbResponse))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    Comment.findOne({
        where: {
            id: req.params.id
        },
        include: {
            model: Post,
        }
    })
        .then(dbResponse => {
            if (!dbResponse) {
                res.status(404).json({ message: 'comment not found' });
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
    Comment.update(req.body, {
        where: {
            id: req.params.id
        }
    })
        .then(dbResponse => {
            if (!dbResponse) {
                res.status(404).json({ message: 'comment not found' });
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
    Comment.destroy({ where: { id: req.params.id } })
        .then(dbResponse => {
            if (!dbResponse) {
                res.status(404).json({ message: 'comment not found' });
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