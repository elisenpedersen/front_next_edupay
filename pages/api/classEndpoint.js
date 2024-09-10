const API_URL = process.env.NEXT_PUBLIC_API_URL; // todo fix .env


export const fetchClassesData = async (setClasses, setLoading, setError) => {

    try {
        const response = await fetch(`${API_URL}/api/class/all`);
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

export async function createClass({ subject, link_meet, date, time, description, class_price, teacher_id }) {
    const response = await fetch(`${API_URL}/api/class/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subject, link_meet, dia: date, horario: time, description, class_price, teacher_id }),
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

export async function getTeacherClasses(teacher_id) {
    const response = await fetch(`${API_URL}/api/class/teacher_class`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ teacher_id }),
    });
    if (!response.ok) {
        throw new Error('Failed to fetch classes');
    }
    return await response.json();
}

export async function deleteClass(classId) {
    const response = await fetch(`${API_URL}/api/class/delete`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ class_id: classId }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete class');
    }

    return await response.json();
}