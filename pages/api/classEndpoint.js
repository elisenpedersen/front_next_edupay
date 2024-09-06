
const API_URL = process.env.NEXT_PUBLIC_API_URL; // todo fix .env


export const fetchClassesData = async (setClasses, setLoading, setError) => {

    try {
        const response = await fetch('https://tough-kerrill-gagitogol-f492a8ba.koyeb.app/api/class/all');
        if (!response.ok) {
            throw new Error('Failed to fetch classes');
        }
        const data = await response.json();
        setClasses(data);
        setLoading(false);
    } catch (err) {
        setError(err.message);
        setLoading(false);
    }
};


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