import SideBar from "@/components/SideBar";
import '../styles/globals.css';
import styles from '../styles/MainPage.module.css'
import { useEffect, useState } from "react";
import CustomModal from "@/components/ModalCreateProject";
import Link from "next/link";
import getUsernameFromToken from "@/dataFunctions/getUsernameFromToken";
import getEmailFromToken from "@/dataFunctions/getEmailFromToken";
import ProtectedRoute from "../components/ProtectedRoute";
import handleDeleteProject from "@/dataFunctions/handleDeleteProject";
import { fetchProjects } from "@/dataFunctions/fetchProjects";
import handleUpdateProject from "@/dataFunctions/handleUpdateProject";

interface Projects {
  id: number;
  name: string;
  createdIn: string;
}

export function Page() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState<Projects[]>([]);
  const [jwtToken, setJwtToken] = useState('')
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [isCheckBoxChecked, setIsCheckBoxChecked] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<number | null>(null);
  const [newProjectName, setNewProjectName] = useState("");
  const [isEditting, setIsEditting] = useState(false);
  // Verifica se está no lado do cliente e pega o valor do token
  useEffect(() => {
    const token = localStorage.getItem('_SESSIONID');
    setJwtToken(token || '')
  }, []);
//---------------------------------------------------------------------------------------------------------------------
  // obter o username e email do token
  const username = jwtToken ? getUsernameFromToken(jwtToken) : null;
  const email = jwtToken ? getEmailFromToken(jwtToken) : null;
//---------------------------------------------------------------------------------------------------------------------
  // Função assíncrona para buscar os projetos do usuário
  useEffect(() => {
    if (jwtToken) {
      fetchProjects(jwtToken, email)
        .then((data) => setProjects(data))
        .catch((error) => console.error("Erro ao buscar projetos:", error));
    }
  }, [jwtToken]);
//---------------------------------------------------------------------------------------------------------------------
// Delete a project
  const updateMainPageState = (isChecked: boolean) => {
    setIsCheckBoxChecked(isChecked);
  };
  const deleteProject = () => {
    handleDeleteProject(updateMainPageState,{jwtToken, selectedProjectId, email})
  }

//---------------------------------------------------------------------------------------------------------------------
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

          {projects.map((project) => ( // Cria dinamicamente os projetos nas paginas
            <div key={project.id} className={`${styles.projectDiv} ${selectedProjectId === project.id ? styles.editting : ""}`}>
              <input
                type="checkbox"
                className={styles.checkbox}
                onChange={(e) => {
                  setIsCheckBoxChecked(e.target.checked); // True se a checkbox estiver selecionada
                  setSelectedProjectId(e.target.checked ? project.id : null); // Pega o id do projeto selecionado
                  setEditingProjectId(null); // Reseta o valor do id do projeto que esta sendo editado caso alguma outra checkbox seja selecionada ao editar
                  setIsEditting(false); // Cancela a edição caso outra checkbox seja selecionada
                  if (e.target.checked) {
                    setNewProjectName(project.name); 
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
                        onClick={deleteProject}
                        className={`${styles.deleteButton} ${isCheckBoxChecked && !isEditting ? styles.show : styles.hide} ${selectedProjectId === project.id ? styles.editting : ""}`}
                      >
                        <img className={styles.img } src="/icons/delete.png" alt="" />
                      </button>
                      <button
                        onClick={() => {
                          if (editingProjectId === project.id) {
                            // Perform the update with the new project name
                            handleUpdateProject(project.id, newProjectName, email, jwtToken );
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

export default function mainPage() {
  return (
    <ProtectedRoute>
      <Page />
    </ProtectedRoute>
  );
}