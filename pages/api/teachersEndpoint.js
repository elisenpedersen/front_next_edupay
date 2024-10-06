const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://tough-kerrill-gagitogol-f492a8ba.koyeb.app';
import jwt from 'jsonwebtoken';


export async function createTeacher({ email, name, surname, cellphone, cvu }) {
    const response = await fetch(`${API_URL}/src/te/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, cvu: String(cvu), name, surname, cellphone } ),
    });
    if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(`Failed to create teacher: ${errorDetails.message}`);
    }
    return await response.json();
}


export async function deleteTeacher(teacherId) {
    const response = await fetch(`${API_URL}/src/te/delete/${teacherId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(`Failed to delete teacher: ${errorDetails.message}`);
    }
    return await response.json();
}

export async function updateTeacher(teacherId, { email, name, surname, cellphone, cvu }) {
    const response = await fetch(`${API_URL}/src/te/update/${teacherId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, name, surname, cellphone, cvu }),
    });
    if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(`Failed to update teacher: ${errorDetails.message}`);
    }
    return await response.json();
}

export async function getTeacherByEmail() {
    const token = localStorage.getItem('token');
    const decodedToken = jwt.decode(token);
    const email = decodedToken.email;

    const response = await fetch(`${API_URL}/src/te/getTeacher`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({email})
    });
    if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(`Failed to fetch teacher: ${errorDetails.message}`);
    }
    return await response.json();
}