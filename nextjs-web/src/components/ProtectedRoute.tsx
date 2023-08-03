import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import LoginPage from "../pages/login"; // Importe a página de login (crie o arquivo se ainda não existir)
import axios from "axios";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verifica o estado de autenticação do usuário

  const verify = async () => {
    // Coloque sua lógica para verificar se o usuário está logado aqui
    // Por exemplo, você pode verificar o token de autenticação ou outras informações de autenticação armazenadas no localStorage
    const jwtToken = localStorage.getItem("_SESSIONID"); // Exemplo: verificação de token no localStorage
    try {
      const response = await axios.get('http://localhost:3001/route/verify', {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        }});
      if (response) {
        setIsAuthenticated(true);
      }
      else
        setIsAuthenticated(false);
    } catch (error) {
      console.error('Erro ao deletar o projeto:', error);
      setIsAuthenticated(false);
      router.replace("/login");
    }
    if (jwtToken) {

    } else {
      setIsAuthenticated(false);
      router.replace("/login"); // Redireciona para a página de login caso não esteja autenticado
    }
  }
  useEffect(() => {
    verify();
  }, []);

  return isAuthenticated ? <>{children}</> : <LoginPage />;
}