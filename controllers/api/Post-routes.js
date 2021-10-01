const router = require('express').Router();
const { Post } = require('../../models');

router.get('/', (req, res) => {
    Post.findAll()
        .then(dbResponse => res.json(dbResponse))
});

module.exports = router; 