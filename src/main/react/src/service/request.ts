import Axios from "axios";

export function getRequest(url: string, params: object, successCallback: (result: any) => void,
                           errorCallback: (result: object) => void): void {
    Axios.get(url, {
        params: params
    }).then(response => {
        successCallback(response.data);
    }).catch(error => {
        errorCallback(error.response.data);
    })
}