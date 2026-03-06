import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useCart } from '../context/CartContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { projectId, publicAnonKey } from '/utils/supabase/info';

declare global {
  interface Window {
    PaystackPop: any;
  }
}

export default function CheckoutPage() {
  const { items, getTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    customerAddress: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [paystackLoaded, setPaystackLoaded] = useState(false);

  const shippingCost = getTotal() >= 200000 ? 0 : 5000;
  const total = getTotal() + shippingCost;

  useEffect(() => {
    if (!document.getElementById('paystack-script')) {
      const script = document.createElement('script');
      script.id = 'paystack-script';
      script.src = 'https://js.paystack.co/v1/inline.js';
      script.onload = () => setPaystackLoaded(true);
      document.body.appendChild(script);
    } else {
      setPaystackLoaded(true);
    }
  }, []);

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!formData.customerName || !formData.customerEmail || !formData.customerPhone || !formData.customerAddress) {
      setError('Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      const handler = window.PaystackPop.setup({
        key: 'pk_test_YOUR_PUBLIC_KEY',
        email: formData.customerEmail,
        amount: total * 100,
        currency: 'NGN',
        ref: `MER-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        callback: async function(response: any) {
          const paymentReference = response.reference;
          try {
            const orderResponse = await fetch(
              `https://${projectId}.supabase.co/functions/v1/make-server-8965d177/orders`,
              {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${publicAnonKey}` },
                body: JSON.stringify({
                  ...formData,
                  items: items.map(item => ({ id: item.id, name: item.name, price: item.price, quantity: item.quantity })),
                  total,
                  paymentReference,
                }),
              }
            );
            const orderData = await orderResponse.json();
            if (orderData.order) {
              clearCart();
              navigate(`/order-success/${orderData.order.id}`);
            } else {
              setError('Order creation failed. Please contact support with reference: ' + paymentReference);
            }
          } catch (err) {
            console.error('Error creating order:', err);
            setError('Failed to create order. Please contact support with reference: ' + paymentReference);
          }
          setLoading(false);
        },
        onClose: function() {
          setLoading(false);
          setError('Payment cancelled');
        },
      });
      handler.openIframe();
    } catch (err) {
      console.error('Error initializing payment:', err);
      setError('Payment system error. Please try again or contact support.');
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header />
      <div className="bg-[#fae65f] flex-1 py-12">
        <div className="max-w-[1200px] mx-auto px-4">
          <h1 className="font-['Inter:Regular',sans-serif] font-normal text-[#1f3a3a] text-[40px] md:text-[56px] mb-12">Checkout</h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-[#eedb5a] border border-[#1f3a3a] rounded-[40px] p-8">
                <h2 className="font-['Inter:Regular',sans-serif] font-normal text-[#1f3a3a] text-[28px] mb-6">Delivery Information</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {[['Full Name', 'text', 'customerName'], ['Email Address', 'email', 'customerEmail'], ['Phone Number', 'tel', 'customerPhone']].map(([label, type, field]) => (
                    <div key={field}>
                      <label className="block font-['Inter:Regular',sans-serif] text-[#1f3a3a] text-[18px] mb-2">{label} *</label>
                      <input type={type} value={formData[field as keyof typeof formData]} onChange={(e) => setFormData({ ...formData, [field]: e.target.value })} className="w-full px-6 py-4 rounded-[20px] border border-[#1f3a3a] bg-white font-['Inter:Regular',sans-serif] text-[#1f3a3a] text-[18px] focus:outline-none focus:ring-2 focus:ring-[#1f3a3a]" required />
                    </div>
                  ))}
                  <div>
                    <label className="block font-['Inter:Regular',sans-serif] text-[#1f3a3a] text-[18px] mb-2">Delivery Address *</label>
                    <textarea value={formData.customerAddress} onChange={(e) => setFormData({ ...formData, customerAddress: e.target.value })} rows={4} className="w-full px-6 py-4 rounded-[20px] border border-[#1f3a3a] bg-white font-['Inter:Regular',sans-serif] text-[#1f3a3a] text-[18px] focus:outline-none focus:ring-2 focus:ring-[#1f3a3a] resize-none" required />
                  </div>
                  {error && <div className="bg-red-100 border border-red-400 rounded-[20px] px-6 py-4"><p className="font-['Inter:Regular',sans-serif] text-red-700 text-[16px]">{error}</p></div>}
                  <button type="submit" disabled={loading || !paystackLoaded} className="bg-[#1f3a3a] flex items-center justify-center px-[40px] py-[20px] rounded-[100px] hover:opacity-90 w-full disabled:opacity-50 disabled:cursor-not-allowed">
                    <p className="font-['Inter:Regular',sans-serif] font-normal text-[#e2d15a] text-[20px]">{loading ? 'Processing...' : `Pay ₦${total.toLocaleString()}`}</p>
                  </button>
                </form>
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="bg-[#eedb5a] border border-[#1f3a3a] rounded-[40px] p-8 sticky top-4">
                <h2 className="font-['Inter:Regular',sans-serif] font-normal text-[#1f3a3a] text-[28px] mb-6">Order Summary</h2>
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <p className="font-['Inter:Regular',sans-serif] text-[#1f3a3a] text-[16px]">{item.name} x {item.quantity}</p>
                      <p className="font-['Inter:Regular',sans-serif] text-[#1f3a3a] text-[16px]">₦{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
                <div className="border-t border-[#1f3a3a] pt-4 space-y-3">
                  <div className="flex justify-between"><p className="font-['Inter:Regular',sans-serif] text-[#1f3a3a] text-[18px]">Subtotal</p><p className="font-['Inter:Regular',sans-serif] text-[#1f3a3a] text-[18px]">₦{getTotal().toLocaleString()}</p></div>
                  <div className="flex justify-between"><p className="font-['Inter:Regular',sans-serif] text-[#1f3a3a] text-[18px]">Shipping</p><p className="font-['Inter:Regular',sans-serif] text-[#1f3a3a] text-[18px]">{shippingCost === 0 ? 'Free' : `₦${shippingCost.toLocaleString()}`}</p></div>
                  <div className="border-t border-[#1f3a3a] pt-3"><div className="flex justify-between"><p className="font-['Inter:Regular',sans-serif] font-normal text-[#1f3a3a] text-[24px]">Total</p><p className="font-['Inter:Regular',sans-serif] font-normal text-[#1f3a3a] text-[24px]">₦{total.toLocaleString()}</p></div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
