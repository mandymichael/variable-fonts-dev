import FooterStyles from '../styles/Footer.module.css';
import Link from 'next/link';
import Image from 'next/image';
import {LinkedIn, Github } from './icons'

export default function Footer() {
    return (
        <footer className={FooterStyles.footerContainer}>
            <div className={FooterStyles.footerBlock}>
                <Image src="/images/Logo.svg" alt="Variable Fonts for Developers" className={FooterStyles.logo} width="80" height="80" />
            </div>
            
            <div className={FooterStyles.footerLinks}>
                <nav className={FooterStyles.nav}>
                    <ul className={FooterStyles.navList}>
                        <li className={FooterStyles.navItem}><Link href="/getting-started" className={FooterStyles.navLink}>Getting Started</Link></li>
                        <li className={FooterStyles.navItem}><Link href="/all-font-lists" className={FooterStyles.navLink}>Font Lists</Link></li>
                        <li className={FooterStyles.navItem}><Link href="/articles" className={FooterStyles.navLink}>Articles</Link></li>
                        <li className={FooterStyles.navItem}><Link href="/about" className={FooterStyles.navLink}>About</Link></li>
                        <li className={FooterStyles.navItem}><Link href="https://www.linkedin.com/in/mandykerr" target="_blank" className={FooterStyles.navLink}>Contact</Link></li>
                    </ul>
                </nav>

                <div className={FooterStyles.footnote}>

                <p className={FooterStyles.creator}>A <Link href="https://mandy.dev">Mandy Michael</Link> production, supported by <Link href="https://www.instagram.com/adognamedjello">Jello</Link></p>
                <div className={FooterStyles.social}>
                    <Link href="https://www.linkedin.com/in/mandykerr"><LinkedIn /></Link>
                    <Image src="/images/Jello.png" alt="Jello the Golden Retriever inside two rings" quality={100} width="102" height="120" loading="lazy" />
                    <Link href="https://github.com/mandymichael"><Github /></Link>
                </div>
                <p className={FooterStyles.creator}>Designed by <Link href="https://petebarr.com">Pete Barr</Link></p>
                </div>
            </div>

        </footer>   
    )
}