import Foooter from './components/common/Footer.tsx';
import Navbar from './components/common/Navbar.tsx';
import { Outlet } from 'react-router-dom';
export default function DashboardLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Foooter />
    </div>
  );
}