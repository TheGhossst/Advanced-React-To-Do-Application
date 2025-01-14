import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'
import { Provider } from 'react-redux'
import { AnimatePresence } from 'framer-motion'
import { store } from './lib/store/store'
import { NavBar } from './components/NavBar'
import { LandingPage } from './pages/LandingPage'

function AppContent() {
  const location = useLocation()

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </AnimatePresence>
      <footer className="py-6 border-t">
        <div className="container px-4 mx-auto md:px-6">
          <p className="text-sm text-center text-gray-500 dark:text-gray-400">
            © 2024 DoIt. All rights reserved.
          </p>
        </div>
      </footer>

    </div>
  )
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppContent />
      </Router>
    </Provider>
  )
}

export default App

