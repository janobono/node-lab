export default interface InputProps<T> {
    name: string,
    label: string,
    isRequired?: boolean,
    value?: T,
    notValid: boolean,
    setNotValid: (valid: boolean) => void,
    isNotValid?: (value: T) => boolean,
    formErrorMessage?: string
}
