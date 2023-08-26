import Modal from 'react-modal';
import styles from '../styles/ModalEditTask.module.css';
import getEmailFromToken from '@/dataFunctions/getEmailFromToken';
import getUsernameFromToken from '@/dataFunctions/getUsernameFromToken';
import { useEffect, useState } from 'react';
import EditableDescription from './EditableDescription'; // Importar o novo componente

interface CustomModalProps {
  isOpen: boolean;
  closeModal: () => void;
  title: string;
  status: string;
  description: string;
  taskId: string;
}

export default function ModalEditTask({
  isOpen,
  closeModal,
  title,
  status,
  description,
  taskId
}: CustomModalProps) {
  const [jwtToken, setJwtToken] = useState('');
  const [editedDescription, setEditedDescription] = useState(''); // Estado para o conteúdo editado da descrição
  useEffect(() => {
    // Definir o valor inicial do estado quando a prop description mudar
    setEditedDescription(description);
  }, [description]);
  useEffect(() => {
    const token = localStorage.getItem('_SESSIONID');
    setJwtToken(token || '');
  }, []);
  const username = jwtToken ? getUsernameFromToken(jwtToken) : null;
  const email = jwtToken ? getEmailFromToken(jwtToken) : null;

  let primeiraLetra = '';
  if (typeof username === 'string') {
    primeiraLetra = username[0] + username[1].toUpperCase();
  }
  
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Modals"
      className={styles.content}
      overlayClassName={styles.overlay}
    >
      <div className={styles.modal}>
        <h1>{title}</h1>
        <p className={styles.subTitulo}>na Lista {status}</p>
        <div>
          <h2>Descrição</h2>
        </div>
        <div className={styles.conteudo}>
          {/* Use o componente EditableDescription para tornar a descrição editável */}
          <EditableDescription
            content={editedDescription} // Passar o conteúdo editado
            onEdit={(newContent) => setEditedDescription(newContent)} // Atualizar o estado ao editar
            taskId={taskId}
            jwtToken={jwtToken}
          />
        </div>
        <div className={styles.comentario}>
          <div className={styles.divFoto}>
            <div className={styles.fotoComentario}>{primeiraLetra}</div>
          </div>
          <textarea
            maxLength={120}
            rows={3}
            cols={50}
            placeholder="Digite um comentário..."
            className={styles.inputComentario}
          ></textarea>
        </div>
      </div>
    </Modal>
  );
}