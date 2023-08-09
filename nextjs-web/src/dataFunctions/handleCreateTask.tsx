import axios from "axios"

type createTask = {
  title: string,
  description: string,
  priority: string,
  status: string,
  jwtToken: string,
  projectId: string | string[] | undefined;

}

export default async function handleCreateTask({title, description, priority, status, jwtToken, projectId}: createTask ) {

  try {
    await axios.post('http://localhost:3001/tasks', {
      title: title,
      description: description,
      priority: priority,
      projectId: projectId,
      status: status

    },{
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      }
    })
    window.location.reload();
  } catch (error) {
    
    console.error('Erro ao criar a task:', error);
  }
}