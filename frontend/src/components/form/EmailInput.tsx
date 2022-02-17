import React, { FunctionComponent, PropsWithChildren, useCallback, useEffect, useRef } from 'react';
import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import InputProps from './input-props';

export const isEmailValid = (email: string) => {
    return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

const EmailInput: FunctionComponent<PropsWithChildren<InputProps<string>>> = (props) => {

    const revalidate = useCallback(() => {
            if (props.isNotValid) {
                props.setNotValid(props.isNotValid(props.value));
            }
        }, [props]
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
            <Input
                type="email"
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
            {props.notValid && props.formErrorMessage && <FormErrorMessage>{props.formErrorMessage}</FormErrorMessage>}
        </FormControl>
    );
};

export default EmailInput;
