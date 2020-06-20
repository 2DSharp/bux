function isRequiredSuccess(value: string, param: boolean) {
    if (param) {
        return value && value.trim().length > 0;
    }
    return true;
}

const isValid: any = {
    required: isRequiredSuccess,
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

function isEmpty(obj: object) {
    return Object.keys(obj).length === 0;
}

export default function validate(values: object, rules: any) {
    let messages: any = {};

    for (let [key, value] of Object.entries(values)) {
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