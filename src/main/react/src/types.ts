export type Priority = "LOW" | "MEDIUM" | "HIGH"

export interface TaskData {
    id: string,
    title: string,
    priority: Priority
    assignee?: string
}