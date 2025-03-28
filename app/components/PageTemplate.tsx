import AppLayout from './AppLayout';
import { Box, Container, Heading, Text } from '@chakra-ui/react';

interface PageProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

export default function PageTemplate({ title, description, children }: PageProps) {
  return (
    <AppLayout>
      <Container maxW="container.xl" py={12}>
        <Box>
          {title && (
            <Heading as="h1" size="2xl" mb={6} textAlign="center">
              {title}
            </Heading>
          )}
          {description && (
            <Text fontSize="lg" color="gray.600" mb={8}>
              {description}
            </Text>
          )}
          {children}
        </Box>
      </Container>
    </AppLayout>
  );
}
