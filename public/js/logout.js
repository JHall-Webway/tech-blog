logOut = async (event) => {
    event.preventDefault();
    res = await fetch('api/users/logout', { method: 'post' });
    if (res.ok) {
        document.location.reload();
    }
};