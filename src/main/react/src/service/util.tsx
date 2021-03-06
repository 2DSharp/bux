import {FieldErrors} from "react-hook-form";
import moment from "moment";
export function ellipsize( str: string, n: number, useWordBoundary: boolean ) : string {
    if (str.length <= n) { return str; }
    const subString = str.substr(0, n-1); // the original check
    return (useWordBoundary
        ? subString.substr(0, subString.lastIndexOf(" "))
        : subString) + "..." ;
};

export function removeFieldFromState<T>(setState: React.Dispatch<React.SetStateAction<T | undefined>> | undefined, field: string) {
    if (setState) {
        setState(
            (state: T | undefined): T | undefined => {
                return {...state, [field]: undefined} as T | undefined;
            });
    }
}

export function getFormErrors(clientErr: FieldErrors<any>, serverErr: any | undefined, field: string) {
    if (clientErr[field])
        return clientErr[field].message;
    if (serverErr != undefined)
        return serverErr[field];
}

export function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function convertDateToLocalDate(value: string) {
    return moment(value).format("YYYY-MM-DD")
}