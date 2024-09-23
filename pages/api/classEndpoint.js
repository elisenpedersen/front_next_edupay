const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://tough-kerrill-gagitogol-f492a8ba.koyeb.app';
import { jwtDecode } from 'jwt-decode';

export const fetchClassesData = async (setClasses, setLoading, setError) => {

    try {
        const response = await fetch(`${API_URL}/src/cl/all`);
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

export async function createClass({ subject, link_meet, date, time, description, class_price, token }) {
    const decodedToken = jwtDecode(token);
    const teacher_id = decodedToken.userId; // Ensure this matches the structure of your token
    const response = await fetch(`${API_URL}/src/cl/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ subject, link_meet, dia: date, horario: time, description, class_price, teacher_id }),
    });
    if (!response.ok) {
        throw new Error('Failed to create class');
    }
    return await response.json();
}

export async function getTeacherClasses(token) {
    const decodedToken = jwtDecode(token);
    const teacher_email = decodedToken.email; // Ensure this matches the structure of your token

    const response = await fetch(`${API_URL}/src/cl/lesson`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ teacher_email }),
    });
    if (!response.ok) {
        throw new Error('Failed to fetch classes');
    }
    return await response.json();
}

export async function deleteClass(classId, token) {
    const response = await fetch(`${API_URL}/src/cl/delete`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ class_id: classId }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete class');
    }

    return await response.json();
}

export const fetchClassById = async (classid, setClassDetail, setLoading, setError) => {
    try {
        setLoading(true);
        const response = await fetch(`${API_URL}/src/cl/${classid}`);
        if (!response.ok) {
            throw new Error('Error al obtener la clase');
        }
        const data = await response.json();
        setClassDetail(data);
        setLoading(false);
    } catch (error) {
        setError(error.message);
        setLoading(false);
    }
};
