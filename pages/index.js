import Head from 'next/head';
import Link from "next/link";

export default function Home() {
  return (
      <>
          <Head>
              <title>MainPage</title>
          </Head>
          <h1>Main page</h1>
          <h2>
              <Link href="/dashboard/dashboard"> Dashboard → </Link>
          </h2>

      </>
  );
}