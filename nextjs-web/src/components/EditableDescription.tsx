import React, { useState } from 'react';
import styles from '../styles/EditableDescription.module.css'
import handleUpdateTaskDescription from '@/dataFunctions/handleUpdateTaskDescription';
interface EditableDescriptionProps {
  content: string;
  onEdit: (newContent: string) => void; // Adicionar propriedade onEdit
  taskId: string;
  jwtToken: string
}

const EditableDescription: React.FC<EditableDescriptionProps> = ({
  content,
  onEdit,
  taskId,
  jwtToken
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setEditedContent(content); // Definir o conteúdo existente ao entrar no modo de edição
    }
  };

  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedContent(event.target.value);
  };

  const handleSave = async () => {
    await handleUpdateTaskDescription(taskId, editedContent, jwtToken);
    onEdit(editedContent); // Chamar a função onEdit para atualizar o conteúdo
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <textarea
          value={editedContent} // Usar editedContent aqui
          onChange={handleContentChange}
          onBlur={handleSave}
          className={styles.textarea}
          rows={3}
          maxLength={100}
        />
      ) : (
        <p onClick={handleEditToggle} className={styles.description}>{content}</p>
      )}
    </div>
  );
};

export default EditableDescription;
