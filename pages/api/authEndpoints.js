const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://tough-kerrill-gagitogol-f492a8ba.koyeb.app';

export async function register(email, password, name, surname, cellphone, cvu) {
    const resp = await fetch(`${API_URL}/src/usr/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password, name, surname, cellphone, cvu}),
    });

    const data = await resp.json();

    if(!resp.ok){
        throw new Error(data.error || 'Failed to register');
    }

    return data;
}

export async function login(email, password) {
    const response = await fetch(`${API_URL}/src/usr/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
   if (!response.ok) {
        throw new Error(data.error || 'Failed to login');
    }
``
    // Store the access token in local storage
    localStorage.setItem('access_token', data.token);

    return data;
}
