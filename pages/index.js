import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>MainPage</title>
            </Head>
            <h1 className={styles.title}>Main page</h1>
            <h2>
                <Link href="/teachers/login" className={styles.link}>
                    Login for teachers →
                </Link>
            </h2>
            <h2>
                <Link href="/payment/pay" className={styles.link}>
                    Access my class →
                </Link>
            </h2>
        </div>
    );
}
