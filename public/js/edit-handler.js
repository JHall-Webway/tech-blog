editPost = id => {
    let postTitle = document.getElementById(`post_title_${id}`);
    let postText = document.getElementById(`post_body_${id}`);
    postTitle.outerHTML = `<input type="text" class="form-control" id="post_edit_title_${id}" value="' + postTitle.innerText + '">`;
    postText.outerHTML = `<textarea class="form-control" id="post_edit_text_${id}" rows="3">' + postText.innerText + '</textarea>`;
    document.getElementById(`edit_btn_${id}`).style.display = 'none';
    document.getElementById(`delete_btn_${id}`).style.display = 'none';
    document.getElementById(`save_btn_'${id}`).style.display = 'flex';
}

savePost = async id => {
    let postTitle = document.getElementById(`post_edit_title_${id}`);
    let postText = document.getElementById(`post_edit_text_${id}`);
    const res = await fetch(`api/posts/${id}`, {
        method: 'put',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            post_title: postTitle.value.toString().trim(),
            post_text: postText.value.toString().trim()
        })
    });

    if (res.ok) {
        postTitle.outerHTML = `<h5 id="post_title_${id}">` + postTitle.value + `</h5>`;
        postText.outerHTML = `<p class="card-text" id="post_body_${id}">` + postText.value + `</p>`;
        document.getElementById(`save_btn_${id}`).style.display = 'none';
    }
};

deletePost = id => {
    document.getElementById(`delete_btn_${id}`)
    .outerHTML = `<button type="button" class="delete-post btn btn-danger btn-sm" id="confirm_delete_btn_${id}
    onclick="confirmDeletePost(${id})">confirm</button>`;
};

confirmDeletePost = async id => {
    const res = await fetch(`/api/posts/${id}`, {
        method: 'delete',
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (res.ok) {
        document.getElementById(`post_${id}`).remove();
    }
};

editComment = id => {

};

saveComment = id => {

};

deleteComment = id => {

};

confirmDeleteComment = id => {

};