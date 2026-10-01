import { Outlet } from 'react-router-dom'
import { Box } from 'lucide-react'
import './AuthLayout.css'

interface AuthLayoutProps {
  children?: React.ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="auth-layout">
      <div className="auth-card">
        <div className="auth-brand">
          <div className="auth-logo">
            <Box size={32} className="auth-logo-icon" />
            <span className="auth-logo-text">CeraMax</span>
          </div>
          <p className="auth-tagline">Sistema de Gestión Comercial</p>
        </div>
        {children ?? <Outlet />}
      </div>
    </div>
  )
}
