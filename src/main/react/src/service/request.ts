import Axios, {AxiosError} from "axios";
import {notifyError} from "./notification";

export function getRequest(url: string, params: object, successCallback: (result: any) => void,
                           onFinally?: () => void, errorCallback?: (result?: any) => void): void {
    Axios.get(url, {
        params: params
    }).then(response => {
        successCallback(response.data);
    }).catch((error : AxiosError ) => {
        console.log(error.response?.status);
        console.log("error");
        if (error.response?.status == 401) {
            // Show them the login screen
            window.location.href = "/";
        }
        if (errorCallback) {
            errorCallback(error);
        }
        notifyError({
            title: "Something went wrong",
            description: "It's not you, it's us. Something's up, we're trying to figure this out."
        });
        console.log(error)
    }).finally(() => {
        if (onFinally) {
            onFinally();
        }
    })
}

export function postRequest(url: string, data: object, successCallback: (result: any) => void,
                            onFinally?: () => void, errorCallback?: (result?: any) => void): void {
    Axios.post(url, data,)
        .then(response => {
            successCallback(response.data);
        })
        .catch(error => {
            if (errorCallback) {
                errorCallback(error);
            }
            notifyError({
                title: "Something went wrong",
                description: "It's not you, it's us. Something's up, we're trying to figure this out."
            });
            console.log(error)
        }).finally(() => {
        if (onFinally) {
            onFinally();
        }
    })
}