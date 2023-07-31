import SideBar from "@/components/SideBar";
import '../styles/globals.css';
import styles from '../styles/MainPage.module.css'
import { useEffect, useState } from "react";
import CustomModal from "@/components/ModalCreateProject";
import Link from "next/link";
import getUsernameFromToken from "@/dataFunctions/getUsernameFromToken";
import getEmailFromToken from "@/dataFunctions/getEmailFromToken";
import axios from "axios";
import ProtectedRoute from "./ProtectedRoute";

interface Projects {
  id: number;
  name: string;
  createdIn: string;
}

export function MainPage() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState<Projects[]>([]);
  const [jwtToken, setJwtToken] = useState('')
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [isCheckBoxChecked, setIsCheckBoxChecked] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<number | null>(null);
  const [newProjectName, setNewProjectName] = useState("");
  const [isEditting, setIsEditting] = useState(false);
  // Verifica se está no lado do cliente antes de acessar o localStorage
  useEffect(() => {
    const token = localStorage.getItem('_SESSIONID');
    setJwtToken(token || '')
  }, []);

  // obter o username e email do toke
  const username = jwtToken ? getUsernameFromToken(jwtToken) : null;
  const email = jwtToken ? getEmailFromToken(jwtToken) : null;

  // Função assíncrona para buscar os projetos do usuário
  // Define the fetchProjects function outside the useEffect
  const fetchProjects = async () => {
    try {
      const response = await axios.get<Projects, any>('http://localhost:3001/users/att/projects/' + `${email}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      setProjects(response.data);
    } catch (error) {
      console.error('Erro ao buscar projetos:', error);
    }
  };

  useEffect(() => {
    // Call the fetchProjects function
    if (jwtToken) {
      fetchProjects();
    }
  }, [jwtToken]);

  const [isDeleted, setIsDeleted] = useState(false);
  const handleDeleteProject = async () => {
    try {
      // Fazer a requisição para o backend
      if (!selectedProjectId) {
        // Nenhum projeto selecionado, faça alguma ação ou exiba um aviso
        return;
      }
      await axios.delete('http://localhost:3001/users/att/projects/', {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        data: {
          project_id: selectedProjectId,
          email: email,
        },
      });
      setIsCheckBoxChecked(false);
      setIsDeleted(true);
    } catch (error) {
      console.error('Erro ao deletar o projeto:', error);
      // Lógica para tratar erros, se necessário
    }
  };
  // UseEffect to reload the page when a project is deleted
  useEffect(() => {
    if (isDeleted) {
      window.location.reload();
    }
  }, [isDeleted]);

  const handleUpdateProject = async (projectId: number, newName: string) => {
    try {
      await axios.put(
        'http://localhost:3001/users/att/projects',
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
      fetchProjects();
      window.location.reload();
    } catch (error) {
      console.error('Erro ao atualizar o projeto:', error);
      // Lógica para tratar erros, se necessário
    }
  };

  //Lida com o modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  //Cria dinâmicamente as divs com os projetos



  return (
    <div className={styles.initialPagePrincipalDiv}>
      <SideBar mensagem={username} />
      <main className={styles.main}>
        <div className={styles.title}>
          <h1>Projects</h1>
          <div className={styles.divButtonNewProject}><button className={styles.buttonNewProject} onClick={handleOpenModal}>New Project</button></div>
        </div>
        <div className={styles.divAllProjects}>
        <div className={styles.projectList}>
          <h2>All projects</h2>

          {projects.map((project) => (
            <div key={project.id} className={`${styles.projectDiv} ${selectedProjectId === project.id ? styles.editting : ""}`}>
              <input
                type="checkbox"
                className={styles.checkbox}
                onChange={(e) => {
                  setIsCheckBoxChecked(e.target.checked);
                  setSelectedProjectId(e.target.checked ? project.id : null);
                  setEditingProjectId(null);
                  setIsEditting(false);
                  if (e.target.checked) {
                    setNewProjectName(project.name); // Set the initial value for the input
                  }
                }}
                checked={selectedProjectId === project.id}
              />
              <Link href={"/mainPage"} className={styles.projectLink}>
                <div>
                  {editingProjectId === project.id ? (
                    <input
                      type="text"
                      className={styles.editInput}
                      value={newProjectName}
                      onChange={(e) => setNewProjectName(e.target.value)}
                    />
                  ) : (
                    <span>{project.name}</span>
                  )}
                </div>
                <div>
                  {selectedProjectId === project.id && (
                    <>
                      <button
                        onClick={handleDeleteProject}
                        className={`${styles.deleteButton} ${isCheckBoxChecked && !isEditting ? styles.show : styles.hide} ${selectedProjectId === project.id ? styles.editting : ""}`}
                      >
                        <img className={styles.img } src="/icons/delete.png" alt="" />
                      </button>
                      <button
                        onClick={() => {
                          if (editingProjectId === project.id) {
                            // Perform the update with the new project name
                            handleUpdateProject(project.id, newProjectName);
                            setIsEditting(false);
                          }
                          setIsEditting(true);
                          setEditingProjectId(project.id); // Enter edit mode for this project
                        }}
                        className={`${styles.deleteButton} ${isCheckBoxChecked ? styles.show : styles.hide} ${selectedProjectId === project.id ? styles.editting : ""}`}
                      >
                        {editingProjectId === project.id ? (
                          <img className={styles.img} src="/icons/save.png" alt="Save" />
                        ) : (
                          <img className={styles.img} src="/icons/pencil.png" alt="Edit" />
                        )}
                      </button>
                    </>
                  )}
                  <span className={styles.date}>{project.createdIn}</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
    <CustomModal
      isOpen={isModalOpen}
      closeModal={handleCloseModal}
    />
  </div>
)
}

export default function WrappedMainPage() {
  return (
    <ProtectedRoute>
      <MainPage />
    </ProtectedRoute>
  );
}