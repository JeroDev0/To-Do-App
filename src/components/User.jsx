import { Box, Text, Button } from '@chakra-ui/react';

const User = ({ user, setUser, setView }) => {
  const handleLogout = () => {
    setUser(null);
    setView('auth');
  };

  return (
    <Box
      p={4}
      maxW="md"
      mx="auto"
      mt={10}
      minH="calc(80vh - 60px)"  // Ajuste para tener espacio suficiente arriba del footer
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Box flex="1"> {/* Usamos flex="1" para que el contenido principal ocupe el espacio disponible */}
        <Text fontSize="xl" mb={4}>Información del Usuario</Text>
        <Text>Nombre de usuario: {user}</Text>
        <Button mt={4} onClick={handleLogout}>Cerrar Sesión</Button>
      </Box>
      
      {/* Pie de página */}
      <Box textAlign="center" py={2} borderTop="1px" borderColor="gray.200">
        <Text fontSize="sm" color="gray.500">Desarrollado por JeroDev</Text>
      </Box>
    </Box>
  );
};

export default User;
