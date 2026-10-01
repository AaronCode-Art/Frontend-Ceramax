import { useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { Box, Heart, LogOut, Search, Shield, ShoppingCart, Store, User } from 'lucide-react'
import { useClienteAuth } from '../../features/storefront/hooks/useClienteAuth'
import { CarritoProvider, useCarrito } from '../../features/storefront/context/CarritoContext'
import './StoreLayout.css'

function StoreHeader() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const { isAuthenticated, user, logout } = useClienteAuth()
  const { totalItems } = useCarrito()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const q = query.trim()
    navigate(q ? `/catalogo?q=${encodeURIComponent(q)}` : '/catalogo')
  }

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `store-nav__link ${isActive ? 'store-nav__link--active' : ''}`

  return (
    <header className="store-header">
      <div className="store-header__inner">
        <Link to="/" className="store-logo">
          <Box size={26} className="store-logo__icon" />
          <span className="store-logo__text">CeraMax</span>
        </Link>

        <nav className="store-nav">
          <NavLink to="/" end className={navLinkClass}>
            Inicio
          </NavLink>
          <NavLink to="/catalogo" className={navLinkClass}>
            Catálogo
          </NavLink>
        </nav>

        <form className="store-search" onSubmit={handleSearch}>
          <Search size={18} className="store-search__icon" />
          <input
            className="store-search__input"
            placeholder="Buscar productos..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>

        <div className="store-header__actions">
          <Link to="/lista-deseos" className="store-cart" title="Lista de deseos">
            <Heart size={22} />
          </Link>
          <Link to="/carrito" className="store-cart" title="Carrito">
            <ShoppingCart size={22} />
            {totalItems > 0 && (
              <span className="store-cart__badge">{totalItems > 99 ? '99+' : totalItems}</span>
            )}
          </Link>
          {isAuthenticated ? (
            <button className="store-session" onClick={handleLogout} title="Cerrar sesión">
              <User size={18} />
              <span>{user?.nombre}</span>
              <LogOut size={16} />
            </button>
          ) : (
            <Link to="/ingresar" className="store-session" title="Iniciar sesión">
              <User size={18} />
              <span>Ingresar</span>
            </Link>
          )}
          <Link to="/panel" className="store-admin" title="Panel de administración">
            <Shield size={20} />
            <span>Admin</span>
          </Link>
        </div>
      </div>
    </header>
  )
}

export function StoreLayout() {
  return (
    <CarritoProvider>
      <div className="store-layout">
        <StoreHeader />

        <main className="store-main">
          <Outlet />
        </main>

        <footer className="store-footer">
          <div className="store-footer__inner">
            <div className="store-footer__brand">
              <Store size={20} />
              <span className="store-footer__name">CeraMax</span>
              <p className="store-footer__tagline">Decoración y artículos de cerámica para tu hogar.</p>
            </div>
            <div className="store-footer__links">
              <h4>Tienda</h4>
              <Link to="/catalogo">Catálogo</Link>
              <Link to="/catalogo">Novedades</Link>
              <Link to="/catalogo">Ofertas</Link>
            </div>
            <div className="store-footer__links">
              <h4>Ayuda</h4>
              <Link to="/catalogo">Preguntas frecuentes</Link>
              <Link to="/catalogo">Envíos</Link>
              <Link to="/catalogo">Devoluciones</Link>
            </div>
            <Link to="/panel" className="store-footer__admin">
              <Shield size={16} />
              Acceso administración
            </Link>
          </div>
          <div className="store-footer__bottom">
            © {new Date().getFullYear()} CeraMax. Todos los derechos reservados.
          </div>
        </footer>
      </div>
    </CarritoProvider>
  )
}