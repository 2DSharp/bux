import {notification} from "antd";

export const notifyError = (error: { title: any; description: any; }) => {
    notification['error']({
        message: error.title,
        description:
        error.description,
        onClick: () => {
        },
    });
};