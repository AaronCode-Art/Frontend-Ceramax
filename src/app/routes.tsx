import { lazy, Suspense } from 'react'
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../core/auth/useAuth'
import { AuthLayout } from '../layouts/AuthLayout/AuthLayout'
import { AppLayout } from '../layouts/AppLayout/AppLayout'
import { StoreLayout } from '../layouts/StoreLayout/StoreLayout'
import { HomePage } from '../features/storefront/pages/HomePage/HomePage'
import { CatalogoPage } from '../features/storefront/pages/CatalogoPage/CatalogoPage'
import { ProductoPage } from '../features/storefront/pages/ProductoPage/ProductoPage'
import { CartPage } from '../features/storefront/pages/CartPage/CartPage'
import { IngresarPage } from '../features/storefront/pages/IngresarPage/IngresarPage'
import { RegistroPage } from '../features/storefront/pages/RegistroPage/RegistroPage'
import { DeseosPage } from '../features/storefront/pages/DeseosPage/DeseosPage'
import { CheckoutPage } from '../features/storefront/pages/CheckoutPage/CheckoutPage'
import { CheckoutSuccessPage } from '../features/storefront/pages/CheckoutSuccessPage/CheckoutSuccessPage'

const LoginPage = lazy(() => import('../features/auth/pages/LoginPage/LoginPage').then(m => ({ default: m.LoginPage })))
const DashboardPage = lazy(() => import('../features/reportes/pages/DashboardPage/DashboardPage').then(m => ({ default: m.DashboardPage })))
const ProductosPage = lazy(() => import('../features/products/pages/ProductosPage/ProductosPage').then(m => ({ default: m.ProductosPage })))
const CategoriasPage = lazy(() => import('../features/categorias/pages/CategoriasPage/CategoriasPage').then(m => ({ default: m.CategoriasPage })))
const MarcasPage = lazy(() => import('../features/brands/pages/MarcasPage/MarcasPage').then(m => ({ default: m.MarcasPage })))
const ProveedoresPage = lazy(() => import('../features/suppliers/pages/ProveedoresPage/ProveedoresPage').then(m => ({ default: m.ProveedoresPage })))
const SucursalesPage = lazy(() => import('../features/sucursales/pages/SucursalesPage/SucursalesPage').then(m => ({ default: m.SucursalesPage })))
const AlmacenesPage = lazy(() => import('../features/warehouses/pages/AlmacenesPage/AlmacenesPage').then(m => ({ default: m.AlmacenesPage })))
const InventarioPage = lazy(() => import('../features/inventory/pages/InventarioPage/InventarioPage').then(m => ({ default: m.InventarioPage })))
const MovimientosPage = lazy(() => import('../features/inventory/pages/MovimientosPage/MovimientosPage').then(m => ({ default: m.MovimientosPage })))
const VentasPage = lazy(() => import('../features/ventas/pages/VentasPage/VentasPage').then(m => ({ default: m.VentasPage })))
const PagosPage = lazy(() => import('../features/payments/pages/PagosPage/PagosPage').then(m => ({ default: m.PagosPage })))
const EnviosPage = lazy(() => import('../features/shipping/pages/EnviosPage/EnviosPage').then(m => ({ default: m.EnviosPage })))
const DevolucionesPage = lazy(() => import('../features/returns/pages/DevolucionesPage/DevolucionesPage').then(m => ({ default: m.DevolucionesPage })))
const OrdenesCompraPage = lazy(() => import('../features/purchases/pages/OrdenesCompraPage/OrdenesCompraPage').then(m => ({ default: m.OrdenesCompraPage })))
const CuponesPage = lazy(() => import('../features/coupons/pages/CuponesPage/CuponesPage').then(m => ({ default: m.CuponesPage })))
const UsuariosPage = lazy(() => import('../features/usuarios/pages/UsuariosPage/UsuariosPage').then(m => ({ default: m.UsuariosPage })))
const RolesPage = lazy(() => import('../features/usuarios/pages/RolesPage/RolesPage').then(m => ({ default: m.RolesPage })))
const ReportesPage = lazy(() => import('../features/reportes/pages/ReportesPage/ReportesPage').then(m => ({ default: m.ReportesPage })))
const AuditoriaPage = lazy(() => import('../features/audit/pages/AuditoriaPage/AuditoriaPage').then(m => ({ default: m.AuditoriaPage })))

function LoadingFallback() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '400px', color: '#6b7280', fontSize: '0.875rem' }}>
      Cargando...
    </div>
  )
}

function SuspenseWrapper() {
  return <Suspense fallback={<LoadingFallback />}><Outlet /></Suspense>
}

