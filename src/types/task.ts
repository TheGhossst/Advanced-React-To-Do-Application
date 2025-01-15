export interface Task {
    id: string;
    title: string;
    description?: string;
    completed: boolean;
    important: boolean;
    userId: string;
    listId?: string;
    dueDate?: string;
    dueTime?: string;
    reminder?: string;
    repeat?: 'daily' | 'weekly' | 'monthly' | 'none';
    createdAt: string;
    priority: 'high' | 'medium' | 'low';
    isOutdoor?: boolean;
    location?: string;
}

export type TaskList = {
    id: string;
    name: string;
    tasks: string[];
};

export interface TaskState {
    tasks: Task[]
    lists: TaskList[]
    activeList: string
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: string | null
    selectedTask: string | null
}