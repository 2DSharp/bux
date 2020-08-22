function isRequiredSuccess(value: string, param: boolean) {
    if (param) {
        return value && value.trim().length > 0;
    }
    return true;
}

function isLengthRangeSuccess(value: string, param: {min?: number, max?: number}) {
    let success = true;
    if (param.min)
        success = success && value.trim().length >= param.min;
    if (param.max)
        success = success && value.trim().length <= param.max;

    return success;
}

function isPatternSuccess(value: string, regExp: RegExp) {
    return regExp.test(value);
}

const isValid: any = {
    required: isRequiredSuccess,
    length: isLengthRangeSuccess,
    pattern: isPatternSuccess
}

function validateField(rules: any, value: any) {

    for (let [rule, param] of Object.entries(rules)) {
        if (rule === "message") {
            continue;
        }
        if (!isValid[rule](value, param)) {
            return rules["message"][rule] ? rules["message"][rule] : true;
        }
    }
}

export function isEmpty(obj: any) {
    return Object.keys(obj).length === 0;
}

export default function validate(values: object, rules: any) {
    let messages: any = {};

    for (let [key, value] of Object.entries(values)) {
        console.log()
        if (rules[key]) {
            const message = validateField(rules[key], value)
            if (message) {
                messages[key] = message;
            }
        }
    }
    if (isEmpty(messages)) {
        return {success: true, data: values};
    }
    return {success: false, error: messages};
}