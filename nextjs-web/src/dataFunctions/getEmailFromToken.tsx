import jwt_decode from 'jwt-decode';
import { JwtPayload } from "@/models/JwtPayload";
export default function getEmailFromToken(token: string) {
  try {
    // Decodifica o token JWT
    const decodedToken = jwt_decode<JwtPayload>(token);
    // Acesse o email do payload do token
    return decodedToken.email;
  } catch (error) {
    console.error('Erro ao decodificar o token:', error);
    return null;
  }
};