import { X, Calendar, Bell, Repeat, Flag } from 'lucide-react'
import { Task } from '../lib/store/taskSlice'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateTask } from '../lib/store/taskSlice'
import { AppDispatch } from '../lib/store/store'

interface TaskDetailsSidebarProps {
    task: Task
    onClose: () => void
}

export function TaskDetailsSidebar({ task, onClose }: TaskDetailsSidebarProps) {
    const dispatch = useDispatch<AppDispatch>()
    const [title, setTitle] = useState(task.title)
    const [description, setDescription] = useState(task.description || '')
    const [isEditing, setIsEditing] = useState(false)

    const handleSave = async () => {
        try {
            await dispatch(updateTask({
                ...task,
                title,
                description
            })).unwrap()
            setIsEditing(false)
        } catch (error) {
            console.error('Failed to update task:', error)
            alert('Failed to update task. Please try again.')
        }
    }

    const getPriorityColor = (priority: Task['priority']) => {
        switch (priority) {
            case 'high': return 'text-red-500'
            case 'medium': return 'text-yellow-500'
            case 'low': return 'text-green-500'
            default: return 'text-gray-500'
        }
    }

    return (
        <div className="fixed inset-y-0 right-0 border-l shadow-lg w-96 bg-background animate-in slide-in-from-right">
            <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold">Task Details</h2>
                <Button variant="ghost" size="icon" onClick={onClose}>
                    <X className="w-4 h-4" />
                </Button>
            </div>

            <div className="p-4 space-y-4">
                {isEditing ? (
                    <>
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="text-lg font-medium"
                        />
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full min-h-[100px] p-2 rounded-md border bg-transparent"
                            placeholder="Add a description..."
                        />
                        <div className="flex justify-end gap-2">
                            <Button variant="ghost" onClick={() => setIsEditing(false)}>
                                Cancel
                            </Button>
                            <Button onClick={handleSave}>
                                Save
                            </Button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="space-y-2">
                            <h3 className="text-lg font-medium">{task.title}</h3>
                            <p className="text-muted-foreground">
                                {task.description || 'No description'}
                            </p>
                            <Button variant="ghost" className="text-sm" onClick={() => setIsEditing(true)}>
                                Edit
                            </Button>
                        </div>
                    </>
                )}

                <div className="pt-4 space-y-4 border-t">
                    <div className="flex items-center gap-2">
                        <Flag className={`w-4 h-4 ${getPriorityColor(task.priority)}`} />
                        <span className="text-sm">Priority: {task.priority}</span>
                    </div>

                    {task.dueDate && (
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span className="text-sm">
                                Due: {new Date(task.dueDate).toLocaleDateString()}
                                {task.dueTime && ` at ${task.dueTime}`}
                            </span>
                        </div>
                    )}

                    {task.reminder && (
                        <div className="flex items-center gap-2">
                            <Bell className="w-4 h-4" />
                            <span className="text-sm">
                                Reminder: {new Date(task.reminder).toLocaleString()}
                            </span>
                        </div>
                    )}

                    {task.repeat && (
                        <div className="flex items-center gap-2">
                            <Repeat className="w-4 h-4" />
                            <span className="text-sm">Repeats {task.repeat}</span>
                        </div>
                    )}

                    <div className="text-xs text-muted-foreground">
                        Created: {new Date(task.createdAt).toLocaleString()}
                    </div>
                </div>
            </div>
        </div>
    )
} 