import React, { useState, useEffect } from 'react';
import { Box, Text, Checkbox, IconButton, Input, Button } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';

const TaskList = ({ setSelectedTask, setView }) => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [newTaskText, setNewTaskText] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTaskText.trim() !== '') {
      const newTask = { id: Date.now(), text: newTaskText, completed: false };
      setTasks(prevTasks => [...prevTasks, newTask]);
      setNewTaskText('');
    }
  };

  const toggleTaskCompletion = (id) => {
    setTasks(prevTasks => prevTasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  const editTask = (task) => {
    setSelectedTask(task);
    setView('editTask');
  };

  return (
    <Box p={4}>
      <Box mb={4}>
        <Input 
          placeholder="Nueva tarea" 
          value={newTaskText} 
          onChange={(e) => setNewTaskText(e.target.value)} 
          maxLength={40} 
          mb={2}
        />
        <Button onClick={addTask}>Agregar Tarea</Button>
      </Box>

      {tasks.length === 0 ? (
        <Text>No hay tareas</Text>
      ) : (
        tasks.map(task => (
          <Box
            key={task.id}
            display="flex"
            alignItems="center"
            mb={2}
            p={3}
            borderWidth="1px"
            borderRadius="md"
            borderColor="gray.300"
            boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)"
            _last={{ mb: 0 }}
          >
            <Checkbox
              isChecked={task.completed}
              onChange={() => toggleTaskCompletion(task.id)}
              mr={2}
            />
            <Text flex="1" as={task.completed ? 'del' : undefined}>
              {task.text}
            </Text>
            <IconButton
              icon={<EditIcon />}
              onClick={() => editTask(task)}
              mr={2}
              variant="outline"
              colorScheme="blue"
            />
            <IconButton
              icon={<DeleteIcon />}
              onClick={() => deleteTask(task.id)}
              variant="outline"
              colorScheme="red"
            />
          </Box>
        ))
      )}
    </Box>
  );
};

export default TaskList;