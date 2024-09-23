// components/layout/Header.js
import Link from 'next/link';

export default function Header() {
    return (
        <div>
            <Link href="/" passHref>
                <img src="/images/libroEdu.png" alt="Logo" width={35} />
            </Link>
        </div>
    );
}