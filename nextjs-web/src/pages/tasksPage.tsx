import SideBar from "@/components/SideBar";
import getUsernameFromToken from "@/dataFunctions/getUsernameFromToken";
import { SetStateAction, useEffect, useState } from "react";
import '../styles/globals.css';
import styles from '../styles/tasksPage.module.css'
import Link from "next/link";
import { useRouter } from "next/router";
import CustomModal from "@/components/ModalCreateTask";
import Modal from 'react-modal';
import axios from "axios";
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

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
  const [tasks, setTasks] = useState([]);

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

    }
  }

  useEffect(() => {
    if (jwtToken) {
      fetchTasks();
    }
  }, [jwtToken]);

  const onDragEnd = (result: { source: any; destination: any; }) => {
    const { source, destination } = result;
  
    if (!destination) {
      return;
    }
  
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }
  
    // Here you can update the task's status in your tasks array
    const handleDragEnd = (result: { destination: { index: number; }; source: { index: number; }; }) => {
      if (!result.destination) return;
  
      // Reorganize suas tarefas aqui
      const newTasks = [...tasks];
      const [movedTask] = newTasks.splice(result.source.index, 1);
      newTasks.splice(result.destination.index, 0, movedTask);
      
      setTasks(newTasks);
    };

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

  return (
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
            {planningTasks.map(task => {
              return (
                <div key={task.id} className={styles.task}>
                  <div className={`${styles.taskPrioridade} ${task.prioridade === 'low' ? styles.green : ''} ${task.prioridade === 'medium' ? styles.yellow : ''} ${task.prioridade === 'high' ? styles.red : ''}`}></div>
                  <div className={styles.taskContent}>
                    <div className={styles.taskTittle}>{task.title}</div>
                    <div className={styles.taskDescrition}>{task.description}</div>
                  </div>
                </div>
              )
            })}
          </div>
          <div className={styles.taskColumn}>
            <div className={styles.columnTittle}>
              <div>To Do</div>
              <img onClick={() => {
                handleAddTaskClick('To Do')
                  ; handleOpenModal
              }} src="/icons/adicionar.png" alt="" />
            </div>
            {todoTasks.map(task => (
              <div key={task.id} className={styles.task}>
                <div className={`${styles.taskPrioridade} ${task.prioridade === 'low' ? styles.green : ''} ${task.prioridade === 'medium' ? styles.yellow : ''} ${task.prioridade === 'high' ? styles.red : ''}`}></div>
                <div className={styles.taskContent}>
                  <div className={styles.taskTittle}>{task.title}</div>
                  <div className={styles.taskDescrition}>{task.description}</div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.taskColumn}>
            <div className={styles.columnTittle}>
              <div>In Progress</div>
              <img onClick={() => {
                handleAddTaskClick('In Progress')
                  ; handleOpenModal
              }} src="/icons/adicionar.png" alt="" />
            </div>
            {inProgressTasks.map(task => (
              <div key={task.id} className={styles.task}>
                <div className={`${styles.taskPrioridade} ${task.prioridade === 'low' ? styles.green : ''} ${task.prioridade === 'medium' ? styles.yellow : ''} ${task.prioridade === 'high' ? styles.red : ''}`}></div>
                <div className={styles.taskContent}>
                  <div className={styles.taskTittle}>{task.title}</div>
                  <div className={styles.taskDescrition}>{task.description}</div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.taskColumn}>
            <div className={styles.columnTittle}>
              <div>Done</div>
              <img onClick={() => {
                handleAddTaskClick('Done')
                  ; handleOpenModal
              }} src="/icons/adicionar.png" alt="" />
            </div>
            {doneTasks.map(task => (
              <div key={task.id} className={styles.task}>
                <div className={`${styles.taskPrioridade} ${task.prioridade === 'low' ? styles.green : ''} ${task.prioridade === 'medium' ? styles.yellow : ''} ${task.prioridade === 'high' ? styles.red : ''}`}></div>
                <div className={styles.taskContent}>
                  <div className={styles.taskTittle}>{task.title}</div>
                  <div className={styles.taskDescrition}>{task.description}
                    Priority: {task.prioridade}</div>
                </div>
              </div>
            ))}
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
  )
}