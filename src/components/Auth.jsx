import { Box, Input, Button, FormControl, FormLabel, Heading } from '@chakra-ui/react';
import { useState } from 'react';

const Auth = ({ setUser, setView }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = () => {
    if (isRegistering) {
      // Registrar usuario
      localStorage.setItem(username, password);
      alert('Usuario registrado con éxito!');
      setIsRegistering(false);
    } else {
      // Iniciar sesión
      const storedPassword = localStorage.getItem(username);
      if (storedPassword === password) {
        setUser(username);
        setView('taskList');
      } else {
        alert('Credenciales incorrectas!');
      }
    }
  };

  return (
    <Box p={4} maxW="md" mx="auto" mt={10}>
      <Heading mb={6}>{isRegistering ? 'Registrar' : 'Iniciar Sesión'}</Heading>
      <FormControl id="username" mb={4}>
        <FormLabel>Nombre de usuario</FormLabel>
        <Input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" mb={6}>
        <FormLabel>Contraseña</FormLabel>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>
      <Button onClick={handleAuth} mb={4}>
        {isRegistering ? 'Registrar' : 'Iniciar Sesión'}
      </Button>
      <Button variant="link" onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering ? '¿Ya tienes una cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
      </Button>
    </Box>
  );
};

export default Auth;
