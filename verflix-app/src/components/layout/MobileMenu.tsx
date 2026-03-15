import { useLocation, useNavigate } from 'react-router-dom'
import { Home, Film, Tv } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MobileMenuProps {
  onClose?: () => void
}

export function MobileMenu({ onClose }: MobileMenuProps) {
  const location = useLocation()
  const navigate = useNavigate()

  const menuItems = [
    { path: '/', label: 'Inicio', icon: Home },
    { path: '/movies', label: 'Películas', icon: Film },
    { path: '/tv', label: 'Series', icon: Tv }
  ]

  const handleNavigate = (path: string) => {
    navigate(path)
    onClose?.()
  }

  return (
    <nav className="flex flex-col gap-2" aria-label="Menú principal">
      {menuItems.map((item) => {
        const Icon = item.icon
        const isActive = location.pathname === item.path ||
                         location.pathname.startsWith(item.path + '/')

        return (
          <button
            key={item.path}
            onClick={() => handleNavigate(item.path)}
            className={cn(
              'flex items-center gap-3 px-4 py-3 rounded-md transition-colors',
              'text-base font-medium',
              isActive
                ? 'bg-accent text-accent-foreground'
                : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'
            )}
            aria-current={isActive ? 'page' : undefined}
          >
            <Icon className={cn('w-5 h-5', isActive ? 'text-netflix-red' : 'text-muted-foreground')} />
            <span>{item.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
