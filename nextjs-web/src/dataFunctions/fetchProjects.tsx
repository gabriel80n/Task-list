import axios from "axios";

interface Projects {
  id: number;
  name: string;
  createdIn: string;
}

export const fetchProjects = async (jwtToken: string, email: string | null): Promise<Projects[]> => {
  try {
    const response = await axios.get<Projects, any>("http://localhost:3001/projects/" + `${email}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar projetos:", error);
    throw error; // Rejeita a promessa em caso de erro
  }
};