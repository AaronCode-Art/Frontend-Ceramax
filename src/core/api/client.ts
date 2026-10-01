import axios, { type AxiosRequestConfig } from 'axios'
import { type ApiResponse } from './types'

const api = axios.create({
  baseURL: 'http://localhost:8090/api',
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('ceramax_token')
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => {
    const body = response.data as ApiResponse<unknown>
    if (body && typeof body === 'object' && 'success' in body) {
      response.data = body.data
    }
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      sessionStorage.removeItem('ceramax_token')
      const destino = window.location.pathname.startsWith('/panel') ? '/panel' : '/'
      window.location.href = destino
    }
    return Promise.reject(error)
  }
)

export async function apiGet<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const res = await api.get<T>(url, config)
  return res.data as T
}

export async function apiPost<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
  const res = await api.post<T>(url, data, config)
  return res.data as T
}

export async function apiPut<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
  const res = await api.put<T>(url, data, config)
  return res.data as T
}

export async function apiDelete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const res = await api.delete<T>(url, config)
  return res.data as T
}

export async function apiPatch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
  const res = await api.patch<T>(url, data, config)
  return res.data as T
}

export default api
