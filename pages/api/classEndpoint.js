const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchAllClasses() {
    const response = await fetch(`${API_URL}/api/class/all`);
    if (!response.ok) {
        throw new Error('Failed to fetch classes');
    }
    return await response.json();
}

export async function createClass(classData) {
    const response = await fetch(`${API_URL}/api/class/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(classData),
    });
    if (!response.ok) {
        throw new Error('Failed to create class');
    }
    return await response.json();
}

export async function getAllClasses(classData) {
    const response = await fetch(`${API_URL}/api/class/all`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(classData),
    });
    if (!response.ok) {
        throw new Error('Failed to create class');
    }
    return await response.json();
}