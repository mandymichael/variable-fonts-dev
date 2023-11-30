import HeaderStyles from '../styles/Header.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
    return (
        <header className={HeaderStyles.headerContainer}>
            <Link href="/"><Image src="/images/Logo.svg" alt="Variable Fonts for Developers" className={HeaderStyles.logo} width="80" height="80" /></Link>

            <nav className={HeaderStyles.nav}>
                <ul className={HeaderStyles.navList}>
                    <li className={HeaderStyles.navItem}><Link href="/getting-started" className={HeaderStyles.navLink}>Getting Started</Link></li>
                    <li className={HeaderStyles.navItem}><Link href="/articles" className={HeaderStyles.navLink}>Articles</Link></li>
                    <li className={HeaderStyles.navItem}><Link href="/all-font-lists" className={HeaderStyles.navLink}>Font Lists</Link></li>
                    <li className={HeaderStyles.navItem}><Link href="/about" className={HeaderStyles.navLink}>About</Link></li>
                </ul>
            </nav>

            <a href="https://www.linkedin.com/in/mandykerr" target="_blank" className={HeaderStyles.contactLink}>Contact</a>
        </header>   
    )
}