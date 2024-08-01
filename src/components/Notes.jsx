import { useState } from 'react';
import { Box, Text, Input, Button, List, ListItem, IconButton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Textarea } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';

const Notes = ({ notes, setNotes }) => {
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (index) => {
    if (index !== undefined) {
      setNewNoteTitle(notes[index].title);
      setNewNoteContent(notes[index].content);
      setEditingIndex(index);
    } else {
      setNewNoteTitle('');
      setNewNoteContent('');
      setEditingIndex(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addOrUpdateNote = () => {
    if (newNoteTitle.trim() === '' || newNoteContent.trim() === '') return;

    if (editingIndex !== null) {
      const updatedNotes = [...notes];
      updatedNotes[editingIndex] = { title: newNoteTitle, content: newNoteContent };
      setNotes(updatedNotes);
    } else {
      setNotes([...notes, { title: newNoteTitle, content: newNoteContent }]);
    }

    closeModal();
  };

  const deleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
    if (editingIndex === index) {
      setEditingIndex(null);
      setNewNoteTitle('');
      setNewNoteContent('');
    }
  };

  return (
    <Box p={4} maxW="md" mx="auto">
      <Text fontSize="xl" mb={4}>Notas</Text>
      <Button onClick={() => openModal()} mb={4}>
        Crear Nota
      </Button>
      <List spacing={3}>
        {notes.map((note, index) => (
          <ListItem 
            key={index} 
            display="flex" 
            alignItems="center" 
            justifyContent="space-between" 
            border="1px solid" 
            borderColor="gray.300" 
            p={2}
            borderRadius="md"
            mb={2}
          >
            <Text flex="1" fontWeight="bold">{note.title}</Text>
            <Box>
              <IconButton
                aria-label="Editar Nota"
                icon={<EditIcon />}
                onClick={() => openModal(index)}
                mr={2}
              />
              <IconButton
                aria-label="Eliminar Nota"
                icon={<DeleteIcon />}
                onClick={() => deleteNote(index)}
                colorScheme="red"
              />
            </Box>
          </ListItem>
        ))}
      </List>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editingIndex !== null ? 'Editar Nota' : 'Nueva Nota'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              value={newNoteTitle}
              onChange={(e) => setNewNoteTitle(e.target.value)}
              placeholder="Título de la nota"
              mb={2}
            />
            <Textarea
              value={newNoteContent}
              onChange={(e) => setNewNoteContent(e.target.value)}
              placeholder="Contenido de la nota"
              mb={2}
              height="200px"
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={addOrUpdateNote}>
              Guardar
            </Button>
            <Button variant="outline" onClick={closeModal}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Notes;