function RequireAuth() {
  const { isAuthenticated, isLoading, user } = useAuth()
  if (isLoading) return <LoadingFallback />
  if (!isAuthenticated) return <Navigate to="/panel" replace />
  if (user && user.rol.toUpperCase() === 'CLIENTE') return <Navigate to="/" replace />
  return <Outlet />
}

function RequireRole({ allowedRoles }: { allowedRoles: string[] }) {
  const { user } = useAuth()
  if (!user || !allowedRoles.includes(user.rol)) return <Navigate to="/panel/panel" replace />
  return <Outlet />
}

function PanelIndex() {
  const { isAuthenticated, isLoading } = useAuth()
  if (isLoading) return <LoadingFallback />
  if (isAuthenticated) return <Navigate to="/panel/panel" replace />
  return (
    <AuthLayout>
      <Suspense fallback={<LoadingFallback />}>
        <LoginPage />
      </Suspense>
    </AuthLayout>
  )
}

export const router = createBrowserRouter([
  {
    element: <StoreLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/catalogo', element: <CatalogoPage /> },
      { path: '/producto/:id', element: <ProductoPage /> },
      { path: '/ingresar', element: <IngresarPage /> },
      { path: '/registro', element: <RegistroPage /> },
      { path: '/lista-deseos', element: <DeseosPage /> },
      { path: '/carrito', element: <CartPage /> },
      { path: '/checkout', element: <CheckoutPage /> },
      { path: '/pedido-exitoso', element: <CheckoutSuccessPage /> },
    ],
  },
  {
    path: '/panel',
    children: [
      { index: true, element: <PanelIndex /> },
      {
        element: <RequireAuth />,
        children: [
          {
            element: <AppLayout />,
            children: [
              {
                element: <SuspenseWrapper />,
                children: [
                  { path: 'panel', element: <DashboardPage /> },
                  { path: 'productos', element: <RequireRole allowedRoles={['admin']} />, children: [{ index: true, element: <ProductosPage /> }] },
                  { path: 'categorias', element: <RequireRole allowedRoles={['admin']} />, children: [{ index: true, element: <CategoriasPage /> }] },
                  { path: 'marcas', element: <RequireRole allowedRoles={['admin']} />, children: [{ index: true, element: <MarcasPage /> }] },
                  { path: 'proveedores', element: <RequireRole allowedRoles={['admin']} />, children: [{ index: true, element: <ProveedoresPage /> }] },
                  { path: 'sucursales', element: <RequireRole allowedRoles={['admin']} />, children: [{ index: true, element: <SucursalesPage /> }] },
                  { path: 'almacenes', element: <RequireRole allowedRoles={['admin']} />, children: [{ index: true, element: <AlmacenesPage /> }] },
                  { path: 'inventario', element: <RequireRole allowedRoles={['admin']} />, children: [{ index: true, element: <InventarioPage /> }] },
                  { path: 'movimientos', element: <RequireRole allowedRoles={['admin']} />, children: [{ index: true, element: <MovimientosPage /> }] },
                  { path: 'ventas', element: <VentasPage /> },
                  { path: 'pagos', element: <RequireRole allowedRoles={['admin']} />, children: [{ index: true, element: <PagosPage /> }] },
                  { path: 'envios', element: <RequireRole allowedRoles={['admin']} />, children: [{ index: true, element: <EnviosPage /> }] },
                  { path: 'devoluciones', element: <RequireRole allowedRoles={['admin']} />, children: [{ index: true, element: <DevolucionesPage /> }] },
                  { path: 'ordenes-compra', element: <RequireRole allowedRoles={['admin']} />, children: [{ index: true, element: <OrdenesCompraPage /> }] },
                  { path: 'cupones', element: <RequireRole allowedRoles={['admin']} />, children: [{ index: true, element: <CuponesPage /> }] },
                  { path: 'usuarios', element: <RequireRole allowedRoles={['admin']} />, children: [{ index: true, element: <UsuariosPage /> }] },
                  { path: 'roles', element: <RequireRole allowedRoles={['admin']} />, children: [{ index: true, element: <RolesPage /> }] },
                  { path: 'reportes', element: <RequireRole allowedRoles={['admin']} />, children: [{ index: true, element: <ReportesPage /> }] },
                  { path: 'auditoria', element: <RequireRole allowedRoles={['admin']} />, children: [{ index: true, element: <AuditoriaPage /> }] },
                  { path: '*', element: <Navigate to="/panel/panel" replace /> },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  { path: '*', element: <Navigate to="/" replace /> },
])