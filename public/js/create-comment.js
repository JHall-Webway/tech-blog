createComment = async (commentObj) => {
    const res = await fetch('/api/comments', {
        method: 'post',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            comment_text: document.getElementById('commentInput').value.toString().trim(),
            user_id: commentObj.user_id,
            post_id: commentObj.post_id
        })
    })
    if (res.ok) {
        document.location.reload();
    }
};