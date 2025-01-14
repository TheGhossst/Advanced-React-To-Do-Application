import { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'
import { Provider, useDispatch } from 'react-redux'
import { AnimatePresence } from 'framer-motion'
import { store } from './lib/store/store'
import { NavBar } from './components/NavBar'
import { LandingPage } from './pages/LandingPage'
import { Login } from './pages/Login'
import { auth } from './lib/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { setUser, clearUser } from './lib/store/authSlice'

function AppContent() {
  const location = useLocation()
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user))
      } else {
        dispatch(clearUser())
      }
    })

    return () => unsubscribe()
  }, [dispatch])

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AnimatePresence>
    </div>
  )
}

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppContent />
      </Router>
    </Provider>
  )
}