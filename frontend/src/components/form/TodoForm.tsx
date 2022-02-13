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

    const [title, setTitle] = useState(props.title ? props.title : '');
    const [content, setContent] = useState(props.content ? props.content : '');

    const submitHandler = (event: FormEvent) => {
        event.preventDefault();
        if (!titleNotValid && !contentNotValid) {
            props.onSubmit(title, content);
        }
    }

    return (
        <form onSubmit={submitHandler}>
            <Stack spacing="4">
                <TextInput
                    name="title"
                    label="Title"
                    isRequired={true}
                    value={title}
                    setValue={setTitle}
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
