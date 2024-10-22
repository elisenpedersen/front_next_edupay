import React, { useState, useEffect } from 'react';
import {getUserByEmail, logoutAuth0} from '../api/authEndpoints';
import { useRouter } from 'next/router';
import { getTeacherByEmail } from '../api/teachersEndpoint'

import {
    Home,
    Book,
    Calendar,
    MessageSquare,
    DollarSign,
    Map,
    Settings,
    LogOut,
    Search,
    Bell,
    Users,
    BarChart2,
    TrendingUp,
    DollarSign as DollarIcon,
    Clock,
    CheckCircle,
    ChevronsUp
} from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import styles from '../../styles/Dashboard.module.css';

// Register the components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const SidebarItem = ({ icon: Icon, label, onClick }) => (
    <button className={styles.sidebarItem} onClick={onClick}>
        <Icon size={20} />
        <span>{label}</span>
    </button>
);

async function fetchTeacherDetails() {
    try {
        const teacher = await getUserByEmail();
        const { name, cvu, email } = teacher;
        return { name, cvu, email };
    } catch (error) {
        console.error('Error fetching teacher details:', error);
        throw error;
    }
}

//
export default function TeacherDashboard() {

    const router = useRouter();

    const [teacherName, setTeacherName] = useState('');

    useEffect(() => {
        fetchTeacherDetails().then(details => {
            setTeacherName(details.name);
        }).catch(error => {
            console.error('Error fetching teacher details:', error);
        });
    }, []);
    const upcomingLessons = [
        { id: 1, title: "Introduction to React", date: "2023-09-15", time: "10:00 AM" },
        { id: 2, title: "Advanced JavaScript Concepts", date: "2023-09-16", time: "2:00 PM" },
        { id: 3, title: "CSS Flexbox and Grid", date: "2023-09-17", time: "11:00 AM" },
    ];

    const pastLessons = [
        { id: 1, title: "HTML Basics", date: "2023-09-10", time: "9:00 AM" },
        { id: 2, title: "JavaScript Fundamentals", date: "2023-09-12", time: "1:00 PM" },
        { id: 3, title: "Responsive Web Design", date: "2023-09-14", time: "3:00 PM" },
    ];

    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Earnings',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                backgroundColor: 'rgb(75, 192, 192)',
                borderColor: 'rgba(75, 192, 192, 0.2)',
            },
        ],
    };

    const handleLogout = async () => {
        await logoutAuth0();
        localStorage.removeItem('token');
   };

    const handleSettings = () => {
        router.push('/teachers/tSettings');
    }

    return (
        <div className={styles.dashboard}>
            <aside className={styles.sidebar}>
                <div className={styles.sidebarHeader}>
                    <h2>TeacherHub</h2>
                </div>
                <nav>
                    <ul className={styles.sidebarNav}>
                        <SidebarItem icon={Home} label="Dashboard" />
                        <SidebarItem icon={Book} label="Courses" onClick={() => window.location.href = '/teachers/dashboard/lessons'} />
                        <SidebarItem icon={Calendar} label="Schedule" />
                        <SidebarItem icon={MessageSquare} label="Messages" />
                        <SidebarItem icon={DollarSign} label="Earnings" />
                        <SidebarItem icon={Map} label="Classroom Map" />
                    </ul>
                </nav>
                <div className={styles.sidebarFooter}>
                    <SidebarItem icon={Settings} label="Settings" onClick={handleSettings}/>
                    <SidebarItem icon={LogOut} label="Logout" onClick={handleLogout} />
                </div>
            </aside>

            <main className={styles.content}>
                <header className={styles.header}>
                <div className={styles.welcomeMessage}>
                        Bienvenido <span className={styles.teacherName}>{teacherName}</span>
                    </div>
                    <div className={styles.userActions}>
                        <Bell size={20}/>
                        <div className={styles.userAvatar}>
                            <img src="/placeholder.svg?height=32&width=32" alt="User Avatar"/>
                        </div>
                    </div>
                </header>

                <section className={styles.analyticsOverview}>
                    <h2>Analytics Overview</h2>
                    <ul className={styles.analyticsList}>
                        <li className={styles.analyticsItem}>
                            <Users size={24}/>
                            <div>
                                <h3>Students</h3>
                                <p className={styles.metricValue}>152</p>
                                <p className={styles.metricChange}>+12 this month</p>
                            </div>
                        </li>
                        <li className={styles.analyticsItem}>
                            <Book size={24}/>
                            <div>
                                <h3>Courses</h3>
                                <p className={styles.metricValue}>8</p>
                                <p className={styles.metricChange}>+2 this month</p>
                            </div>
                        </li>
                        <li className={styles.analyticsItem}>
                            <BarChart2 size={24}/>
                            <div>
                                <h3>Avg. Score</h3>
                                <p className={styles.metricValue}>85%</p>
                                <p className={styles.metricChange}>+5% this month</p>
                            </div>
                        </li>
                        <li className={styles.analyticsItem}>
                            <DollarIcon size={24}/>
                            <div>
                                <h3>Earnings</h3>
                                <p className={styles.metricValue}>$3,240</p>
                                <p className={styles.metricChange}>+$420 this month</p>
                            </div>
                        </li>
                    </ul>
                </section>
                <section className={styles.lessonOverview}>
                    <div className={styles.upcomingLessons}>
                        <h2>Upcoming Lessons </h2>
                        <ul className={styles.lessonList}>
                            {upcomingLessons.map((lesson) => (
                                <li key={lesson.id} className={styles.lessonItem}>
                                    <Clock size={20}/>
                                    <div>
                                        <h3>{lesson.title}</h3>
                                        <p>{lesson.date} at {lesson.time}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className={styles.pastLessons}>
                        <h2>Past Lessons</h2>
                        <ul className={styles.lessonList}>
                            {pastLessons.map((lesson) => (
                                <li key={lesson.id} className={styles.lessonItem}>
                                    <CheckCircle size={20} color={'green'}/>
                                    <div>
                                        <h3>{lesson.title}</h3>
                                        <p>{lesson.date} at {lesson.time}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                <section className={styles.chartSection}>
                    <h2>Earnings Over Time</h2>
                    <Line data={data}/>
                </section>
            </main>
        </div>
    );
}