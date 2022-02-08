import React, { FunctionComponent } from 'react';
import { Container, Text } from '@chakra-ui/react';

const NotFoundPage: FunctionComponent = () => {
    return (
        <Container maxW="container.sm">
            <Text>Page not found!</Text>
        </Container>
    );
};

export default NotFoundPage;
