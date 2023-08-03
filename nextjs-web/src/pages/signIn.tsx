import styles from '../styles/SignUp.module.css';
import '../styles/globals.css';
import ButtonLoginGoogle from "@/components/ButtonLoginGoogle";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function signUp() {
  if (typeof window !== 'undefined') {
    // Perform localStorage action
    localStorage.getItem('_SESSIONID')
  }
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [errors, setErrors] = useState<string[]>([]);

  const handleSignUp = async () => {
    try {
      // Fazer a requisição POST para o servidor com os dados do formulário
      const response = await axios.post('http://localhost:3001/users/', {
        name,
        email,
        password,
      });
      console.log('Dados enviados:', { name, email, password });

      // A partir daqui, você pode tratar a resposta do servidor
      console.log('Resposta do servidor:', response.data);
      router.push({
        pathname: '/login',
        query: { email },
      });
    } catch (err: any) {
      // Se ocorrer um erro, definir a mensagem de erro para mostrar ao usuário
      if (err.response?.data?.message) {
        const messages = err.response.data.message.toString().split(',');
        setErrors(messages);
      } else {
        setErrors(['Erro desconhecido']);
      }
    }
  };
  return (
    <div>
       <div className={styles.div}>
      <div>
        <h1>Create your account</h1>
        <input
          type="text"
          placeholder="Email address"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Username"
          className={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.length > 0 && (
          <div className={styles.errors}>
            {errors.map((error, index) => (
              <div key={index}>{error.charAt(0).toUpperCase() + error.slice(1)}</div>
            ))}
          </div>
        )}
        <p>
          <button className={styles.botaoContinue} onClick={handleSignUp}>
            Sign in
          </button>
        </p>
        <p>
          Already have an account? <span className={styles.span}><Link href={"/login"}>Log In</Link></span>
        </p>
        <p>------------------OR------------------</p>
        <ButtonLoginGoogle/>
      </div>
    </div>
    </div>
  )
}