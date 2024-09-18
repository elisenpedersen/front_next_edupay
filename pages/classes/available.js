import React, { useEffect, useState } from 'react'
import { useRouter } from "next/router"
import PageLayout from '../../components/layout/PageLayout'
import {fetchClasses, fetchClassesData} from '../api/classEndpoint'
import ClassList from "@/components/class/ClassList";
import Head from "next/head";

export default function ListaClasesModerna() {

    const router = useRouter();
    const { id } = router.query;

    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchClassesData(setClasses, setLoading, setError); //todo why they recomend .then
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <PageLayout title="Clases Disponibles">
            <Head>
                <title>Clases Disponibles</title>
            </Head>
            <ClassList classes={classes} />
        </PageLayout>
    )
}