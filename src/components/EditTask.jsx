import { Box, Input, Button } from '@chakra-ui/react';
import { useState } from 'react';

const EditTask = ({ task, updateTask }) => {
  const [newText, setNewText] = useState(task.text);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newText) {
      updateTask(task.id, newText);
    }
  };

  return (
    <Box p={4}>
      <form onSubmit={handleSubmit}>
        <Input
          placeholder="Editar tarea"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          maxLength={40}
          mb={4}
        />
        <Button type="submit">Actualizar Tarea</Button>
      </form>
    </Box>
  );
};

export default EditTask;