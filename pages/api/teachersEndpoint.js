const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://tough-kerrill-gagitogol-f492a8ba.koyeb.app';

export async function createTeacher({ email, name, surname, cellphone, cvu }) {
    const response = await fetch(`${API_URL}/src/te/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, name, surname, cellphone, cvu }),
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

export async function getTeacherById(teacherId) {
    const response = await fetch(`${API_URL}/src/te/${teacherId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(`Failed to fetch teacher: ${errorDetails.message}`);
    }
    return await response.json();
}