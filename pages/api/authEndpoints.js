const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://tough-kerrill-gagitogol-f492a8ba.koyeb.app';

export async function login(email, password) {
    const response = await fetch(`${API_URL}/api/login`, {
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

    return data;
}