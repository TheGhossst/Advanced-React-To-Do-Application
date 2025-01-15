import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '../lib/store/themeSlice'
import { clearUser } from '../lib/store/authSlice'
import { RootState } from '../lib/store/store'
import { Moon, Sun } from 'lucide-react'
import { Button } from "./ui/button"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { auth } from '../lib/firebase'
import { signOut } from 'firebase/auth'

export function NavBar() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode)
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark')
        }
    })

    const handleThemeToggle = () => {
        dispatch(toggleTheme())
        document.documentElement.classList.toggle('dark')
    }

    const handleLogout = async () => {
        try {
            await signOut(auth)
            dispatch(clearUser())
            navigate('/')
        } catch (error) {
            console.error('Error signing out', error)
        }
    }

    return (
        <nav className="relative border-b">
            <div className="flex items-center justify-between h-16 px-4">
                <div className="flex items-center gap-2">
                    
                    <Link to="/">
                        <img
                            src="logo.png"
                            alt="DoIt Logo"
                            className="w-30 h-9"
                        />
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    {!isAuthenticated && location.pathname !== '/login' && (
                        <Link to="/login">
                            <Button variant="ghost">Login</Button>
                        </Link>
                    )}
                    {isAuthenticated && (
                        <Button variant="ghost" onClick={handleLogout}>
                            Logout
                        </Button>
                    )}
                    <Button variant="ghost" size="icon" onClick={handleThemeToggle}>
                        {isDarkMode ? (
                            <Sun className="w-5 h-5" />
                        ) : (
                            <Moon className="w-5 h-5" />
                        )}
                        <span className="sr-only">Toggle theme</span>
                    </Button>
                </div>
            </div>
        </nav>
    )
}