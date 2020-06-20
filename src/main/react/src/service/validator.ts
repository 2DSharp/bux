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
    let fails: any = {};

    for (let [rule, param] of Object.entries(rules)) {
        if (rule === "message") {
            continue;
        }
        if (!isValid[rule](value, param)) {
            fails[rule] = rules["message"][rule] ? rules["message"][rule] : true;
        }
    }
    return fails;
}

function isEmpty(obj: object) {
    return Object.keys(obj).length === 0;
}

export default function validate(values: object, rules: any) {
    let messages: any = {};

    for (let [key, value] of Object.entries(values)) {
        if (rules[key]) {
            messages[key] = validateField(rules[key], value)
        }
    }
    if (isEmpty(messages)) {
        return {success: true, data: values};
    }
    return {success: false, error: messages};
}