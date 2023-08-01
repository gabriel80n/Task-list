import axios from "axios";
import { fetchProjects } from "./fetchProjects";



export default async function handleUpdateProject(projectId: number, newName: string, email: string | null, jwtToken: string) {
  try {
    await axios.put(
      'http://localhost:3001/projects',
      {
        project_id: projectId,
        name: newName,
        email: email,
      },
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );

    // Fetch projects again to get the updated data
    fetchProjects(jwtToken,email);
    window.location.reload();
  } catch (error) {
    console.error('Erro ao atualizar o projeto:', error);
    // Lógica para tratar erros, se necessário
  }
}