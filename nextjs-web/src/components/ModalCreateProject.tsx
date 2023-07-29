import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import styles from '../styles/ModalCreateProject.module.css'
import axios from 'axios';
import getEmailFromToken from '@/dataFunctions/getEmailFromToken';
import error from 'next/error';


interface CustomModalProps {
  isOpen: boolean;
  closeModal: () => void;
  
}

export default function CustomModal({ isOpen, closeModal}: CustomModalProps) {
  Modal.setAppElement('#__next');
  const [projectName, setProjectName] = React.useState('');
  const [jwtToken, setJwtToken] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('_SESSIONID');
    setJwtToken(token || '')
  }, []);

  const email = jwtToken ? getEmailFromToken(jwtToken) : null;

  const handleCreateProject = async () => {
    try {
      // Fazer a requisição para o backend
      await axios.post('http://localhost:3001/users/projects', {
        name: projectName,
        email: email
      }, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        }
      });
      window.location.reload();
      closeModal();
    } catch (error) {
      console.error('Erro ao criar o projeto:', error);
      // Lógica para tratar erros, se necessário
    }
  };
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
            <button onClick={handleCreateProject}>Criar</button>
          </div>
        </div>
      </div>
    </Modal>
  );
};