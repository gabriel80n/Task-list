import SideBar from "@/components/SideBar";
import getUsernameFromToken from "@/dataFunctions/getUsernameFromToken";
import { useEffect, useState } from "react";
import '../styles/globals.css';
import styles from '../styles/tasksPage.module.css'

export default function tasksPage() {
  const [jwtToken, setJwtToken] = useState('')
  useEffect(() => {
    const token = localStorage.getItem('_SESSIONID');
    setJwtToken(token || '')
  }, []);
  const username = jwtToken ? getUsernameFromToken(jwtToken) : null;
  return (
    <div className={styles.initialPagePrincipalDiv}>
      <SideBar mensagem={username} />
      <main className={styles.main}>
        <div className={styles.title}>
          <h1>Tasks</h1>
          <div className={styles.divButtonNewProject}><button className={styles.buttonNewProject} >New Task</button></div>
        </div>
        <div className={styles.divAllProjects}>
        </div>
      </main>
    </div>
  )
}