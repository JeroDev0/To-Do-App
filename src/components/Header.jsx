import { Box, Flex, Text } from '@chakra-ui/react';

const Header = () => (
  <Box bg="teal.500" color="white" py={4} width="100%" position="fixed" top={0} zIndex={10}>
    <Flex justify="center">
      <Text fontSize="xl">Lista de Tareas</Text>
    </Flex>
  </Box>
);

export default Header;