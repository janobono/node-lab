import React, { FunctionComponent, PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react';
import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import InputProps from './input-props';

export const isEmailValid = (email: string) => {
    return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

const EmailInput: FunctionComponent<PropsWithChildren<InputProps<string>>> = (props) => {
    const notValid = props.notValid;
    const setNotValid = props.setNotValid;
    const [value, setValue] = useState(props.value ? props.value : '@');

    const revalidate = useCallback(() => {
            if (props.isNotValid) {
                setNotValid(props.isNotValid(value));
            }
        }, [setNotValid, props, value]
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
        [value, revalidate]
    );

    return (
        <FormControl
            isRequired={props.isRequired}
            isInvalid={notValid}
        >
            <FormLabel htmlFor={props.label}>{props.label}</FormLabel>
            <Input
                type="email"
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
            {notValid && props.formErrorMessage && <FormErrorMessage>{props.formErrorMessage}</FormErrorMessage>}
        </FormControl>
    );
};

export default EmailInput;
