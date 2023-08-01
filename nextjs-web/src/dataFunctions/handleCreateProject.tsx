import axios from "axios";

type handleCreateProjectTypes = {
  projectName: string,
  email: string | null,
  jwtToken: string
}

export default async function handleCreateProject({projectName, email, jwtToken}: handleCreateProjectTypes) {
  try {
    // Fazer a requisição para o backend
    await axios.post('http://localhost:3001/projects', {
      name: projectName,
      email: email
    }, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      }
    });
    window.location.reload();
  } catch (error) {
    console.error('Erro ao criar o projeto:', error);
    // Lógica para tratar erros, se necessário
  }
};

