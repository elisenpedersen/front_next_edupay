// /pages/teachers/dashboard/[id]/lessons/[classid]/students.js
import { useRouter } from 'next/router';

export default function Students() {
    const router = useRouter();
    const {classid } = router.query;

    return (
        <div>
            <h1>Students for Class {classid}</h1>
            {/* Aquí deberías hacer la llamada a tu API o servicio para obtener los estudiantes */}
            <p>List of students will be shown here.</p>
        </div>
    );
}