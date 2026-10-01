import { Navigate } from 'react-router-dom'
import { useAuth } from './useAuth'

interface RequireRoleProps {
  roles: string[]
  children: React.ReactNode
}

export default function RequireRole({ roles, children }: RequireRoleProps) {
  const { user, isAuthenticated } = useAuth()

  if (!isAuthenticated || !user) {
    return <Navigate to="/panel" replace />
  }

  if (!roles.includes(user.rol)) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}
