import React, { useEffect, useState } from 'react'
import PageLayout from '../../components/layout/PageLayout'
import { fetchClassesData } from '../api/classEndpoint'
import ClassList from "@/components/class/ClassList"
import Head from "next/head"
import Link from "next/link"
import styles from '../../styles/Backbutton.module.css'

export default function ListaClasesModerna() {
    const [classes, setClasses] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchClassesData(setClasses, setLoading, setError)
    }, [])

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>

    return (
        <PageLayout title="Clases Disponibles">
            <Head>
                <title>Clases Disponibles</title>
            </Head>
            <ClassList classes={classes}/>
        </PageLayout>
    )
}