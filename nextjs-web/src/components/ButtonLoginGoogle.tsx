import styles from '../styles/ButtonLoginGoogle.module.css'

export default function ButtonLoginGoogle() {

  const handleLoginGoogle = async () =>{
    try {
      window.location.href = 'http://localhost:3001/auth/google/login';
      
    } catch (error) {
      console.error('Erro ao criar o projeto:', error);
    }
  }


  return (
    <button className={styles.botaoGoogle} onClick={handleLoginGoogle}>
      <img src="/imagens/google (2).png" alt="" /> Continue with google
    </button>
  )
}