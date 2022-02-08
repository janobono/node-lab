import React, { FunctionComponent, PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react';
import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement
} from '@chakra-ui/react';
import InputProps from './input-props';

const PasswordInput: FunctionComponent<PropsWithChildren<InputProps<string>>> = (props) => {
    const [notValid, setNotValid] = useState(false);
    const [value, setValue] = useState(props.value ? props.value : '');
    const [showPassword, setShowPassword] = useState(false);

    const revalidate = useCallback(() => {
            if (props.isNotValid) {
                setNotValid(props.isNotValid(value));
            }
        }, [props, value]
    );

    const firstRun = useRef(true);
    useEffect(
        () => {
            if (firstRun.current) {
                firstRun.current = false;
                return;
            }
            revalidate();
        },
        [revalidate, value]
    );

    return (
        <FormControl
            isRequired={props.isRequired}
            isInvalid={notValid}
        >
            <FormLabel htmlFor={props.label}>{props.label}</FormLabel>
            <InputGroup>
                <Input type={showPassword ? 'text' : 'password'}
                       id={props.name}
                       name={props.name}
                       value={value}
                       onChange={event => setValue(event.target.value)}
                       onBlur={(event) => {
                           if (!event.currentTarget.contains(event.relatedTarget)) {
                               revalidate();
                           }
                       }}
                />
                <InputRightElement>
                    <Button onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? 'Hide' : 'Show'}
                    </Button>
                </InputRightElement>
            </InputGroup>
            {notValid && props.formErrorMessage && <FormErrorMessage>{props.formErrorMessage}</FormErrorMessage>}
        </FormControl>
    );
};

export default PasswordInput;
