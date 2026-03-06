import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router';
import { useCart } from '../context/CartContext';
import Header from '../components/Header';
import MarqueeBar from '../components/MarqueeBar';
import Footer from '../components/Footer';
import { projectId, publicAnonKey } from '/utils/supabase/info';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!id) return;
    
    setLoading(true);
    fetch(`https://${projectId}.supabase.co/functions/v1/make-server-8965d177/products/${id}`, {
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.product) {
          setProduct(data.product);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching product:', error);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    navigate('/cart');
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen w-full">
        <MarqueeBar />
        <Header />
        <div className="bg-[#fae65f] flex-1 flex items-center justify-center">
          <p className="font-['Inter:Regular',sans-serif] text-[#1f3a3a] text-[24px]">Loading...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen w-full">
        <MarqueeBar />
        <Header />
        <div className="bg-[#fae65f] flex-1 flex flex-col items-center justify-center">
          <p className="font-['Inter:Regular',sans-serif] text-[#1f3a3a] text-[24px] mb-8">Product not found</p>
          <Link to="/shop" className="bg-[#1f3a3a] inline-flex items-center justify-center px-[40px] py-[20px] rounded-[100px] hover:opacity-90">
            <p className="font-['Inter:Regular',sans-serif] font-normal text-[#e2d15a] text-[20px]">Back to Shop</p>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen w-full">
      <MarqueeBar />
      <Header />
      
      <div className="bg-[#fae65f] flex-1 py-12">
        <div className="max-w-[1400px] mx-auto px-4">
          <Link to="/shop" className="inline-block mb-8 font-['Inter:Regular',sans-serif] text-[#1f3a3a] text-[18px] hover:underline">
            ← Back to Shop
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="relative rounded-[40px] overflow-clip border border-[#1f3a3a] bg-[#eedb5a] aspect-square">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <p className="text-[#1f3a3a] text-[24px]">No image</p>
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="flex flex-col gap-8">
              <div>
                <h1 className="font-['Inter:Regular',sans-serif] font-normal text-[#1f3a3a] text-[36px] md:text-[48px] mb-4">
                  {product.name}
                </h1>
                <p className="font-['Inter:Regular',sans-serif] font-normal text-[#1f3a3a] text-[32px] md:text-[40px] mb-6">
                  ₦{product.price.toLocaleString()}
                </p>
                {product.description && (
                  <p className="font-['Playfair_Display:Regular',sans-serif] font-normal text-[#1f3a3a] text-[18px] md:text-[20px] leading-relaxed">
                    {product.description}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-4">
                {/* Quantity Selector */}
                <div className="flex items-center gap-4">
                  <p className="font-['Inter:Regular',sans-serif] text-[#1f3a3a] text-[20px]">Quantity:</p>
                  <div className="flex items-center gap-4 border border-[#1f3a3a] rounded-[20px] px-6 py-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="text-[#1f3a3a] text-[24px] font-bold hover:opacity-60"
                    >
                      −
                    </button>
                    <span className="font-['Inter:Regular',sans-serif] text-[#1f3a3a] text-[20px] min-w-[40px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="text-[#1f3a3a] text-[24px] font-bold hover:opacity-60"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className="bg-[#1f3a3a] flex items-center justify-center px-[40px] py-[20px] rounded-[100px] hover:opacity-90 w-full md:w-auto"
                >
                  <p className="font-['Inter:Regular',sans-serif] font-normal text-[#e2d15a] text-[20px]">
                    Add to Cart - ₦{(product.price * quantity).toLocaleString()}
                  </p>
                </button>
              </div>

              {product.stock !== undefined && (
                <p className="font-['Inter:Regular',sans-serif] text-[#1f3a3a] text-[16px]">
                  {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
