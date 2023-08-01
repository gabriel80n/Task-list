import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import styles from '../styles/ModalCreateProject.module.css'
import getEmailFromToken from '@/dataFunctions/getEmailFromToken';
import handleCreateProject from '@/dataFunctions/handleCreateProject';


interface CustomModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

export default function CustomModal({ isOpen, closeModal}: CustomModalProps) {
  Modal.setAppElement('#__next');
  const [projectName, setProjectName] = React.useState('');
  const [jwtToken, setJwtToken] = useState('')
  const email = jwtToken ? getEmailFromToken(jwtToken) : null;

  useEffect(() => {
    const token = localStorage.getItem('_SESSIONID');
    setJwtToken(token || '')
  }, []);

  const createProject = () => {
    handleCreateProject({projectName, email, jwtToken});
    closeModal();
  }
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Modal"
      className={styles.content}
      overlayClassName={styles.overlay}
    >
      <div className={styles.modal}>
        <h1>Criar Projeto</h1>
        <p>Nome do projeto</p>
        <input
          type="text"
          placeholder="Digite o nome do projeto"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
        <div>
          <a onClick={closeModal}><img src="/icons/excluir.png" alt="" /> </a>
          <div>
            <button onClick={closeModal}>Cancelar</button>
            <button onClick={createProject}>Criar</button>
          </div>
        </div>
      </div>
    </Modal>
  );
};