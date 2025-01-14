import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '../lib/store/themeSlice'
import { RootState } from '../lib/store/store'
import { Menu, Moon, Sun } from 'lucide-react'
import { Button } from "./ui/button"
import { Link } from 'react-router-dom'

export function NavBar() {
    const dispatch = useDispatch()
    const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode)

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark')
        }
    })

    const handleThemeToggle = () => {
        dispatch(toggleTheme())
        document.documentElement.classList.toggle('dark')
    }

    return (
        <nav className="relative border-b">
            <div className="flex items-center justify-between h-16 px-4">
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                        <Menu className="w-6 h-6" />
                        <span className="sr-only">Toggle menu</span>
                    </Button>
                    <img
                        src="logo.png"
                        alt="DoIt Logo"
                        className="w-30 h-9"
                    />
                </div>

                <div className="flex items-center gap-4">
                    <Link to="/login">
                        <Button variant="ghost">Login</Button>
                    </Link>
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