import { Box, List, ListItem, IconButton } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

const CompletedTasks = ({ tasks, setTasks }) => {
  const handleDelete = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <Box p={4}>
      <List spacing={3}>
        {tasks.filter(task => task.completed).map((task, index) => (
          <ListItem key={index}>
            <Box display="flex" justifyContent="space-between">
              <span>{task.text}</span>
              <IconButton
                icon={<DeleteIcon />}
                onClick={() => handleDelete(index)}
                variant="outline"
                colorScheme="red"
              />
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default CompletedTasks;