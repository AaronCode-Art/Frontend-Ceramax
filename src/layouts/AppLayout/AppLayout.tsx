import { useState } from 'react'
import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../core/auth/useAuth'
import {
  LayoutDashboard,
  Package,
  Tag,
  Building2,
  MapPin,
  ShoppingCart,
  Warehouse,
  Box,
  ArrowLeftRight,
  CreditCard,
  Truck,
  RotateCcw,
  ShoppingBag,
  Ticket,
  Users,
  Shield,
  BarChart3,
  FileText,
  ClipboardList,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Store,
} from 'lucide-react'
import './AppLayout.css'

interface NavItem {
  label: string
  path: string
  icon: React.ReactNode
  roles: ('admin' | 'vendedor')[]
}

interface NavSection {
  title: string
  items: NavItem[]
}

const navSections: NavSection[] = [
  {
    title: '',
    items: [
      { label: 'Panel', path: '/panel/panel', icon: <LayoutDashboard size={20} />, roles: ['admin', 'vendedor'] },
    ],
  },
  {
    title: 'Gestión',
    items: [
      { label: 'Productos', path: '/panel/productos', icon: <Package size={20} />, roles: ['admin'] },
      { label: 'Categorías', path: '/panel/categorias', icon: <Tag size={20} />, roles: ['admin'] },
      { label: 'Marcas', path: '/panel/marcas', icon: <Building2 size={20} />, roles: ['admin'] },
      { label: 'Proveedores', path: '/panel/proveedores', icon: <Truck size={20} />, roles: ['admin'] },
      { label: 'Sucursales', path: '/panel/sucursales', icon: <MapPin size={20} />, roles: ['admin'] },
    ],
  },
  {
    title: 'Inventario',
    items: [
      { label: 'Almacenes', path: '/panel/almacenes', icon: <Warehouse size={20} />, roles: ['admin'] },
      { label: 'Stock', path: '/panel/inventario', icon: <Box size={20} />, roles: ['admin'] },
      { label: 'Movimientos', path: '/panel/movimientos', icon: <ArrowLeftRight size={20} />, roles: ['admin'] },
    ],
  },
  {
    title: 'Ventas',
    items: [
      { label: 'Pedidos', path: '/panel/ventas', icon: <ShoppingCart size={20} />, roles: ['admin', 'vendedor'] },
      { label: 'Pagos', path: '/panel/pagos', icon: <CreditCard size={20} />, roles: ['admin'] },
      { label: 'Envíos', path: '/panel/envios', icon: <Truck size={20} />, roles: ['admin'] },
      { label: 'Devoluciones', path: '/panel/devoluciones', icon: <RotateCcw size={20} />, roles: ['admin'] },
    ],
  },
  {
    title: 'Compras',
    items: [
      { label: 'Órdenes', path: '/panel/ordenes-compra', icon: <ShoppingBag size={20} />, roles: ['admin'] },
      { label: 'Cupones', path: '/panel/cupones', icon: <Ticket size={20} />, roles: ['admin'] },
    ],
  },
  {
    title: 'Clientes',
    items: [
      { label: 'Usuarios', path: '/panel/usuarios', icon: <Users size={20} />, roles: ['admin'] },
      { label: 'Roles', path: '/panel/roles', icon: <Shield size={20} />, roles: ['admin'] },
    ],
  },
  {
    title: 'Informes',
    items: [
      { label: 'Dashboard', path: '/panel/reportes', icon: <BarChart3 size={20} />, roles: ['admin'] },
      { label: 'Reportes', path: '/panel/reportes', icon: <FileText size={20} />, roles: ['admin'] },
      { label: 'Auditoría', path: '/panel/auditoria', icon: <ClipboardList size={20} />, roles: ['admin'] },
    ],
  },
  {
    title: 'Configuración',
    items: [
      { label: 'Configuración', path: '/panel/configuracion', icon: <Settings size={20} />, roles: ['admin'] },
    ],
  },
]

export function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const filteredSections = navSections.map((section) => ({
    ...section,
    items: section.items.filter((item) => item.roles.includes(user?.rol as 'admin' | 'vendedor')),
  })).filter((section) => section.items.length > 0)

  const handleLogout = () => {
    logout()
    navigate('/panel')
  }

  return (
    <div className="app-layout">
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`sidebar ${sidebarOpen ? 'sidebar--open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <Box size={28} className="logo-icon" />
            <span className="logo-text">CeraMax</span>
          </div>
          <button className="sidebar-close" onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {filteredSections.map((section, i) => (
            <div key={i} className="nav-section">
              {section.title && <div className="nav-section-title">{section.title}</div>}
              {section.items.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive }) => `nav-item ${isActive ? 'nav-item--active' : ''}`}
                  onClick={() => setSidebarOpen(false)}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </div>
          ))}
        </nav>
      </aside>

      <div className="main-content">
        <header className="topbar">
          <button className="hamburger" onClick={() => setSidebarOpen(true)}>
            <Menu size={24} />
          </button>

          <div className="topbar-right">
            <Link to="/" className="topbar-store-link" title="Ver tienda">
              <Store size={20} />
              <span>Tienda</span>
            </Link>

            <button className="topbar-icon-btn">
              <Bell size={20} />
            </button>

            <div className="topbar-user">
              <div className="user-avatar">
                {user?.nombre?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <div className="user-info">
                <span className="user-name">{user?.nombre || 'Usuario'}</span>
                <span className="user-role">{user?.rol || 'vendedor'}</span>
              </div>
            </div>

            <button className="logout-btn" onClick={handleLogout} title="Cerrar sesión">
              <LogOut size={20} />
            </button>
          </div>
        </header>

        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
