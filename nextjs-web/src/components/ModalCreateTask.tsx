import Modal from 'react-modal';
import styles from '../styles/ModalCreateTask.module.css'
import { useEffect, useState } from 'react';
import handleCreateTask from '@/dataFunctions/handleCreateTask';

interface CustomModalProps {
  isOpen: boolean;
  closeModal: () => void;
  projectId: string | string[] | undefined;
  status: string;
}
export default function ModalCreateTask({ isOpen, closeModal, projectId , status}: CustomModalProps) {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskPriority, setTaskPriority] = useState('low');
  const [jwtToken, setJwtToken] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('_SESSIONID');
    setJwtToken(token || '')
  }, []);

  const createTask = () => {
    handleCreateTask({ title: taskTitle, description: taskDescription, priority: taskPriority, status, jwtToken, projectId });
    closeModal();
  }
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Modals"
        className={styles.content}
        overlayClassName={styles.overlay}
      >
        <h2>New Task</h2>
        
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="title">Title:</label>
            <input className={styles.input}
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              maxLength={20}
              type="text"
              id="title"
              name="title"
              placeholder='Your task title' />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="description">Description:</label>
            <textarea className={styles.textarea}
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              maxLength={100}
              id="description"
              name="description"
              rows={4}
              placeholder='Your task description'></textarea>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Priority:</label>
            <select className={styles.select}
              name="priority"
              value={taskPriority}
              onChange={(e) => setTaskPriority(e.target.value)}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className={styles.buttons}>
            <button className={styles.cancelButton} onClick={closeModal}>Cancel</button>
            <button className={styles.createButton} onClick={createTask}>Create</button>
          </div>
        
      </Modal>
    </div>

  );
};