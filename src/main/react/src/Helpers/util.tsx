import {Dispatch, SetStateAction} from "react";
import {FieldErrors} from "react-hook-form";

export function removeFieldFromState<T>(setState: Dispatch<SetStateAction<T | undefined>>, field: string)  {
    setState(
        (state: T | undefined) : T | undefined => {
            return {...state, [field]: undefined} as T | undefined;
        });
}

export function getFormErrors(clientErr : FieldErrors<any>, serverErr : any | undefined, field : string) {
    if (clientErr[field])
        return clientErr[field].message;
    if (serverErr != undefined)
        return serverErr[field];
}