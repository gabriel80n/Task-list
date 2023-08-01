import axios from "axios";

type handleDeleteProject = {
  jwtToken: string,
  selectedProjectId: number | null,
  email: string | null
}

export default async function handleDeleteProject(updateStateCallback: (isChecked: boolean) => void, {jwtToken, selectedProjectId, email}: handleDeleteProject ) {
  try {
    // Fazer a requisição para o backend
    if (!selectedProjectId) {
      // Nenhum projeto selecionado, faça alguma ação ou exiba um aviso
      return;
    }
    await axios.delete('http://localhost:3001/projects/', {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      data: {
        project_id: selectedProjectId,
        email: email,
      },
    });
    updateStateCallback(false); // Update the state in the MainPage component
    window.location.reload();
  } catch (error) {
    console.error('Erro ao deletar o projeto:', error);
    // Lógica para tratar erros, se necessário
  }
};