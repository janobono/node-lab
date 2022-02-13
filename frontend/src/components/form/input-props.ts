export default interface InputProps<T> {
    name: string,
    label: string,
    isRequired?: boolean,
    value: T,
    setValue: (value: T) => void,
    notValid: boolean,
    setNotValid: (valid: boolean) => void,
    isNotValid?: (value: string) => boolean,
    formErrorMessage?: string
}
