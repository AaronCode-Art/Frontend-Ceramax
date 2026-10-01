export interface User {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  rol: string;
  activo: boolean;
  fechaRegistro?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  usuarioId: number;
  nombre: string;
  apellido: string;
  email: string;
  rol: string;
}
