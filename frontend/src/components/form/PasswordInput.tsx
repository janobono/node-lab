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
    const [showPassword, setShowPassword] = useState(false);

    const revalidate = useCallback(() => {
            if (props.isNotValid) {
                props.setNotValid(props.isNotValid(props.value));
            }
        }, [props.setNotValid, props.value]
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
        [props.value, revalidate]
    );

    return (
        <FormControl
            isRequired={props.isRequired}
            isInvalid={props.notValid}
        >
            <FormLabel htmlFor={props.label}>{props.label}</FormLabel>
            <InputGroup>
                <Input type={showPassword ? 'text' : 'password'}
                       id={props.name}
                       name={props.name}
                       value={props.value}
                       onChange={event => props.setValue(event.target.value)}
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
            {props.notValid && props.formErrorMessage && <FormErrorMessage>{props.formErrorMessage}</FormErrorMessage>}
        </FormControl>
    );
};

export default PasswordInput;
