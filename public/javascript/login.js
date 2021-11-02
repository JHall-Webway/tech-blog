$('.card-body').submit(async event => {
    event.preventDefault();
    const response = await fetch('/api/users/login', {
        method: 'post',
        body: JSON.stringify({
            username: $('#username-form')
                        .val()
                        .trim(),
            password: $('#password-form')
                        .val()
                        .trim()
        }),
        headers: { 'Content-Type': 'application/json' }
    })
    if (response.ok) {
        console.log(response);
    } else {
        console.log('ERROR');
    }
});