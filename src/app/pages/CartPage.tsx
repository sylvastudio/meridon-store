import { Link } from 'react-router';
import { useCart } from '../context/CartContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Trash2 } from 'lucide-react';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, getTotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="flex flex-col min-h-screen w-full">
        <Header />
        <div className="bg-[#fae65f] flex-1 flex flex-col items-center justify-center py-20">
          <p className="font-['Inter:Regular',sans-serif] text-[#1f3a3a] text-[32px] mb-8">Your cart is empty</p>
          <Link to="/shop" className="bg-[#1f3a3a] inline-flex items-center justify-center px-[40px] py-[20px] rounded-[100px] hover:opacity-90">
            <p className="font-['Inter:Regular',sans-serif] font-normal text-[#e2d15a] text-[20px]">Continue Shopping</p>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header />
      
      <div className="bg-[#fae65f] flex-1 py-12">
        <div className="max-w-[1200px] mx-auto px-4">
          <h1 className="font-['Inter:Regular',sans-serif] font-normal text-[#1f3a3a] text-[40px] md:text-[56px] mb-12">
            Shopping Cart
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#eedb5a] border border-[#1f3a3a] rounded-[40px] p-6 flex flex-col md:flex-row gap-6"
                >
                  <Link to={`/product/${item.id}`} className="w-full md:w-[150px] h-[150px] rounded-[20px] overflow-clip border border-[#1f3a3a] bg-white shrink-0">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <p className="text-[#1f3a3a]">No image</p>
                      </div>
                    )}
                  </Link>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <Link to={`/product/${item.id}`} className="font-['Inter:Regular',sans-serif] font-normal text-[#1f3a3a] text-[24px] hover:underline">
                        {item.name}
                      </Link>
                      <p className="font-['Inter:Regular',sans-serif] font-normal text-[#1f3a3a] text-[20px] mt-2">
                        ₦{item.price.toLocaleString()}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-4 border border-[#1f3a3a] rounded-[20px] px-4 py-2">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-[#1f3a3a] text-[20px] font-bold hover:opacity-60">−</button>
                        <span className="font-['Inter:Regular',sans-serif] text-[#1f3a3a] text-[18px] min-w-[30px] text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-[#1f3a3a] text-[20px] font-bold hover:opacity-60">+</button>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="p-3 hover:bg-[#1f3a3a]/10 rounded-full transition-colors" aria-label="Remove item">
                        <Trash2 className="w-5 h-5 text-[#1f3a3a]" />
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-['Inter:Regular',sans-serif] font-normal text-[#1f3a3a] text-[24px]">
                      ₦{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-[#eedb5a] border border-[#1f3a3a] rounded-[40px] p-8 sticky top-4">
                <h2 className="font-['Inter:Regular',sans-serif] font-normal text-[#1f3a3a] text-[28px] mb-6">Order Summary</h2>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <p className="font-['Inter:Regular',sans-serif] text-[#1f3a3a] text-[18px]">Subtotal</p>
                    <p className="font-['Inter:Regular',sans-serif] text-[#1f3a3a] text-[18px]">₦{getTotal().toLocaleString()}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="font-['Inter:Regular',sans-serif] text-[#1f3a3a] text-[18px]">Shipping</p>
                    <p className="font-['Inter:Regular',sans-serif] text-[#1f3a3a] text-[18px]">{getTotal() >= 200000 ? 'Free' : '₦5,000'}</p>
                  </div>
                  <div className="border-t border-[#1f3a3a] pt-4">
                    <div className="flex justify-between">
                      <p className="font-['Inter:Regular',sans-serif] font-normal text-[#1f3a3a] text-[24px]">Total</p>
                      <p className="font-['Inter:Regular',sans-serif] font-normal text-[#1f3a3a] text-[24px]">₦{(getTotal() + (getTotal() >= 200000 ? 0 : 5000)).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
                <Link to="/checkout" className="bg-[#1f3a3a] flex items-center justify-center px-[40px] py-[20px] rounded-[100px] hover:opacity-90 w-full">
                  <p className="font-['Inter:Regular',sans-serif] font-normal text-[#e2d15a] text-[20px]">Proceed to Checkout</p>
                </Link>
                <Link to="/shop" className="block text-center mt-4 font-['Inter:Regular',sans-serif] text-[#1f3a3a] text-[18px] hover:underline">Continue Shopping</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
