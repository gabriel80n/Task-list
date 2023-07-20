import styles from '../styles/Navbar.module.css'
import '../styles/globals.css'
export default function Navbar() {
  return (
    <nav>
      <div className={styles.navbarLogo}>
        <div className={`${styles.logo}`} ><a href="/">Task</a></div>
        <div className={styles.navbarOthers}>
          <div ><a href="/">Contact</a></div>
          <div ><a href="/">Login</a></div>
          <div><button className={styles.botao}>Sing up free</button></div>
        </div>
      </div>
    </nav>
  )
}