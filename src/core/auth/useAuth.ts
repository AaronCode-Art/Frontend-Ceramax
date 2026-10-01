import { useState, useEffect, useCallback } from 'react'
import { apiPost } from '../api/client'
import { API } from '../api/endpoints'
import type { User, LoginResponse } from './auth.types'

function decodeToken(token: string): User | null {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return {
      id: payload.sub ? Number(payload.sub) : payload.usuarioId ?? 0,
      nombre: payload.nombre ?? '',
      apellido: payload.apellido ?? '',
      email: payload.email ?? '',
      rol: payload.rol ?? payload.authorities?.[0]?.authority ?? '',
      activo: payload.activo ?? true,
      fechaRegistro: payload.fechaRegistro,
    }
  } catch {
    return null
  }
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(() => sessionStorage.getItem('ceramax_token'))
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const stored = sessionStorage.getItem('ceramax_token')
    if (stored) {
      const decoded = decodeToken(stored)
      if (decoded) {
        setToken(stored)
        setUser(decoded)
      } else {
        sessionStorage.removeItem('ceramax_token')
      }
    }
    setIsLoading(false)
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    const res = await apiPost<LoginResponse>(API.AUTH.LOGIN, { email, password })
    sessionStorage.setItem('ceramax_token', res.token)
    setToken(res.token)
    setUser({
      id: res.usuarioId,
      nombre: res.nombre,
      apellido: res.apellido,
      email: res.email,
      rol: res.rol,
      activo: true,
    })
    return res
  }, [])

  const logout = useCallback(async () => {
    try {
      await apiPost(API.AUTH.LOGOUT)
    } finally {
      sessionStorage.removeItem('ceramax_token')
      setToken(null)
      setUser(null)
    }
  }, [])

  return {
    user,
    token,
    isLoading,
    isAuthenticated: !!token && !!user,
    login,
    logout,
  }
}
