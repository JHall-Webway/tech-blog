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
        .then(dbResponse => res.json(dbResponse))
});

router.put('/:id', (req, res) => {
    Comment.update(req.body, {
        where: {
            id: req.params.id
        }
    })
        .then(dbResponse => res.json(dbResponse));
});

router.delete('/:id', (req, res) => {
    Comment.destroy({ where: { id: req.params.id }})
        .then(dbResponse => res.json(dbResponse));
});

module.exports = router; 