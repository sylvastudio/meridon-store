import { X, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { items, removeFromCart, updateQuantity, getTotal } = useCart();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`fixed top-0 right-0 h-full w-full max-w-[500px] bg-[#fae65f] border-l border-[#1f3a3a] z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } flex flex-col`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-6 border-b border-[#1f3a3a]">
          <h2 className="font-['Inter:Regular',sans-serif] font-normal text-[#1f3a3a] text-[24px] md:text-[32px]">
            Your bag
          </h2>
          <button 
            onClick={onClose}
            className="hover:opacity-70 transition-opacity"
          >
            <X className="w-8 h-8 text-[#1f3a3a]" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <p className="font-['Playfair_Display:Regular',sans-serif] text-[#1f3a3a] text-[18px] mb-6 text-center">
                Your bag is empty
              </p>
              <button
                onClick={onClose}
                className="bg-[#1f3a3a] inline-flex items-center justify-center px-[30px] py-[16px] rounded-[100px] hover:opacity-90"
              >
                <p className="font-['Inter:Regular',sans-serif] font-normal text-[#e2d15a] text-[16px]">
                  Continue Shopping
                </p>
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div 
                  key={item.id}
                  className="bg-[#eedb5a] border border-[#1f3a3a] rounded-[20px] p-4 flex gap-4"
                >
                  {/* Product Image */}
                  <div className="w-24 h-24 rounded-[12px] overflow-hidden flex-shrink-0 border border-[#1f3a3a]">
                    {item.image ? (
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#1f3a3a]/10" />
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-['Inter:Regular',sans-serif] font-normal text-[#1f3a3a] text-[16px] md:text-[18px] mb-1">
                        {item.name}
                      </h3>
                      <p className="font-['Playfair_Display:Regular',sans-serif] text-[#1f3a3a] text-[16px]">
                        ₦{item.price.toLocaleString()}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-3 bg-white border border-[#1f3a3a] rounded-[100px] px-3 py-1">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="text-[#1f3a3a] hover:opacity-70 font-['Inter:Regular',sans-serif] text-[18px] w-6 h-6 flex items-center justify-center"
                        >
                          −
                        </button>
                        <span className="font-['Inter:Regular',sans-serif] text-[#1f3a3a] text-[16px] w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="text-[#1f3a3a] hover:opacity-70 font-['Inter:Regular',sans-serif] text-[18px] w-6 h-6 flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-[#1f3a3a] hover:opacity-70 transition-opacity"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer - Checkout */}
        {items.length > 0 && (
          <div className="border-t border-[#1f3a3a] px-6 py-6 bg-[#eedb5a]">
            <div className="flex items-center justify-between mb-6">
              <p className="font-['Inter:Regular',sans-serif] font-normal text-[#1f3a3a] text-[20px] md:text-[24px]">
                Total
              </p>
              <p className="font-['Inter:Regular',sans-serif] font-normal text-[#1f3a3a] text-[20px] md:text-[24px]">
                ₦{getTotal().toLocaleString()}
              </p>
            </div>
            
            <Link
              to="/checkout"
              onClick={onClose}
              className="bg-[#1f3a3a] w-full flex items-center justify-center px-[30px] py-[16px] rounded-[100px] hover:opacity-90"
            >
              <p className="font-['Inter:Regular',sans-serif] font-normal text-[#e2d15a] text-[16px]">
                Checkout
              </p>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
