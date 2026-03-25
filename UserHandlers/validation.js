const form = document.getElementById('form');
const username_input = document.getElementById('username');
const password_input = document.getElementById('password');
const repeat_password_input = document.getElementById('repeat-password');
const error_message = document.getElementById('error-message');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    let errors = [];

    if (repeat_password_input) {
        // SIGNUP
        errors = getSignUpFormErrors(
            username_input.value,
            password_input.value,
            repeat_password_input.value
        );

        if (errors.length > 0) {
            error_message.innerText = errors.join('. ');
            return;
        }

        try {
            const res = await fetch('https://lucky-roller-backend.onrender.com/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: username_input.value,
                    password: password_input.value
                })
            });

            const data = await res.json();

            if (!data.success) {
                error_message.innerText = data.message;
            } else {
                alert('Account created! 🎉');
            }

        } catch (err) {
            error_message.innerText = 'Server not running!';
        }

    } else {
        // LOGIN
        errors = getLoginFormErrors(
            username_input.value,
            password_input.value
        );

        if (errors.length > 0) {
            error_message.innerText = errors.join('. ');
            return;
        }

        try {
            const res = await fetch('https://lucky-roller-backend.onrender.com/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: username_input.value,
                    password: password_input.value
                })
            });

            const data = await res.json();

            if (!data.success) {
                error_message.innerText = data.message;
            } else {
                alert('Logged in! 🎉');
            }

        } catch (err) {
            error_message.innerText = 'Sorry, the server is having some issues. Please try again later!';
        }
    }
});

function getSignUpFormErrors(username, password, repeatPassword) {
    let errors = [];

    if (username === '' || username == null) {
        errors.push('Username is required');
        username_input.parentElement.classList.add('incorrect');
    }

    if (password === '' || password == null) {
        errors.push('Password is required');
        password_input.parentElement.classList.add('incorrect');
    }

    if (password.length < 8) {
        errors.push('Password must have at least 8 characters');
        password_input.parentElement.classList.add('incorrect');
    }

    if (password !== repeatPassword) {
        errors.push('Password does not match repeated password');
        password_input.parentElement.classList.add('incorrect');
        repeat_password_input.parentElement.classList.add('incorrect');
    }

    return errors;
}

function getLoginFormErrors(username, password) {
    let errors = [];

    if (username === '' || username == null) {
        errors.push('Username is required');
        username_input.parentElement.classList.add('incorrect');
    }

    if (password === '' || password == null) {
        errors.push('Password is required');
        password_input.parentElement.classList.add('incorrect');
    }

    return errors;
}

const allInputs = [username_input, password_input, repeat_password_input].filter(input => input !== null);

allInputs.forEach(input => {
    input.addEventListener('input', () => {
        if (input.parentElement.classList.contains('incorrect')) {
            input.parentElement.classList.remove('incorrect');
            error_message.innerText = '';

        }
    })
});