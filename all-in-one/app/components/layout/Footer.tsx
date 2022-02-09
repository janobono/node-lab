import React, { FunctionComponent, useEffect, useState } from 'react';
import { Badge, Container, Link, Stack, Text } from '@chakra-ui/react';

const Footer: FunctionComponent = () => {
    const [health, setHealth] = useState(false);

    const healthHandler = async () => {
        try {
            const result = await fetch('/all-in-one/api/node-lab-backend/health');
            setHealth(result.status === 200);
        } catch (error) {
            console.log(error);
            setHealth(false);
        }
    }

    useEffect(() => {
        healthHandler();
    }, []);

    return (
        <footer>
            <Container maxW="container.sm" marginTop="10">
                <Stack>
                    <Text align="center"><strong>Node Lab</strong> by <Link
                        href="https://www.janobono.com/" isExternal>janobono</Link>.
                        The
                        source code is free.
                        {health
                            ? <Badge colorScheme="green">Backend healthy</Badge>
                            : <Badge colorScheme="red">Backend Error</Badge>
                        }
                    </Text>
                </Stack>
            </Container>
        </footer>
    );
};

export default Footer;
