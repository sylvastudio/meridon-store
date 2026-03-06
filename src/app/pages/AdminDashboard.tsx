import { useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router';
import { supabase } from '../lib/supabase';
import { Package, ShoppingCart, LogOut } from 'lucide-react';

export default function AdminDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('admin_token');
      if (!token) { navigate('/admin/login'); return; }
      const { data: { user }, error } = await supabase.auth.getUser(token);
      if (error || !user) { localStorage.removeItem('admin_token'); navigate('/admin/login'); }
    };
    checkAuth();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('admin_token');
    navigate('/admin/login');
  };

  return (
    <div className="flex min-h-screen w-full bg-[#fae65f]">
      <div className="w-[280px] bg-[#1f3a3a] border-r border-[#fae65f] flex flex-col">
        <div className="p-8">
          <Link to="/" className="font-['Inter:Regular',sans-serif] font-normal text-[#fae65f] text-[28px]">Meridon Store</Link>
          <p className="font-['Playfair_Display:Regular',sans-serif] text-[#e2d15a] text-[16px] mt-2">Admin Panel</p>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <Link to="/admin/products" className="flex items-center gap-3 px-4 py-3 rounded-[20px] hover:bg-[#fae65f]/10 transition-colors group">
            <Package className="w-5 h-5 text-[#fae65f] group-hover:text-[#e2d15a]" />
            <span className="font-['Inter:Regular',sans-serif] text-[#fae65f] text-[18px] group-hover:text-[#e2d15a]">Products</span>
          </Link>
          <Link to="/admin/orders" className="flex items-center gap-3 px-4 py-3 rounded-[20px] hover:bg-[#fae65f]/10 transition-colors group">
            <ShoppingCart className="w-5 h-5 text-[#fae65f] group-hover:text-[#e2d15a]" />
            <span className="font-['Inter:Regular',sans-serif] text-[#fae65f] text-[18px] group-hover:text-[#e2d15a]">Orders</span>
          </Link>
        </nav>
        <div className="p-4">
          <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-3 rounded-[20px] hover:bg-[#fae65f]/10 transition-colors group">
            <LogOut className="w-5 h-5 text-[#fae65f] group-hover:text-[#e2d15a]" />
            <span className="font-['Inter:Regular',sans-serif] text-[#fae65f] text-[18px] group-hover:text-[#e2d15a]">Logout</span>
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-auto"><Outlet /></div>
    </div>
  );
}
