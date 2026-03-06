import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { supabase } from '../lib/supabase';
import { projectId, publicAnonKey } from '/utils/supabase/info';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({ email: formData.email, password: formData.password });
        if (error) { setError(error.message); }
        else if (data.session) { localStorage.setItem('admin_token', data.session.access_token); navigate('/admin'); }
      } else {
        const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-8965d177/signup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${publicAnonKey}` },
          body: JSON.stringify({ email: formData.email, password: formData.password, name: formData.name }),
        });
        const data = await response.json();
        if (response.ok && data.user) {
          const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({ email: formData.email, password: formData.password });
          if (loginError) { setError(loginError.message); }
          else if (loginData.session) { localStorage.setItem('admin_token', loginData.session.access_token); navigate('/admin'); }
        } else { setError(data.error || 'Signup failed'); }
      }
    } catch (err) {
      console.error('Auth error:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#fae65f]">
      <div className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-[500px]">
          <div className="bg-[#eedb5a] border border-[#1f3a3a] rounded-[40px] p-8">
            <Link to="/" className="inline-block mb-6 font-['Inter:Regular',sans-serif] text-[#1f3a3a] text-[18px] hover:underline">← Back to Store</Link>
            <h1 className="font-['Inter:Regular',sans-serif] font-normal text-[#1f3a3a] text-[40px] mb-2">Admin {isLogin ? 'Login' : 'Signup'}</h1>
            <p className="font-['Playfair_Display:Regular',sans-serif] font-normal text-[#1f3a3a] text-[18px] mb-8">{isLogin ? 'Sign in to manage your store' : 'Create an admin account'}</p>
            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div>
                  <label className="block font-['Inter:Regular',sans-serif] text-[#1f3a3a] text-[18px] mb-2">Name</label>
                  <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-6 py-4 rounded-[20px] border border-[#1f3a3a] bg-white font-['Inter:Regular',sans-serif] text-[#1f3a3a] text-[18px] focus:outline-none focus:ring-2 focus:ring-[#1f3a3a]" required={!isLogin} />
                </div>
              )}
              <div>
                <label className="block font-['Inter:Regular',sans-serif] text-[#1f3a3a] text-[18px] mb-2">Email</label>
                <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-6 py-4 rounded-[20px] border border-[#1f3a3a] bg-white font-['Inter:Regular',sans-serif] text-[#1f3a3a] text-[18px] focus:outline-none focus:ring-2 focus:ring-[#1f3a3a]" required />
              </div>
              <div>
                <label className="block font-['Inter:Regular',sans-serif] text-[#1f3a3a] text-[18px] mb-2">Password</label>
                <input type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="w-full px-6 py-4 rounded-[20px] border border-[#1f3a3a] bg-white font-['Inter:Regular',sans-serif] text-[#1f3a3a] text-[18px] focus:outline-none focus:ring-2 focus:ring-[#1f3a3a]" required minLength={6} />
              </div>
              {error && <div className="bg-red-100 border border-red-400 rounded-[20px] px-6 py-4"><p className="font-['Inter:Regular',sans-serif] text-red-700 text-[16px]">{error}</p></div>}
              <button type="submit" disabled={loading} className="bg-[#1f3a3a] flex items-center justify-center px-[40px] py-[20px] rounded-[100px] hover:opacity-90 w-full disabled:opacity-50 disabled:cursor-not-allowed">
                <p className="font-['Inter:Regular',sans-serif] font-normal text-[#e2d15a] text-[20px]">{loading ? 'Processing...' : (isLogin ? 'Login' : 'Create Account')}</p>
              </button>
            </form>
            <div className="mt-6 text-center">
              <button onClick={() => { setIsLogin(!isLogin); setError(''); }} className="font-['Inter:Regular',sans-serif] text-[#1f3a3a] text-[16px] hover:underline">
                {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Login'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
