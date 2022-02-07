import React, { FunctionComponent, useContext } from 'react';
import { useNavigate } from 'react-router';
import { Box, Button, ButtonGroup, Container, Flex, Heading, HStack, Spacer, Stack, Text } from '@chakra-ui/react';

import { ColorModeSwitcher } from '../../ColorModeSwitcher';
import AuthContext from '../../context/auth-context';

const Header: FunctionComponent = () => {
    const navigate = useNavigate();
    const authCtx = useContext(AuthContext);

    return (
        <header>
            <Container maxW="container.sm" marginBottom="10">
                <Flex>
                    <Box p="2">
                        <HStack spacing="24px">
                            <ColorModeSwitcher justifySelf="flex-end"/>
                            <Heading size="lg">Todo App</Heading>
                        </HStack>
                    </Box>
                    <Spacer/>
                    <Box p="2">
                        {authCtx.isLoggedIn ?
                            <Button colorScheme="teal" variant="outline" onClick={() => {
                                authCtx.onLogout();
                                navigate('/');
                            }}>Log Out</Button>
                            :
                            <ButtonGroup mr="4">
                                <Button colorScheme="teal" variant="solid" onClick={() => navigate('/sign-up')}>
                                    Sign Up
                                </Button>
                                <Button colorScheme="teal" variant="outline" onClick={() => navigate('/log-in')}>
                                    Log In
                                </Button>
                            </ButtonGroup>
                        }
                    </Box>
                </Flex>
                {authCtx.authResult &&
                    <Stack>
                        <Text>Welcome dear
                            user <strong>{authCtx.authResult?.user.firstName} {authCtx.authResult?.user.lastName}</strong></Text>
                    </Stack>
                }
            </Container>
        </header>
    );
}

export default Header;
