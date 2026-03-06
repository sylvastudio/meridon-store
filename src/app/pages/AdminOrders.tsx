import { useEffect, useState } from 'react';
import { projectId } from '/utils/supabase/info';

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    const token = localStorage.getItem('admin_token');
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-8965d177/orders`, { headers: { 'Authorization': `Bearer ${token}` } });
      const data = await response.json();
      setOrders((data.orders || []).sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOrders(); }, []);

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    const token = localStorage.getItem('admin_token');
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-8965d177/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ status: newStatus }),
      });
      if (response.ok) { await fetchOrders(); } else { alert('Failed to update order status'); }
    } catch (error) {
      console.error('Error updating order:', error);
      alert('Failed to update order status');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-200 text-yellow-800';
      case 'processing': return 'bg-blue-200 text-blue-800';
      case 'shipped': return 'bg-purple-200 text-purple-800';
      case 'delivered': return 'bg-green-200 text-green-800';
      case 'cancelled': return 'bg-red-200 text-red-800';
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <div className="p-8">
      <h1 className="font-['Inter:Regular',sans-serif] font-normal text-[#1f3a3a] text-[40px] mb-8">Orders</h1>
      {loading ? (
        <p className="font-['Inter:Regular',sans-serif] text-[#1f3a3a] text-[20px]">Loading...</p>
      ) : orders.length === 0 ? (
        <p className="font-['Inter:Regular',sans-serif] text-[#1f3a3a] text-[20px]">No orders yet</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-[#eedb5a] border border-[#1f3a3a] rounded-[30px] p-6">
              <div className="flex flex-wrap justify-between items-start mb-4">
                <div>
                  <h3 className="font-['Inter:Regular',sans-serif] text-[#1f3a3a] text-[24px] mb-2">Order #{order.id.slice(0, 8)}</h3>
                  <p className="font-['Inter:Regular',sans-serif] text-[#1f3a3a] text-[16px]">{new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                </div>
                <div className="flex gap-2 items-center">
                  <span className={`px-4 py-2 rounded-[15px] font-['Inter:Regular',sans-serif] text-[14px] ${getStatusColor(order.status)}`}>{order.status}</span>
                  <select value={order.status} onChange={(e) => updateOrderStatus(order.id, e.target.value)} className="px-4 py-2 rounded-[15px] border border-[#1f3a3a] bg-white font-['Inter:Regular',sans-serif] text-[14px]">
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <h4 className="font-['Inter:Regular',sans-serif] text-[#1f3a3a] text-[18px] mb-2">Customer Details</h4>
                  <div className="space-y-1">
                    <p className="font-['Inter:Regular',sans-serif] text-[#1f3a3a] text-[16px]"><strong>Name:</strong> {order.customerName}</p>
                    <p className="font-['Inter:Regular',sans-serif] text-[#1f3a3a] text-[16px]"><strong>Email:</strong> {order.customerEmail}</p>
                    <p className="font-['Inter:Regular',sans-serif] text-[#1f3a3a] text-[16px]"><strong>Phone:</strong> {order.customerPhone}</p>
                    <p className="font-['Inter:Regular',sans-serif] text-[#1f3a3a] text-[16px]"><strong>Address:</strong> {order.customerAddress}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-['Inter:Regular',sans-serif] text-[#1f3a3a] text-[18px] mb-2">Order Items</h4>
                  <div className="space-y-2">
                    {order.items.map((item: any, index: number) => (
                      <div key={index} className="flex justify-between">
                        <span className="font-['Inter:Regular',sans-serif] text-[#1f3a3a] text-[16px]">{item.name} x {item.quantity}</span>
                        <span className="font-['Inter:Regular',sans-serif] text-[#1f3a3a] text-[16px]">₦{(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                    <div className="border-t border-[#1f3a3a] pt-2 mt-2">
                      <div className="flex justify-between">
                        <span className="font-['Inter:Regular',sans-serif] font-bold text-[#1f3a3a] text-[18px]">Total:</span>
                        <span className="font-['Inter:Regular',sans-serif] font-bold text-[#1f3a3a] text-[18px]">₦{order.total.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {order.paymentReference && <p className="font-['Inter:Regular',sans-serif] text-[#1f3a3a] text-[14px]"><strong>Payment Reference:</strong> {order.paymentReference}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
