const router = require('express').Router();
const { Comment } = require('../../models');

router.get('/', (req, res) => {
    Comment.findAll()
        .then(dbResponse => res.json(dbResponse))
});

module.exports = router; 