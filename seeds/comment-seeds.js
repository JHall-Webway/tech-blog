const { Comment } = require('../models');

const commentData = [
    {
        comment_text: 'cool post!',
        user_id: 3,
        post_id: 1
    },
    {
        comment_text: 'rad post!',
        user_id: 2,
        post_id: 3
    },
    {
        comment_text: 'cool post!',
        user_id: 1,
        post_id: 2
    },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;