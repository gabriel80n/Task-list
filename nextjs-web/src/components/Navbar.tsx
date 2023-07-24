import Link from 'next/link'
import styles from '../styles/Navbar.module.css'
import '../styles/globals.css'
import ButtonSignIn from './ButtonSignIn'
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

              <ButtonSignIn/>

            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}