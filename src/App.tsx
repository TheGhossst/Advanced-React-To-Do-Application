import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './lib/store/store'
import { NavBar } from './components/NavBar'
import { LandingPage } from './pages/LandingPage'

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="flex flex-col min-h-screen">
          <NavBar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
          </Routes>
          <footer className="py-6 border-t">
            <div className="container px-4 md:px-6">
              <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                © 2024 DoIt. All rights reserved.
              </p>
            </div>
          </footer>
        </div>
      </Router>
    </Provider>
  )
}