export const vMessages = {
    empty: 'This field is required',
    lengthError: 'Incorrect length',
    regexpError: 'Please type correct {0}',
}

export const vProperties = {
    email: {
        mandatory: true,
        minLength: 3,
        maxLength: 10,
        regexp: '/^[\w.%+-]+@[\w.-]+\.[\w]{2,6}$/'
    },
    password: {
        mandatory: true,
        minLength: 3,
        maxLength: 10,
        regexp: '(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}'
    }
}