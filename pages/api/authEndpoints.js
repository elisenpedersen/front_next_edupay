const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://tough-kerrill-gagitogol-f492a8ba.koyeb.app';


export async function loginAuth0() {
    window.location.href = `${API_URL}/src/usr/login/auth0`;
}

export async function logoutAuth0() {
    window.location.href = `${API_URL}/logout`;
}

export default function handler(req, res) {
    const authHeader = req.headers['authorization'];
    if (authHeader) {
        const token = authHeader.split(' ')[1]; // Extraer el token eliminando 'Bearer'
        res.status(200).json({ token });
    } else {
        res.status(403).json({ error: 'Token no proporcionado' });
    }
}

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

    // Store the access token in local storage
    localStorage.setItem('access_token', data.token);

    return data;
}

export async function Token() {
    const response = await fetch(`${API_URL}/src/usr/token`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies in the request
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch token');
    }

    return data;
}