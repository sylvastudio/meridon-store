import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CheckCircle } from 'lucide-react';
import { projectId, publicAnonKey } from '/utils/supabase/info';

export default function OrderSuccessPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    if (!orderId) return;
    fetch(`https://${projectId}.supabase.co/functions/v1/make-server-8965d177/orders/${orderId}`, {
      headers: { 'Authorization': `Bearer ${publicAnonKey}` },
    })
      .then(res => res.json())
      .then(data => { if (data.order) setOrder(data.order); })
      .catch(error => console.error('Error fetching order:', error));
  }, [orderId]);

  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header />
      <div className="bg-[#fae65f] flex-1 flex items-center justify-center py-20">
        <div className="max-w-[800px] w-full mx-auto px-4">
          <div className="bg-[#eedb5a] border border-[#1f3a3a] rounded-[40px] p-12 text-center">
            <div className="flex justify-center mb-6">
              <CheckCircle className="w-20 h-20 text-green-600" />
            </div>
            <h1 className="font-['Inter:Regular',sans-serif] font-normal text-[#1f3a3a] text-[40px] md:text-[48px] mb-4">Order Successful!</h1>
            <p className="font-['Playfair_Display:Regular',sans-serif] font-normal text-[#1f3a3a] text-[20px] mb-8">
              Thank you for your purchase. We've received your order and will process it shortly.
            </p>
            {order && (
              <div className="bg-white rounded-[20px] border border-[#1f3a3a] p-6 mb-8 text-left">
                <h2 className="font-['Inter:Regular',sans-serif] font-normal text-[#1f3a3a] text-[24px] mb-4">Order Details</h2>
                <div className="space-y-2">
                  <p className="font-['Inter:Regular',sans-serif] text-[#1f3a3a] text-[16px]"><strong>Order ID:</strong> {order.id}</p>
                  <p className="font-['Inter:Regular',sans-serif] text-[#1f3a3a] text-[16px]"><strong>Name:</strong> {order.customerName}</p>
                  <p className="font-['Inter:Regular',sans-serif] text-[#1f3a3a] text-[16px]"><strong>Email:</strong> {order.customerEmail}</p>
                  <p className="font-['Inter:Regular',sans-serif] text-[#1f3a3a] text-[16px]"><strong>Total:</strong> ₦{order.total.toLocaleString()}</p>
                  {order.paymentReference && (
                    <p className="font-['Inter:Regular',sans-serif] text-[#1f3a3a] text-[16px]"><strong>Payment Reference:</strong> {order.paymentReference}</p>
                  )}
                </div>
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/shop" className="bg-[#1f3a3a] inline-flex items-center justify-center px-[40px] py-[20px] rounded-[100px] hover:opacity-90">
                <p className="font-['Inter:Regular',sans-serif] font-normal text-[#e2d15a] text-[20px]">Continue Shopping</p>
              </Link>
              <Link to="/" className="border border-[#1f3a3a] inline-flex items-center justify-center px-[40px] py-[20px] rounded-[100px] hover:bg-[#1f3a3a]/10">
                <p className="font-['Inter:Regular',sans-serif] font-normal text-[#1f3a3a] text-[20px]">Back to Home</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
