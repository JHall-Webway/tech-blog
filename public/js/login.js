logIn = async (event) => {
    event.preventDefault();
    const input = {
        name: event.target[0].value.trim(),
        password: event.target[1].value.trim()
    };
    res = await fetch('api/users/login', {
        headers: {
            "Content-Type": "application/json"
        },
        method: 'post',
        body: JSON.stringify({
            username: input.name,
            password: input.password
        })
    });

    if (res.ok) {
        document.location.reload();
    }

    const { message } = await res.json();
    document.getElementById('loginAlert').innerHTML =
        `<div class="alert alert-danger" role="alert" id="loginAlert">${message}</div>`;
};

register = async (event) => {
    event.preventDefault();
    const input = {
        name: event.target[0].value.trim(),
        password: event.target[1].value.trim(),
        passwordConfirm: event.target[2].value.trim(),
    };
    const alert = document.getElementById('registerAlert');
    if (input.password === input.passwordConfirm) {
        res = await fetch('api/users/', {
            headers: {
                "Content-Type": "application/json"
            },
            method: 'post',
            body: JSON.stringify({
                username: input.name,
                password: input.password
            })
        });
        if (res.ok) {
            document.location.reload();
        }
        const { message } = await res.json();
        alert.innerHTML = `<div class="alert alert-danger" role="alert" id="loginAlert">${message}</div>`;
        return;
    }
    alert.innerHTML = `<div class="alert alert-danger" role="alert" id="loginAlert">Passwords must match</div>`;
};
