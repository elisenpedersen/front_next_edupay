// pages/payment-methods.js
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image'; // Importing Image component
import styles from '../../styles/Payment.module.css'

export default function PaymentMethods() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Payment Methods</title>
            </Head>
            <h1 className={styles.title}>Payment Methods</h1>
            <div className={styles.paymentOptions}>
                <div className={styles.option}>
                    <Image
                        src="/images/credit_card.png"
                        alt="Credit Card"
                        width={40}
                        height={40}
                    />
                    <span>Credit Card</span>
                </div>
                <div className={styles.option}>
                    <Image
                        src="/images/Paypal_2014_logo.png"
                        alt="PayPal"
                        width={40}
                        height={40}
                    />
                    <span>PayPal</span>
                </div>
                <div className={styles.option}>
                    <Image
                        src="/images/bitcoin.png"
                        alt="Bitcoin"
                        width={40}
                        height={40}
                    />
                    <span>Bitcoin</span>
                </div>
            </div>
            <Link href="/" className={styles.link}>
                Go back to main page
            </Link>
        </div>
    );
}
