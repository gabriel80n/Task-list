import Link from 'next/link'
import styles from '../styles/ButtonSignIn.module.css'

export default function ButtonSignIn() {
  return (
    <Link href={"/signIn"}>
      <button className={styles.botao}>Sign up free<span>&rarr;</span></button>
    </Link>
  )
}