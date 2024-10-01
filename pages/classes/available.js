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

    const [dateFilter, setDateFilter] = useState("All")
    const [subjectFilter, setSubjectFilter] = useState("All")

    useEffect(() => {
        fetchClassesData(setClasses, setLoading, setError)
    }, [])

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>

    // Filter by date
    const filterByDate = (classes) => {
        const today = new Date();
        const nextDay = new Date(today);
        nextDay.setDate(today.getDate() + 1);

        const nextWeek = new Date(today);
        nextWeek.setDate(today.getDate() + 7);

        return classes.filter(course => {
            const courseDate = new Date(course.date); // Assuming `course.date` contains the date of the class
            if (dateFilter === "Today") {
                return courseDate.toDateString() === today.toDateString();
            } else if (dateFilter === "Next Day") {
                return courseDate.toDateString() === nextDay.toDateString();
            } else if (dateFilter === "Next Week") {
                return courseDate >= today && courseDate <= nextWeek;
            }
            return true; // "All" case returns all courses
        });
    };

    // Filter by subject
    const filterBySubject = (classes) => {
        if (subjectFilter === "All") return classes;
        return classes.filter(course => course.subject === subjectFilter); // Assuming `course.subject` exists
    };

    // Apply both filters
    const filteredClasses = filterBySubject(filterByDate(classes));

    return (
        <PageLayout title="Clases Disponibles">
            <Head>
                <title>Clases Disponibles</title>
            </Head>

            {/* Dropdown for Date Filter */}
            <div>
                <label htmlFor="dateFilter">Filter by Date: </label>
                <select id="dateFilter" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)}>
                    <option value="All">All Dates</option>
                    <option value="Today">Today</option>
                    <option value="Next Day">Next Day</option>
                    <option value="Next Week">Next Week</option>
                </select>
            </div>

            {/* Dropdown for Subject Filter */}
            <div>
                <label htmlFor="subjectFilter">Filter by Subject: </label>
                <select id="subjectFilter" value={subjectFilter} onChange={(e) => setSubjectFilter(e.target.value)}>
                    <option value="All">All Subjects</option>
                    <option value="Filosofia">Filosofia</option>
                    <option value="Language">Language</option>
                    <option value="Science">Science</option>
                </select>
            </div>

            {/* Filtered Class List */}
            <ClassList classes={filteredClasses}/>
        </PageLayout>
    )
}