import Navbar from '@/components/Navbar';
import styles from '../styles/Navbar.module.css'
import '../styles/globals.css';

export default function Home () {
  return (
    <>
    <header>
      <Navbar/>
    </header>
    <main className={styles.main}>
      <section>
      </section>
    </main>
    </>
  )
}