import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { RootState } from '../lib/store/store'

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}