import React, { useEffect, useState } from 'react';
import PageLayout from '../../components/layout/PageLayout';
import { fetchClassesData } from '../api/classEndpoint';
import ClassList from "@/components/class/ClassList";
import Head from "next/head";
import styles from '../../styles/Backbutton.module.css';

export default function ListaClasesModerna() {
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [dateFilter, setDateFilter] = useState("All");
    const [subjectFilter, setSubjectFilter] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchClassesData(setClasses, setLoading, setError);
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

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

    // Filter by search term
    const filterBySearchTerm = (classes) => {
        if (searchTerm === "") return classes;

        return classes.filter(course => {
            const courseName = course.name ? course.name.toLowerCase() : ""; // Safely access course.name
            const courseSubject = course.subject ? course.subject.toLowerCase() : ""; // Safely access course.subject

            return courseName.includes(searchTerm.toLowerCase()) || courseSubject.includes(searchTerm.toLowerCase());
        });
    };

    // Apply all filters
    const filteredClasses = filterBySearchTerm(filterBySubject(filterByDate(classes)));

    return (
        <PageLayout title="Clases Disponibles">
            <Head>
                <title>Clases Disponibles</title>
            </Head>

            <div style={{ display: 'flex' }}>
                {/* Class List Section */}
                <div style={{ flex: 3 }}>
                    <ClassList classes={filteredClasses} />
                </div>

                {/* Filters and Search Section */}
                <div style={{ flex: 1, marginLeft: '20px' }}>
                    {/* Date Filter */}
                    <div style={{ marginBottom: '20px' }}>
                        <label htmlFor="dateFilter">Filter by Date: </label>
                        <select
                            id="dateFilter"
                            value={dateFilter}
                            onChange={(e) => setDateFilter(e.target.value)}
                            style={{ width: '100%' }}
                        >
                            <option value="All">All Dates</option>
                            <option value="Today">Today</option>
                            <option value="Next Day">Next Day</option>
                            <option value="Next Week">Next Week</option>
                        </select>
                    </div>

                    {/* Subject Filter */}
                    <div style={{ marginBottom: '20px' }}>
                        <label htmlFor="subjectFilter">Filter by Subject: </label>
                        <select
                            id="subjectFilter"
                            value={subjectFilter}
                            onChange={(e) => setSubjectFilter(e.target.value)}
                            style={{ width: '100%' }}
                        >
                            <option value="All">All Subjects</option>
                            <option value="Filosofia">Filosofia</option>
                            <option value="Language">Language</option>
                            <option value="Science">Science</option>
                        </select>
                    </div>

                    {/* Search Box */}
                    <div style={{ marginBottom: '20px' }}>
                        <label htmlFor="search">Search by Keyword: </label>
                        <input
                            type="text"
                            id="search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search by subject"
                            style={{ width: '100%', padding: '8px' }}
                        />
                    </div>

                    {/* Search Button */}
                    <button
                        onClick={() => {
                            setSearchTerm("");
                            setDateFilter("All");
                            setSubjectFilter("All");
                        }}
                        style={{
                            width: '100%',
                            padding: '10px',
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            border: 'none',
                            cursor: 'pointer',
                            marginTop: '10px',
                        }}
                    >
                        Reset Search
                    </button>
                </div>
            </div>
        </PageLayout>
    );
}