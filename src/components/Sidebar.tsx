import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../lib/store/store'
import { setActiveList } from '../lib/store/taskSlice'
import { Button } from './ui/button'
import { ListChecks, CalendarDays, Star, Calendar, Users, Plus } from 'lucide-react'

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
        <div className="w-64 min-h-screen text-white bg-transparent border-r-4">
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
                    <h2 className="text-sm font-medium">
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
                    <Button
                        variant="ghost"
                        className={`w-full justify-start ${activeList === 'assigned' ? 'bg-white/10' : 'hover:bg-white/5'}`}
                        onClick={() => dispatch(setActiveList('assigned'))}
                    >
                        <Users className="w-4 h-4 mr-3" />
                        Assigned to me
                    </Button>
                </nav>

                <Button
                    variant="ghost"
                    className="justify-start w-full mb-8 hover:bg-white/5"
                >
                    <Plus className="w-4 h-4 mr-3" />
                    Add list
                </Button>
                <div className="p-4 bg-[#252525] rounded-lg">
                    <div className="mb-4">
                        <h3 className="mb-1 text-sm font-medium">Today Tasks</h3>
                        <p className="text-2xl font-bold">{pendingTasks}</p>
                    </div>

                    <div className="relative w-full h-32">
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                            <circle
                                className="stroke-[#3A3A3A] fill-none"
                                strokeWidth="8"
                                r="40"
                                cx="50"
                                cy="50"
                            />
                            <circle
                                className="stroke-green-600 fill-none"
                                strokeWidth="8"
                                strokeLinecap="round"
                                strokeDasharray={`${completionPercentage * 2.51327}, 251.327`}
                                transform="rotate(-90 50 50)"
                                r="40"
                                cx="50"
                                cy="50"
                            />
                        </svg>
                    </div>

                    <div className="flex justify-between mt-2 text-xs">
                        <span className="flex items-center">
                            <span className="w-2 h-2 mr-2 bg-green-600 rounded-full"></span>
                            Pending
                        </span>
                        <span className="flex items-center">
                            <span className="w-2 h-2 mr-2 bg-green-300 rounded-full"></span>
                            Done
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}