import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../lib/store/store'
import { setActiveList } from '../lib/store/taskSlice'
import { Button } from './ui/button'
import { ListChecks, CalendarDays, Star, Calendar, Plus } from 'lucide-react'

export function Sidebar() {
    const dispatch = useDispatch()
    const activeList = useSelector((state: RootState) => state.tasks.activeList)
    const tasks = useSelector((state: RootState) => state.tasks.tasks)
    const user = useSelector((state: RootState) => state.auth.user)

    const pendingTasks = tasks.filter(task => !task.completed).length
    const completedTasks = tasks.filter(task => task.completed).length
    const totalTasks = tasks.length
    const completionPercentage = totalTasks ? (completedTasks / totalTasks) * 100 : 0

    return (
        <div className="w-64 min-h-screen border-r-4 bg-transparent text-foreground">
            <div className="p-4">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 overflow-hidden rounded-full">
                        {user?.photoURL ? (
                            <img
                                src={user.photoURL}
                                alt="User avatar"
                                className="object-cover w-full h-full"
                            />
                        ) : (
                            <div className="flex items-center justify-center w-full h-full text-lg font-semibold bg-green-600">
                                {user?.displayName ? user.displayName[0].toUpperCase() : '?'}
                            </div>
                        )}
                    </div>
                    <h2 className="text-sm font-medium text-foreground">
                        Hey, {user?.displayName || 'User'}
                    </h2>
                </div>
                <nav className="mb-8 space-y-1">
                    <Button
                        variant="ghost"
                        className={`w-full justify-start ${activeList === 'all' ? 'bg-white/10' : 'hover:bg-white/5'}`}
                        onClick={() => dispatch(setActiveList('all'))}
                    >
                        <ListChecks className="w-4 h-4 mr-3" />
                        All Tasks
                    </Button>
                    <Button
                        variant="ghost"
                        className={`w-full justify-start ${activeList === 'today' ? 'bg-green-600 text-white' : 'hover:bg-white/5'}`}
                        onClick={() => dispatch(setActiveList('today'))}
                    >
                        <CalendarDays className="w-4 h-4 mr-3" />
                        Today
                    </Button>
                    <Button
                        variant="ghost"
                        className={`w-full justify-start ${activeList === 'important' ? 'bg-white/10' : 'hover:bg-white/5'}`}
                        onClick={() => dispatch(setActiveList('important'))}
                    >
                        <Star className="w-4 h-4 mr-3" />
                        Important
                    </Button>
                    <Button
                        variant="ghost"
                        className={`w-full justify-start ${activeList === 'planned' ? 'bg-white/10' : 'hover:bg-white/5'}`}
                        onClick={() => dispatch(setActiveList('planned'))}
                    >
                        <Calendar className="w-4 h-4 mr-3" />
                        Planned
                    </Button>
                    {/*<Button
                        variant="ghost"
                        className={`w-full justify-start ${activeList === 'assigned' ? 'bg-white/10' : 'hover:bg-white/5'}`}
                        onClick={() => dispatch(setActiveList('assigned'))}
                    >
                        <Users className="w-4 h-4 mr-3" />
                        Assigned to me
                    </Button>*/}
                </nav>

                <Button
                    variant="ghost"
                    className="justify-start w-full mb-8 hover:bg-white/5"
                >
                    <Plus className="w-4 h-4 mr-3" />
                    Add list
                </Button>
                <div className="p-6 bg-card rounded-lg">
                    <div className="mb-6">
                        <h3 className="mb-2 text-sm font-medium text-muted-foreground">Today's Progress</h3>
                        <div className="flex items-baseline gap-2">
                            <p className="text-3xl font-bold text-foreground">{pendingTasks}</p>
                            <p className="text-sm text-muted-foreground">tasks remaining</p>
                        </div>
                    </div>

                    <div className="relative w-full h-40">
                        <svg className="w-full h-full -rotate-90 transform">
                            <circle
                                className="text-[#3A3A3A]"
                                strokeWidth="12"
                                stroke="currentColor"
                                fill="transparent"
                                r="70"
                                cx="80"
                                cy="80"
                            />
                            <circle
                                className="text-green-500 transition-all duration-1000 ease-in-out"
                                strokeWidth="12"
                                strokeDasharray={`${completionPercentage * 4.4}, 440`}
                                strokeLinecap="round"
                                stroke="currentColor"
                                fill="transparent"
                                r="70"
                                cx="80"
                                cy="80"
                            />
                        </svg>

                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-2xl font-bold">
                                {Math.round(completionPercentage)}%
                            </span>
                            <span className="text-sm text-gray-400">Completed</span>
                        </div>
                    </div>

                    <div className="flex justify-between mt-6 text-sm">
                        <div className="flex items-center gap-2">
                            <span className="block w-3 h-3 rounded-full bg-green-500" />
                            <span className="text-muted-foreground">Done ({completedTasks})</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="block w-3 h-3 rounded-full bg-[#3A3A3A]" />
                            <span className="text-muted-foreground">Pending ({pendingTasks})</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}