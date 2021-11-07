createPost = async id => {
    const inputObj = {
        post_title: document.getElementById('titleInput').value.toString().trim(),
        post_text: document.getElementById('bodyInput').value.toString().trim(),
        user_id: id
    }
    const res = await fetch('/api/posts', {
        method: 'post',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(inputObj)
    })
    
    if (res.ok) {
        document.location.replace('/');
    }
}