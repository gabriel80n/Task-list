import jwt_decode from 'jwt-decode';
import { JwtPayload } from "@/models/JwtPayload";
export default function getUsernameFromToken(token: string) {
  try {
    // Decodifica o token JWT
    const decodedToken = jwt_decode<JwtPayload>(token);
    // Acesse o username do payload do token
    return decodedToken.name;
  } catch (error) {
    console.error('Erro ao decodificar o token:', error);
    return null;
  }
};