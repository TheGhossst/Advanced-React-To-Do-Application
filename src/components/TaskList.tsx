import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '../lib/store/store'
import { fetchTasks, addTask, updateTask, deleteTask } from '../lib/store/taskSlice'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Star, Plus, X, Flag, Repeat, Calendar, Bell, Clock } from 'lucide-react'
import { Task } from '../lib/store/taskSlice'
import { TaskProgress } from './TaskProgress'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { TaskDetailsSidebar } from './TaskDetailsSidebar'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Calendar as CalendarComponent } from './ui/calendar'
import { format } from "date-fns"
import { cn } from '../lib/utils'

export function TaskList() {
    const dispatch = useDispatch<AppDispatch>()
    const tasks = useSelector((state: RootState) => state.tasks.tasks)
    const activeList = useSelector((state: RootState) => state.tasks.activeList)
    const lists = useSelector((state: RootState) => state.tasks.lists)
    const user = useSelector((state: RootState) => state.auth.user)

    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [isAddingTask, setIsAddingTask] = useState(false)
    const [newTaskData, setNewTaskData] = useState<Partial<Task>>({})
    const [newTaskPriority, setNewTaskPriority] = useState<Task['priority']>('medium')
    const [newTaskDescription, setNewTaskDescription] = useState('')
    const [newTaskDueTime, setNewTaskDueTime] = useState('')
    const [selectedTask, setSelectedTask] = useState<Task | null>(null)
    const [date, setDate] = useState<Date>()

    useEffect(() => {
        if (user?.uid) {
            dispatch(fetchTasks(user.uid))
        }
    }, [dispatch, user])

    const handleAddTask = async () => {
        if (newTaskTitle.trim() && user?.uid) {
            try {
                await dispatch(addTask({
                    title: newTaskTitle,
                    description: newTaskDescription,
                    completed: false,
                    important: false,
                    userId: user.uid,
                    listId: activeList === 'all' ? 'today' : activeList,
                    priority: newTaskPriority,
                    dueTime: newTaskDueTime,
                    createdAt: new Date().toISOString(),
                    ...newTaskData
                })).unwrap()

                setNewTaskTitle('')
                setNewTaskDescription('')
                setNewTaskDueTime('')
                setNewTaskData({})
                setNewTaskPriority('medium')
                setIsAddingTask(false)
            } catch (error) {
                console.error('Failed to add task:', error)
                alert('Failed to add task. Please try again.')
            }
        }
    }

    const handleToggleComplete = async (task: Task) => {
        try {
            await dispatch(updateTask({ ...task, completed: !task.completed })).unwrap()
        } catch (error) {
            console.error('Failed to update task:', error)
            alert('Failed to update task. Please try again.')
        }
    }

    const handleDeleteTask = async (taskId: string) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await dispatch(deleteTask(taskId)).unwrap()
            } catch (error) {
                console.error('Failed to delete task:', error)
                alert('Failed to delete task. Please try again.')
            }
        }
    }

    const handleToggleImportant = async (task: Task) => {
        try {
            await dispatch(updateTask({ ...task, important: !task.important })).unwrap()
        } catch (error) {
            console.error('Failed to update task:', error)
            alert('Failed to update task. Please try again.')
        }
    }

    const filteredTasks = tasks.filter(task => {
        if (activeList === 'all') return true;
        if (activeList === 'today') {
            const today = new Date().toISOString().split('T')[0];
            return task.dueDate === today;
        }
        if (activeList === 'important') return task.important;
        if (activeList === 'planned') return task.dueDate != null;
        if (activeList === 'assigned') return task.listId === 'assigned';
        return task.listId === activeList;
    });

    const activeTasks = filteredTasks.filter(task => !task.completed);
    const completedTasks = filteredTasks.filter(task => task.completed);

    const TaskItem = ({ task }: { task: Task }) => (
        <div
            className="relative flex flex-col gap-2 p-4 transition-all duration-200 border-l-4 rounded-lg cursor-pointer group hover:shadow-md bg-background/40 backdrop-blur-sm hover:translate-x-1"
            style={{
                borderLeftColor: task.completed ? '#22c55e' : 
                    task.priority === 'high' ? '#ef4444' : 
                    task.priority === 'medium' ? '#f97316' : 
                    task.priority === 'low' ? '#ffffff``' : '#f97316'
            }}
            onClick={() => setSelectedTask(task)}
        >
            <div className="flex items-start gap-3">
                <div className="pt-1">
                    <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={(e) => {
                            e.stopPropagation();
                            handleToggleComplete(task);
                        }}
                        className="w-4 h-4 transition-all duration-200 border-2 rounded-sm peer border-primary/50 checked:border-green-500 checked:bg-green-500"
                    />
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                        <div className="space-y-1">
                            <h3 className={`font-medium truncate ${task.completed ? 'line-through text-muted-foreground' : ''
                                }`}>
                                {task.title}
                            </h3>
                            {task.description && (
                                <p className="text-sm text-muted-foreground line-clamp-2">
                                    {task.description}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col items-end gap-2 ml-2">
                            <div className="flex items-center gap-2 transition-opacity opacity-0 group-hover:opacity-100">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="w-8 h-8 hover:bg-primary/10"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleToggleImportant(task);
                                    }}
                                >
                                    <Star className={`h-4 w-4 ${task.important ? 'fill-yellow-400 text-yellow-400' : ''
                                        }`} />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="w-8 h-8 hover:bg-destructive/10"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteTask(task.id);
                                    }}
                                >
                                    <X className="w-4 h-4 text-destructive" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-muted-foreground">
                        {task.dueDate && (
                            <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10">
                                <Calendar className="w-3 h-3" />
                                {new Date(task.dueDate).toLocaleDateString()}
                                {task.dueTime && ` at ${task.dueTime}`}
                            </span>
                        )}
                        {task.repeat && (
                            <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10">
                                <Repeat className="w-3 h-3" />
                                {task.repeat}
                            </span>
                        )}
                        {task.reminder && (
                            <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10">
                                <Bell className="w-3 h-3" />
                                {new Date(task.reminder).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <div className="flex-1 p-6">
            <div className="max-w-2xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="mb-1 text-2xl font-bold">
                            {lists.find(list => list.id === activeList)?.name || 'To Do'}
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            {activeTasks.length} tasks pending
                        </p>
                    </div>
                    <TaskProgress
                        total={filteredTasks.length}
                        completed={completedTasks.length}
                    />
                </div>

                {isAddingTask ? (
                    <div className="mb-6 overflow-hidden border rounded-lg shadow-lg animate-in fade-in-0 zoom-in-95">
                        <div className="p-4 border-b bg-muted/50">
                            <h3 className="text-lg font-semibold">Create New Task</h3>
                        </div>

                        <div className="p-6 space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground">
                                    Task Name
                                </label>
                                <Input
                                    placeholder="What needs to be done?"
                                    value={newTaskTitle}
                                    onChange={(e) => setNewTaskTitle(e.target.value)}
                                    className="w-full"
                                    autoFocus
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground">
                                    Description
                                </label>
                                <textarea
                                    placeholder="Add more details..."
                                    value={newTaskDescription}
                                    onChange={(e) => setNewTaskDescription(e.target.value)}
                                    className="w-full min-h-[100px] p-3 rounded-md border bg-transparent resize-y focus:outline-none focus:ring-2 focus:ring-ring"
                                />
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-muted-foreground">
                                        Due Date
                                    </label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className={cn(
                                                    "w-full justify-start text-left font-normal",
                                                    !date && "text-muted-foreground"
                                                )}
                                            >
                                                <Calendar className="w-4 h-4 mr-2" />
                                                {date ? format(date, "PPP") : <span>Pick a date</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <CalendarComponent
                                                mode="single"
                                                selected={date}
                                                onSelect={(newDate) => {
                                                    setDate(newDate)
                                                    if (newDate) {
                                                        setNewTaskData(prev => ({
                                                            ...prev,
                                                            dueDate: newDate.toISOString().split('T')[0]
                                                        }))
                                                    }
                                                }}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-muted-foreground">
                                        Due Time
                                    </label>
                                    <div className="relative">
                                        <Input
                                            type="time"
                                            value={newTaskDueTime}
                                            onChange={(e) => setNewTaskDueTime(e.target.value)}
                                            className="w-full"
                                        />
                                        <Clock className="absolute w-4 h-4 -translate-y-1/2 pointer-events-none right-2 top-1/2 text-muted-foreground" />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground">
                                    Priority
                                </label>
                                <Select
                                    value={newTaskPriority}
                                    onValueChange={(value: Task['priority']) => setNewTaskPriority(value)}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select Priority" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="high">
                                            <div className="flex items-center gap-2">
                                                <Flag className="text-red-500" />
                                                High Priority
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="medium">
                                            <div className="flex items-center gap-2">
                                                <Flag className="text-yellow-500" />
                                                Medium Priority
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="low">
                                            <div className="flex items-center gap-2">
                                                <Flag className="text-green-500" />
                                                Low Priority
                                            </div>
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-2 p-4 border-t bg-muted/50">
                            <Button
                                variant="ghost"
                                onClick={() => {
                                    setIsAddingTask(false)
                                    setNewTaskTitle('')
                                    setNewTaskDescription('')
                                    setNewTaskDueTime('')
                                    setNewTaskData({})
                                    setNewTaskPriority('medium')
                                    setDate(undefined)
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleAddTask}
                                disabled={!newTaskTitle.trim()}
                                className="gap-2"
                            >
                                <Plus className="w-4 h-4" />
                                Create Task
                            </Button>
                        </div>
                    </div>
                ) : (
                    <Button
                        className="mb-6"
                        onClick={() => setIsAddingTask(true)}
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Task
                    </Button>
                )}

                <div className="space-y-3 transition-all">
                    {activeTasks.map(task => (
                        <TaskItem key={task.id} task={task} />
                    ))}
                </div>

                {completedTasks.length > 0 && (
                    <div className="mt-8">
                        <h2 className="mb-3 text-lg font-semibold">Completed</h2>
                        <div className="space-y-3 transition-all">
                            {completedTasks.map(task => (
                                <TaskItem key={task.id} task={task} />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {selectedTask && (
                <TaskDetailsSidebar
                    task={selectedTask}
                    onClose={() => setSelectedTask(null)}
                    onComplete={handleToggleComplete}
                />
            )}
        </div>
    )
}