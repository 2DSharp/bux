import {Dispatch, SetStateAction} from "react";

export function removeFieldFromState<T>(setState: Dispatch<SetStateAction<T | undefined>>, field: string)  {
    setState(
        (state: T | undefined) : T | undefined => {
            return {...state, [field]: undefined} as T | undefined;
        });
}