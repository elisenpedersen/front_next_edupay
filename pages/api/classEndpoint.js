import jwt from "jsonwebtoken";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://tough-kerrill-gagitogol-f492a8ba.koyeb.app';

// export const fetchClassesData = async (setClasses, setLoading, setError) => {
//
//     try {
//         const response = await fetch(`${API_URL}/src/cl/all`);
//         if (!response.ok) {
//             throw new Error('Failed to fetch classes');
//         }
//         const data = await response.json();
//         setClasses(data);
//         setLoading(false);
//     } catch (err) {
//         setError(err.message);
//         setLoading(false);
//     }
// };

// New DB
export const fetchClassesData = async (setClasses, setLoading, setError) => {

    try {
        const response = await fetch(`${API_URL}/src/cl/renamedclass/all`);
        if (!response.ok) {
            throw new Error('Failed to fetch classes');
        }
        const data = await response.json();

        // Format date and time
        const formattedData = data.map(item => {
            const formattedDate = new Date(item.date)
            const formattedTime = new Date(item.time)
            console.log(`este es el dia ${formattedDate} \n esta el la hora ${formattedTime}`);
            return { ...item, date: formattedDate, time: formattedTime };
        });

        setClasses(formattedData);
        setLoading(false);
    } catch (err) {
        setError(err.message);
        setLoading(false);
    }
};

// export async function createClass({ subject, link_meet, date, time, description, class_price, token }) {
//     const decodedToken = jwtDecode(token);
//     const teacher_id = decodedToken.userId; // Ensure this matches the structure of your token
//     const response = await fetch(`${API_URL}/src/cl/create`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({ subject, link_meet, dia: date, horario: time, description, class_price, teacher_id }),
//     });
//     if (!response.ok) {
//         throw new Error('Failed to create class');
//     }
//     return await response.json();
// }

// New DB
export async function createClass({ subject, link_meet, date, time, description, class_price, instance_count, cvu }) {
    const token = localStorage.getItem('token');
    const decoded = jwt.decode(token);
    const email = decoded.email

    const requestBody = { 
        subject, 
        link_meet, 
        date, 
        time, 
        description, 
        email_teacher : email,
        cvu, 
        class_price: parseFloat(class_price), 
        instance_count: parseInt(instance_count, 10) 
    };
    console.log('Request Body:', requestBody);

    const response = await fetch(`${API_URL}/src/cl/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
        const errorDetails = await response.json();
        console.error('Error Details:', errorDetails);
        throw new Error(`Failed to create class: ${errorDetails.message}`);
    }

    return await response.json();
}

// export async function getTeacherClasses(token) {
//     const decodedToken = jwtDecode(token);
//     const teacher_email = decodedToken.email; // Ensure this matches the structure of your token

//     const response = await fetch(`${API_URL}/src/cl/lesson`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({ teacher_email }),
//     });
//     if (!response.ok) {
//         throw new Error('Failed to fetch classes');
//     }
//     return await response.json();
// }

// New DB
export async function getTeacherClasses() {
    const token = localStorage.getItem('token');
    const decodedToken = jwt.decode(token);
    const email = decodedToken.email;

    const response = await fetch(`${API_URL}/src/cl/teacher/classes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({email})
    });

    if (!response.ok) {
        throw new Error('Failed to fetch classes');
    }
    return await response.json();
}

// export async function deleteClass(classId, token) {
//     const response = await fetch(`${API_URL}/src/cl/delete`, {
//         method: 'DELETE',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({ class_id: classId }),
//     });

//     if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || 'Failed to delete class');
//     }

//     return await response.json();
// }

// New DB
export async function deleteClass(classId) {

    const response = await fetch(`${API_URL}/src/cl/RenamedClass/delete`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ class_id: classId }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete class');
    }

    return await response.json();
}

// export const fetchClassById = async (classid, setClassDetail, setLoading, setError) => {
//     try {
//         setLoading(true);
//         const response = await fetch(`${API_URL}/src/cl/${classid}`);
//         if (!response.ok) {
//             throw new Error('Error al obtener la clase');
//         }
//         const data = await response.json();
//         setClassDetail(data);
//         setLoading(false);
//     } catch (error) {
//         setError(error.message);
//         setLoading(false);
//     }
// };

// New DB
export const fetchClassById = async (classid, setClassDetail, setLoading, setError) => {
    try {
        setLoading(true);
        const response = await fetch(`${API_URL}/src/cl/RenamedClass/${classid}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        
        if (!response.ok) {
            throw new Error('Clase no encontrada');
        }
        const data = await response.json();
        // Convert BigInt to String if necessary
        const responseData = {
            ...data,
            id_class: data.id_class.toString(), // Convert id_class to String
            // Convert other BigInt fields if necessary
        };
        setClassDetail(responseData);
        setLoading(false);

        console.log(responseData);
        
        
    } catch (error) {
        console.error('Error fetching class:', error); // Log del error
        setError(error.message);
        setLoading(false);
    }
};