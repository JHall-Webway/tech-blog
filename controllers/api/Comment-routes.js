const router = require('express').Router();
const { Comment } = require('../../models');

router.get('/', (req, res) => {
    Comment.findAll()
        .then(response => res.json(response))
})

router.post('/', ({ body }, res) => {
    Comment.create(body)
        .then(dbResponse => res.json(dbResponse));
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
            res.json({ message: 'Comment update successful', sqlres: dbResponse})
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