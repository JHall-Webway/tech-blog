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
        document.location.replace('/dashboard');
    } else {
        $('form')
            .append($('<p>').text('Invalid Username/Password'));
    }
});