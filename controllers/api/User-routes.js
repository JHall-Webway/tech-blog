const router = require('express').Router();
const { User, Post, Comment } = require('../../models');


router.post('/', ({ body }, res) => {
    User.create(body)
        .then(dbResponse => res.json(dbResponse))
        .catch(data => {
            let errorResponse = { message: 'POST request error', data }
            console.log(errorResponse);
            res.status(500).json(errorResponse);
        });
});

router.get('/', (req, res) => {
    User.findAll({
        attributes: ['id', 'username', 'password'],
        include: [
            {
                model: Post,
                attributes: ['id', 'post_title', 'post_text']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text'],
                include: {
                    model: Post,
                    attributes: ['id', 'post_title', 'post_text']
                }
            }
        ]
    })
        .then(dbResponse => {
            if (!dbResponse.length) {
                res.status(404).json({ message: 'No users found' });
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
    User.findOne({
        where: { id: params.id },
        attributes: ['id', 'username', 'password'],
        include: [
            {
                model: Post,
                attributes: ['id', 'post_title', 'post_text']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text'],
                include: {
                    model: Post,
                    attributes: ['id', 'post_title', 'post_text']
                }
            }
        ]
    })
        .then(dbResponse => {
            if (!dbResponse) {
                res.status(404).json({ message: 'Users not found' });
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

router.delete('/:id', ({ params }, res) => {
    User.destroy({ where: { id: params.id } })
        .then(dbResponse => {
            if (!dbResponse) {
                res.status(404).json({ message: 'user not found' });
                return;
            }
            res.json(dbResponse)
        })
        .catch(data => {
            let errorResponse = { message: 'DELETE request error', data }
            console.log(errorResponse);
            res.status(500).json(errorResponse);
        });
});

router.post('/login', (req, res) => {
    User.findOne({ where: { username: req.body.username } })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(400).json({ message: 'No user with that name' });
                return;
            }

            if (!dbUserData.checkPassword(req.body.password)) {
                res.status(400).json({ message: 'Incorrect password!' });
                return;
            }

            req.session.save(() => {
                // declare session variables
                req.session.user_id = dbUserData.id;
                req.session.username = dbUserData.username;
                req.session.loggedIn = true;

                res.json({ message: 'You are now logged in!', user: dbUserData });
            });
        })
        .catch(data => {
            let errorResponse = { message: 'POST request error', data }
            console.log(errorResponse);
            res.status(500).json(errorResponse);
        });;
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => res.status(204).json({ message: 'Logged out' }));
        return;
    }
    res.status(404).end();
});
module.exports = router;

