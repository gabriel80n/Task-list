import styles from '../styles/SignUp.module.css'
import '../styles/globals.css';

export default function SignUp() {
  return (
    <div className={styles.div}>
      <div>
        <h1>Create your account</h1>
        <input type="text" placeholder="Email adress" className={styles.input}/>
        <p><button className={styles.botaoContinue}>Continue</button></p>
        <p>Already have an account? <span className={styles.span}>Log in</span></p>
        <p>------------------OR------------------</p>
        <button className={styles.botaoGoogle}><img src="/imagens/google (2).png" alt="" />  Continue with google</button>
      </div>
    </div>

  )
}