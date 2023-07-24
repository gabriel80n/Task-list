import Link from 'next/link'
import styles from '../styles/Navbar.module.css'
import '../styles/globals.css'
export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarLogo}>
        <div className={`${styles.logo}`} ><a href="/">Task</a></div>
        <div className={styles.navbarOthers}>
          <div ><a href="/">Contact</a></div>
          <div ><a href="/">Login</a></div>
          <div>
            <Link href={"/connect"}>

              <button className={styles.botao}>Sign up free<span>&rarr;</span></button>

            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}