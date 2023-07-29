import SideBar from "@/components/SideBar";
import '../styles/globals.css';
import styles from '../styles/MainPage.module.css'
import { useEffect, useState } from "react";
import CustomModal from "@/components/ModalCreateProject";
import Link from "next/link";
import getUsernameFromToken from "@/dataFunctions/getUsernameFromToken";
import getEmailFromToken from "@/dataFunctions/getEmailFromToken";
import axios from "axios";

interface Projects {
  id: number;
  name: string;
  createdIn: string;
}

export default function mainPage() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState<Projects[]>([]);
  const [jwtToken, setJwtToken] = useState('')
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);

  // Verifica se está no lado do cliente antes de acessar o localStorage
  useEffect(() => {
    const token = localStorage.getItem('_SESSIONID');
    setJwtToken(token || '')
  }, []);

  // obter o username e email do toke
  const username = jwtToken ? getUsernameFromToken(jwtToken) : null;
  const email = jwtToken ? getEmailFromToken(jwtToken) : null;

  useEffect(() => {
    // Função assíncrona para buscar os projetos do usuário
    async function fetchProjects() {
      try {
        const response = await axios.get<Projects, any>('http://localhost:3001/users/projects/' + `${email}`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        setProjects(response.data);
      } catch (error) {
        console.error('Erro ao buscar projetos:', error);
      }
    }

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
    console.log(selectedProjectId, email,jwtToken)
    await axios.delete('http://localhost:3001/users/projects', {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      data: {
        project_id: selectedProjectId,
        email: email,
      },
    });
  
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
              
              <div key={project.id} className={styles.projectDiv}>

                <input
                  type="checkbox"
                  className={styles.checkbox}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedProjectId(project.id);
                     
                    } else {
                      setSelectedProjectId(null);
                    }
                  }} />
                <Link href={'/mainPage'} className={styles.projectLink}>
                  
                  <div ><span>{project.name}</span><button onClick={handleDeleteProject}>delete</button></div>
                  <div><span>{project.createdIn}</span></div>
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