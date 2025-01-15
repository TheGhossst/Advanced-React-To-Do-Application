import { X, Calendar, Bell, Repeat, Flag, AlertCircle, CloudSun } from 'lucide-react'
import { Task } from '../lib/store/taskSlice'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateTask } from '../lib/store/taskSlice'
import { AppDispatch } from '../lib/store/store'
import { getWeather, WeatherData, WeatherError } from '../lib/services/weatherService'
import { Alert, AlertDescription } from './ui/alert'

interface TaskDetailsSidebarProps {
    task: Task
    onClose: () => void
    onComplete: (task: Task) => void
}

export function TaskDetailsSidebar({ task, onClose, onComplete }: TaskDetailsSidebarProps) {
    const dispatch = useDispatch<AppDispatch>()
    const [title, setTitle] = useState(task.title)
    const [description, setDescription] = useState(task.description || '')
    const [isEditing, setIsEditing] = useState(false)
    const [weather, setWeather] = useState<WeatherData | null>(null)
    const [weatherError, setWeatherError] = useState<string | null>(null)

    useEffect(() => {
        if (task.isOutdoor && task.location) {
            const fetchWeather = async () => {
                try {
                    // Add type assertion since we know location exists in this block
                    const data = await getWeather(task.location as string)
                    setWeather(data)
                    setWeatherError(null)
                } catch (error) {
                    setWeatherError(error instanceof WeatherError ?
                        error.message : 
                        'Failed to load weather information'
                    )
                }
            }
            fetchWeather()
        }
    }, [task.isOutdoor, task.location])

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

    return (
        <div className="fixed inset-y-0 right-0 w-96 border-l shadow-lg bg-[#1F1F1F] text-white animate-in slide-in-from-right">
            <div className="flex items-center justify-between p-4 border-b border-[#2A2A2A]">
                <h2 className="text-lg font-semibold">Task Details</h2>
                <Button variant="ghost" size="icon" onClick={onClose}>
                    <X className="w-4 h-4" />
                </Button>
            </div>

            <div className="p-6 space-y-6">
                {isEditing ? (
                    <>
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="text-lg font-medium bg-transparent"
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
                        <div className="space-y-4">
                            <h3 className="text-xl font-medium">{task.title}</h3>
                            <p className="text-muted-foreground">
                                {task.description || 'No description'}
                            </p>
                            <Button variant="ghost" className="text-sm" onClick={() => setIsEditing(true)}>
                                Edit Details
                            </Button>
                        </div>

                        <div className="p-4 rounded-lg bg-[#2A2A2A] space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Status</span>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={task.completed}
                                        onChange={() => onComplete(task)}
                                        className="w-4 h-4 transition-all duration-200 border-2 rounded-sm border-primary/50 checked:border-green-500 checked:bg-green-500"
                                    />
                                    <span className="text-sm">
                                        {task.completed ? 'Completed' : 'In Progress'}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <Flag className={`w-4 h-4 ${task.priority === 'high' ? 'text-red-500' :
                                        task.priority === 'medium' ? 'text-orange-500' :
                                            'text-white'
                                    }`} />
                                <span className="text-sm">Priority: {task.priority}</span>
                            </div>
                        </div>

                        {task.isOutdoor && (
                            <div className="p-4 rounded-lg bg-card space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <CloudSun className="w-4 h-4" />
                                        <span className="text-sm font-medium">Weather in {task.location}</span>
                                    </div>
                                </div>

                                {weatherError ? (
                                    <Alert variant="destructive">
                                        <AlertCircle className="w-4 h-4" />
                                        <AlertDescription>{weatherError}</AlertDescription>
                                    </Alert>
                                ) : weather ? (
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <img 
                                                src={weather.icon} 
                                                alt={weather.description}
                                                className="w-10 h-10"
                                            />
                                            <div>
                                                <p className="text-sm">{weather.description}</p>
                                                <p className="text-lg font-bold">{weather.temperature}°C</p>
                                            </div>
                                        </div>
                                        
                                        {!weather.isOutdoorFriendly && (
                                            <Alert>
                                                <AlertCircle className="w-4 h-4" />
                                                <AlertDescription>
                                                    Weather conditions might not be suitable for outdoor activities
                                                </AlertDescription>
                                            </Alert>
                                        )}
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center p-4">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="space-y-4">
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
                        </div>

                        <div className="pt-4 border-t border-[#2A2A2A]">
                            <span className="text-xs text-muted-foreground">
                                Created: {new Date(task.createdAt).toLocaleString()}
                            </span>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
} 