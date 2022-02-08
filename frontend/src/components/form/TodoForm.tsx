import React, { FormEvent, FunctionComponent, PropsWithChildren, useState } from 'react';
import { Button, FormControl, FormErrorMessage, FormLabel, Stack, Textarea } from '@chakra-ui/react';
import TextInput from './TextInput';

interface TodoFormProps {
    title?: string,
    content?: string,
    submitButtonLabel: string,
    onSubmit: (title: string, content: string) => void
}

const TodoForm: FunctionComponent<PropsWithChildren<TodoFormProps>> = (props) => {
    const [titleNotValid, setTitleNotValid] = useState(false);
    const [contentNotValid, setContentNotValid] = useState(false);

    const [content, setContent] = useState(props.content ? props.content : '');

    const submitHandler = (event: FormEvent) => {
        event.preventDefault();
        const formData = event.target as typeof event.target & {
            title: { value: string };
            content: { value: string };
        };
        if (formData.title.value.length > 0 && formData.content.value.length > 0) {
            props.onSubmit(formData.title.value, formData.content.value);
        }
    }

    return (
        <form onSubmit={submitHandler}>
            <Stack spacing="4">
                <TextInput
                    name="title"
                    label="Title"
                    isRequired={true}
                    value={props.title ? props.title : ''}
                    notValid={titleNotValid}
                    setNotValid={setTitleNotValid}
                    isNotValid={value => value.length === 0}
                    formErrorMessage="Invalid title!"
                />

                <FormControl isRequired isInvalid={contentNotValid}>
                    <FormLabel htmlFor="content">Content</FormLabel>
                    <Textarea
                        id="content"
                        name="content"
                        value={content}
                        onChange={event => {
                            setContent(event.target.value);
                            setContentNotValid(event.target.value.length === 0);
                        }}
                        onBlur={(event) => {
                            if (!event.currentTarget.contains(event.relatedTarget)) {
                                setContentNotValid(content.length === 0);
                            }
                        }}
                    />
                    {contentNotValid && <FormErrorMessage>Invalid content!</FormErrorMessage>}
                </FormControl>

                <Button
                    type="submit"
                    disabled={titleNotValid || contentNotValid}
                >{props.submitButtonLabel}</Button>
            </Stack>
        </form>
    );
};

export default TodoForm;
