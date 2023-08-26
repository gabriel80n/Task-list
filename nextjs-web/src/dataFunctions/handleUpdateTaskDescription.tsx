import axios from "axios";

export default async function handleUpdateTaskDescription(taskId: string, description: string, jwtToken: string) {
  try {
    await axios.put(
      'http://localhost:3001/tasks/description/' + `${taskId}`,
      {
        description: description,
      },
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );
    window.location.reload();
  } catch (error) {
    console.error('Erro ao atualizar a task:', error);
    // Lógica para tratar erros, se necessário
  }

}