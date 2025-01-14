export interface Task {
    id: string;
    title: string;
    completed: boolean;
    important: boolean;
    userId: string;
    listId?: string;
    dueDate?: Date;
}

export interface TaskList {
    id: string;
    name: string;
    tasks: string[];
}

