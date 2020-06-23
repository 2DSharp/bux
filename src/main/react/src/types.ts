export type Priority = "LOW" | "MEDIUM" | "HIGH"

export type User = {
    username: string,
    name: string,
    profilePicture?: string
}
export type TaskData = {
    id: string,
    title: string,
    priority: Priority
    assignee?: User
}