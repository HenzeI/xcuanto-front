import { Outlet } from 'react-router-dom'
import { AdminSidebar } from '../components/admin/AdminSidebar'

export function AdminLayout() {
  return (
    <div className="min-h-screen flex bg-zinc-950 text-white">
      <AdminSidebar />
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  )
}
