import { useEffect, useState } from "react"
import { vMessages } from "../resources/fieldsValidationResources";
import { formatString } from "./StringUtils";

const getValidationErrorMsg = (error, type) => {//TODO refactor
    if (error) {
        const errorMsg = vMessages[Object.keys(error)];

        if ('regexpError' in error) {
            return formatString(errorMsg, type);
        }
    
        return errorMsg;
    }
    return '';
}

export const useValidation = (value, validationsObj) => {//TODO refactor
    const [empty, setEmpty] = useState(false);
    const [lengthError, setLengthError] = useState(false);
    const [regexpError, setRegexpError] = useState(false);
    const [errors, setErrors] = useState([]);

    let type = '';
    let validations = {};

    for (const [key, value] of Object.entries(validationsObj)) {
        type = key;
        validations = value;
     };

    useEffect(() => {
        for(const validation in validations) {
            switch(validation) {
                case 'mandatory':
                    if (validations[validation]) setEmpty(!!value);
                    setErrors([...errors, {empty: empty}])
                    break;
                case 'minLength':
                    value.lengthError < validations[validation] ? setLengthError(true) : setLengthError(false);
                    setErrors([...errors, {lengthError: lengthError}])
                    break;
                case 'maxLength':
                    value.lengthError > validations[validation] ? setLengthError(true) : setLengthError(false);
                    setErrors([...errors, {lengthError: lengthError}])
                    break;
                case 'regexp':
                    const regexp = new RegExp(validations[validation]);//TODO
                    setRegexpError(!regexp.test(value));
                    setErrors([...errors, {regexpError: regexpError}])
                    break;
                default:
                    break;
            }
        }
    }, [value])

     
    let error = errors.find((err) => {
        return err;
    });

    return getValidationErrorMsg(error, type);
}

export const useInput = (initialValue, validationsObj) => {
    const [value, setValue] = useState(initialValue);
    const [isDirty, setDirty] = useState(initialValue);
    const valid = useValidation(value, validationsObj)

    const onChange = (e) => { setValue(e.target.value) }

    const onBlur = (e) => { setDirty(true) }

    return {
        value,
        onChange,
        onBlur,
        isDirty,
        valid
    }
}