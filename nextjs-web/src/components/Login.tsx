import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/SignUp.module.css';
import '../styles/globals.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import jwt_decode from 'jsonwebtoken';
//localStorage.setItem('_SESSIONID', jwtToken);
export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Recuperar o email da URL e preenchê-lo no input
  useEffect(() => {
    const { email: urlEmail } = router.query;
    if (urlEmail) {
      setEmail(urlEmail.toString());
    }
  }, [router.query]);


  // Fazer a requisição POST para o servidor com os dados do formulário
  const handleSLogin = async () => {
    try {
      console.log('Dados enviados:', { email, password });
      const response = await axios.post('http://localhost:3001/login/', {
        email,
        password,
      });
      const jwtToken = response.data.access_token;
      localStorage.setItem('_SESSIONID', jwtToken);
      // A partir daqui, você pode tratar a resposta do servidor
      console.log('Resposta do servidor:', response.data);
      console.log('Token:', jwtToken);
      window.location.href = '/mainPage';
    } catch (error) {
      console.error('Erro ao fazer a requisição:', error);
    }
  };


  return (
    <div className={styles.div}>
      <div>
        <h1>Log in</h1>
        <input
          type="text"
          placeholder="Email address"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p>
          <button className={styles.botaoContinue} onClick={handleSLogin}>
            Login
          </button>
        </p>
        <p>
          Don't have an account? <span className={styles.span}><Link href={"/signIn"}>Sign In</Link></span>
        </p>
        <p>------------------OR------------------</p>
        <button className={styles.botaoGoogle}>
          <img src="/imagens/google (2).png" alt="" /> Continue with google 
        </button>
      </div>
    </div>
  );
}

function setLoading(arg0: boolean) {
  throw new Error('Function not implemented.');
}
function setData(data: any) {
  throw new Error('Function not implemented.');
}

