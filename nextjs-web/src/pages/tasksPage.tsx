import SideBar from "@/components/SideBar";
import getUsernameFromToken from "@/dataFunctions/getUsernameFromToken";
import { useEffect, useState } from "react";
import '../styles/globals.css';
import styles from '../styles/tasksPage.module.css'
import Link from "next/link";
import { useRouter } from "next/router";
import CustomModal from "@/components/ModalCreateTask";
import Modal from 'react-modal';
import axios from "axios";
import { DragDropContext, Draggable, Droppable, resetServerContext } from "react-beautiful-dnd";

import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {

  resetServerContext()   // <-- CALL RESET SERVER CONTEXT, SERVER SIDE

  return { props: { data: [] } }

}
type Tasks = {
  id: number;
  title: string;
  description: string;
  status: string;
  prioridade: string;
}

export default function tasksPage() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const projectIdFromQuery = router.query.projectId;
  const projectId = Array.isArray(projectIdFromQuery) ? projectIdFromQuery[0] : projectIdFromQuery;
  const projectName = router.query.projectName;
  const [jwtToken, setJwtToken] = useState('')
  const [selectedColumn, setSelectedColumn] = useState('');
  const [planningTasks, setPlanningTasks] = useState<Tasks[]>([]);
  const [todoTasks, setTodoTasks] = useState<Tasks[]>([]);
  const [inProgressTasks, setInProgressTasks] = useState<Tasks[]>([]);
  const [doneTasks, setDoneTasks] = useState<Tasks[]>([]);
  const [project_id, setProject_id] = useState('');


  Modal.setAppElement('#__next');

  useEffect(() => {
    const token = localStorage.getItem('_SESSIONID');
    setJwtToken(token || '')
    if (projectId) {
      localStorage.setItem('projectId', projectId);
    }
    setProject_id(localStorage.getItem('projectId') || '');
  }, []);
  const username = jwtToken ? getUsernameFromToken(jwtToken) : null;

  const fetchTasks = async () => {
    try {
      const response = await axios.get<Tasks, any>("http://localhost:3001/tasks/" + `${project_id}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        }
      })
      // Filtrar as tarefas com status "Planning"
      const planningTasks = response.data.filter((task: { status: string; }) => task.status === "Planning");
      const todoTasks = response.data.filter((task: { status: string; }) => task.status === "To Do");
      const inProgressTasks = response.data.filter((task: { status: string; }) => task.status === "In Progress");
      const doneTasks = response.data.filter((task: { status: string; }) => task.status === "Done");
      // Atualizar o estado da coluna Planning com as tarefas filtradas
      setPlanningTasks(planningTasks);
      setDoneTasks(doneTasks);
      setTodoTasks(todoTasks);
      setInProgressTasks(inProgressTasks);
    } catch (error) {
      console.error('Erro:', error)
    }
  }

  useEffect(() => {
    if (jwtToken) {
      fetchTasks();
    }
  }, [jwtToken]);


  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleAddTaskClick = (columnTitle: string) => {
    setSelectedColumn(columnTitle);
    setIsModalOpen(true);
  };

  // Função auxiliar para obter as tarefas de uma coluna específica
  const getColumnTasks = (columnId: string) => {
    switch (columnId) {
      case "Planning":
        return planningTasks;
      case "To Do":
        return todoTasks;
      case "In Progress":
        return inProgressTasks;
      case "Done":
        return doneTasks;
      default:
        return [];
    }
  };

  // Função auxiliar para atualizar as tarefas de uma coluna específica
  const updateColumnTasks = (columnId: string, updatedTasks: Tasks[]) => {
    switch (columnId) {
      case "Planning":
        setPlanningTasks(updatedTasks);
        break;
      case "To Do":
        setTodoTasks(updatedTasks);
        break;
      case "In Progress":
        setInProgressTasks(updatedTasks);
        break;
      case "Done":
        setDoneTasks(updatedTasks);
        break;
      default:
        break;
    }
  };

  const onDragEnd = async (result: any) => {
    if (!result.destination) {
      console.log("No destination");
      return;
    }


    const sourceColumnId = result.source.droppableId;
    const destinationColumnId = result.destination.droppableId.toString();;

    // Verifica se a tarefa foi arrastada para uma coluna diferente
    if (sourceColumnId !== destinationColumnId) {
      const taskToMove = getColumnTasks(sourceColumnId)[result.source.index];
      // Remove a tarefa da coluna de origem
      const updatedSourceTasks = getColumnTasks(sourceColumnId).filter(
        (_, index) => index !== result.source.index
      );
      updateColumnTasks(sourceColumnId, updatedSourceTasks);
      // Adiciona a tarefa na coluna de destino
      const updatedDestinationTasks = [...getColumnTasks(destinationColumnId)];
      updatedDestinationTasks.splice(result.destination.index, 0, taskToMove);
      updateColumnTasks(destinationColumnId, updatedDestinationTasks);

      // Atualiza o status da tarefa no backend

      try {
        await axios.put(
          `http://localhost:3001/tasks/${taskToMove.id}`,
          { status: destinationColumnId },
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );
      } catch (error) {
        console.error('Erro ao atualizar o status da tarefa:', error);
        // Desfazer a mudança no frontend em caso de erro
        updateColumnTasks(sourceColumnId, [...updatedSourceTasks, taskToMove]);
        updateColumnTasks(destinationColumnId, updatedDestinationTasks.filter((_, index) => index !== result.destination.index));
      }
    }
  };


  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={styles.initialPagePrincipalDiv}>
        <SideBar mensagem={username} />
        <main className={styles.main}>
          <div className={styles.title}>
            <div>
              <Link href='/mainPage'><img className={styles.imgGoBack} src="/icons/voltar.png" alt="voltar" /></Link>
            </div>
            <div className={styles.tittleNameButton}>
              <div className={styles.projectName}><h1 >{projectName}</h1></div>

            </div>
          </div>
          <div className={styles.mainTasks}>
            <div className={styles.taskColumn}>
              <div className={styles.columnTittle}>
                <div>Planning</div>
                <img onClick={() => {
                  handleAddTaskClick('Planning')
                    ; handleOpenModal
                }} src="/icons/adicionar.png" alt="" />
              </div>

              <Droppable droppableId="Planning" key="Planning">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {planningTasks.map((task, index) => (
                      <Draggable key={task.id} draggableId={`task-${task.id}`} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={styles.task}
                          >

                            <div className={`${styles.taskPrioridade} ${task.prioridade === 'low' ? styles.green : ''} ${task.prioridade === 'medium' ? styles.yellow : ''} ${task.prioridade === 'high' ? styles.red : ''}`}></div>
                            <div className={styles.taskContent}>
                              <div className={styles.taskTittle}>{task.title}</div>
                              <div className={styles.taskDescrition}>{task.description}</div>
                            </div>

                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>

            </div>
            <div className={styles.taskColumn}>
              <div className={styles.columnTittle}>
                <div>To Do</div>
                <img onClick={() => {
                  handleAddTaskClick('To Do')
                    ; handleOpenModal
                }} src="/icons/adicionar.png" alt="" />
              </div>

              <Droppable droppableId="To Do" key="To Do">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {todoTasks.map((task, index) => (
                      <Draggable key={task.id} draggableId={`task-${task.id}`} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={styles.task}
                          >

                            <div className={`${styles.taskPrioridade} ${task.prioridade === 'low' ? styles.green : ''} ${task.prioridade === 'medium' ? styles.yellow : ''} ${task.prioridade === 'high' ? styles.red : ''}`}></div>
                            <div className={styles.taskContent}>
                              <div className={styles.taskTittle}>{task.title}</div>
                              <div className={styles.taskDescrition}>{task.description}</div>
                            </div>

                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>

            </div>
            <div className={styles.taskColumn}>
              <div className={styles.columnTittle}>
                <div>In Progress</div>
                <img onClick={() => {
                  handleAddTaskClick('In Progress')
                    ; handleOpenModal
                }} src="/icons/adicionar.png" alt="" />
              </div>

              <Droppable droppableId="In Progress" key="In Progress">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {inProgressTasks.map((task, index) => (
                      <Draggable key={task.id} draggableId={`task-${task.id}`} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={styles.task}
                          >

                            <div className={`${styles.taskPrioridade} ${task.prioridade === 'low' ? styles.green : ''} ${task.prioridade === 'medium' ? styles.yellow : ''} ${task.prioridade === 'high' ? styles.red : ''}`}></div>
                            <div className={styles.taskContent}>
                              <div className={styles.taskTittle}>{task.title}</div>
                              <div className={styles.taskDescrition}>{task.description}</div>
                            </div>

                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>

            </div>
            <div className={styles.taskColumn}>
              <div className={styles.columnTittle}>
                <div>Done</div>
                <img onClick={() => {
                  handleAddTaskClick('Done')
                    ; handleOpenModal
                }} src="/icons/adicionar.png" alt="" />
              </div>

              <Droppable droppableId="Done" key="Done">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {doneTasks.map((task, index) => (
                      <Draggable key={task.id} draggableId={`task-${task.id}`} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={styles.task}
                          >

                            <div className={`${styles.taskPrioridade} ${task.prioridade === 'low' ? styles.green : ''} ${task.prioridade === 'medium' ? styles.yellow : ''} ${task.prioridade === 'high' ? styles.red : ''}`}></div>
                            <div className={styles.taskContent}>
                              <div className={styles.taskTittle}>{task.title}</div>
                              <div className={styles.taskDescrition}>{task.description}</div>
                            </div>

                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>

            </div>
          </div>
        </main>
        <CustomModal
          isOpen={isModalOpen}
          closeModal={handleCloseModal}
          projectId={projectId}
          status={selectedColumn}
        />
      </div>
    </DragDropContext>
  )
}