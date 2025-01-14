import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '../lib/store/themeSlice'
import { RootState } from '../lib/store/store'
import { Menu, Search, Grid, Moon, Sun, X, LayoutGrid, List } from 'lucide-react'
import { Button } from "./ui/button"
import { Input } from "./ui/input"

export function NavBar() {
    const dispatch = useDispatch()
    const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode)
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [isGridOpen, setIsGridOpen] = useState(false)

    const handleThemeToggle = () => {
        dispatch(toggleTheme())
        document.documentElement.classList.toggle('dark')
    }

    return (
        <nav className="relative border-b">
            <div className="flex items-center h-16 px-4">
                <Button variant="ghost" size="icon">
                    <Menu className="w-6 h-6" />
                    <span className="sr-only">Toggle menu</span>
                </Button>

                <div className="flex items-center gap-2 mr-auto">
                    <img
                        src="logo.png"
                        alt="DoIt Logo"
                        className="w-30 h-9"
                    />
                </div>

                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(!isSearchOpen)}>
                        <Search className={`h-5 w-5 ${isSearchOpen ? 'text-primary' : ''}`} />
                        <span className="sr-only">Search</span>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => setIsGridOpen(!isGridOpen)}>
                        <Grid className={`h-5 w-5 ${isGridOpen ? 'text-primary' : ''}`} />
                        <span className="sr-only">View grid</span>
                    </Button>
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
            {isSearchOpen && (
                <div className="absolute left-0 w-full p-4 border-b top-16 bg-background">
                    <div className="flex items-center max-w-md gap-2 mx-auto">
                        <Input
                            type="search"
                            placeholder="Search..."
                            className="flex-1"
                        />
                        <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(false)}>
                            <X className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
            )}
            {isGridOpen && (
                <div className="absolute w-64 p-4 border rounded-lg shadow-lg top-16 right-4 bg-background">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold">View Options</h3>
                        <Button variant="ghost" size="icon" onClick={() => setIsGridOpen(false)}>
                            <X className="w-5 h-5" />
                        </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline" className="flex flex-col h-20 gap-2">
                            <LayoutGrid className="w-5 h-5" />
                            Grid View
                        </Button>
                        <Button variant="outline" className="flex flex-col h-20 gap-2">
                            <List className="w-5 h-5" />
                            List View
                        </Button>
                    </div>
                </div>
            )}
        </nav>
    )
}