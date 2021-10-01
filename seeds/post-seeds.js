const { Post } = require('../models')

const postData = [
    {
        post_title: 'This is the first test post!',
        post_text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent iaculis risus in dolor fermentum iaculis. Vivamus odio eros, suscipit quis mauris sit amet, convallis luctus nunc. Fusce venenatis eget ex id posuere. Sed vestibulum eros et vestibulum rutrum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin lobortis odio neque, quis varius felis tincidunt eu. Vestibulum interdum non dolor a porta. Duis aliquam ante metus, id bibendum ante sodales sed. Nullam lectus ipsum, pulvinar a suscipit eu, rutrum pellentesque lacus. Duis vel elementum orci. Curabitur feugiat porttitor suscipit.',
        user_id: 1
    },
    {
        post_title: 'This is the SECOND test post!',
        post_text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent iaculis risus in dolor fermentum iaculis. Vivamus odio eros, suscipit quis mauris sit amet, convallis luctus nunc. Fusce venenatis eget ex id posuere. Sed vestibulum eros et vestibulum rutrum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin lobortis odio neque, quis varius felis tincidunt eu. Vestibulum interdum non dolor a porta. Duis aliquam ante metus, id bibendum ante sodales sed. Nullam lectus ipsum, pulvinar a suscipit eu, rutrum pellentesque lacus. Duis vel elementum orci. Curabitur feugiat porttitor suscipit.',
        user_id: 2
    },
    {
        post_title: 'Hello Everyone!',
        post_text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent iaculis risus in dolor fermentum iaculis. Vivamus odio eros, suscipit quis mauris sit amet, convallis luctus nunc. Fusce venenatis eget ex id posuere. Sed vestibulum eros et vestibulum rutrum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin lobortis odio neque, quis varius felis tincidunt eu. Vestibulum interdum non dolor a porta. Duis aliquam ante metus, id bibendum ante sodales sed. Nullam lectus ipsum, pulvinar a suscipit eu, rutrum pellentesque lacus. Duis vel elementum orci. Curabitur feugiat porttitor suscipit.',
        user_id: 1
    }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;