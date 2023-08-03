// CallbackPage.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const CallbackPage = () => {
  const router = useRouter();
  const { token } = router.query;

  useEffect(() => {
    // Verifica se o token existe e não é undefined
    if (typeof token === 'string') {
      // Armazene o token JWT no localStorage ou em outro mecanismo de armazenamento local
      localStorage.setItem('_SESSIONID', token);

      // Redirecione o usuário para a página desejada no frontend (por exemplo, a MainPage)
      router.push('/mainPage');
    } else {
      // Trate o caso em que o token é undefined (por exemplo, exiba uma mensagem de erro)
      console.error('Token not found in the query string');
    }
  }, [token, router]);

  return (
    <div>
      <p>Carregando...</p>
    </div>
  );
};

export default CallbackPage;





