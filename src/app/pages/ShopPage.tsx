import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import { useCart } from '../context/CartContext';
import MarqueeBar from '../components/MarqueeBar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { projectId, publicAnonKey } from '/utils/supabase/info';

function ProductCard({ product }: { product: any }) {
  const { addToCart } = useCart();

  return (
    <div className="content-stretch flex flex-col gap-[10px] items-center relative shrink-0 w-full">
      <Link to={`/product/${product.id}`} className="h-[400px] md:h-[500px] relative rounded-[40px] shrink-0 w-full overflow-hidden group">
        <div className="relative rounded-[inherit] size-full">
          <div className="absolute bg-[#eedb5a] h-full left-0 top-0 w-full" />
          {product.image && (
            <img
              src={product.image}
              alt={product.name}
              className="absolute inset-0 object-cover pointer-events-none size-full transition-transform duration-500 group-hover:scale-110"
            />
          )}
        </div>
        <div aria-hidden="true" className="absolute border border-[#1f3a3a] border-solid inset-[-1px] pointer-events-none rounded-[41px]" />
      </Link>

      <div className="content-stretch flex flex-col gap-[15px] items-start relative shrink-0 w-full px-4">
        <Link to={`/product/${product.id}`} className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#1f3a3a] text-[20px] md:text-[24px] hover:underline">
          {product.name}
        </Link>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#1f3a3a] text-[20px] md:text-[24px]">
          ₦{product.price.toLocaleString()}
        </p>
        <button
          onClick={() => addToCart(product)}
          className="bg-[#1f3a3a] content-stretch flex items-center justify-center px-[30px] md:px-[40px] py-[15px] md:py-[20px] relative rounded-[100px] shrink-0 hover:opacity-90 w-full md:w-auto"
        >
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#e2d15a] text-[18px] md:text-[20px]">Add to Cart</p>
        </button>
      </div>
    </div>
  );
}

export default function ShopPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');

  useEffect(() => {
    setLoading(true);
    fetch(`https://${projectId}.supabase.co/functions/v1/make-server-8965d177/products`, {
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        let filteredProducts = data.products || [];
        
        if (category) {
          filteredProducts = filteredProducts.filter((p: any) => 
            p.category?.toLowerCase() === category.toLowerCase()
          );
        }
        
        setProducts(filteredProducts);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, [category]);

  return (
    <div className="flex flex-col min-h-screen w-full">
      <MarqueeBar />
      <Header />
      
      <div className="bg-[#fae65f] flex-1 py-12">
        <div className="max-w-[1550px] mx-auto px-4">
          <div className="mb-12">
            <h1 className="font-['Inter:Regular',sans-serif] font-normal text-[#1f3a3a] text-[40px] md:text-[56px] mb-4">
              {category ? `${category.charAt(0).toUpperCase() + category.slice(1)} Products` : 'All Products'}
            </h1>
            <p className="font-['Playfair_Display:Regular',sans-serif] font-normal text-[#1f3a3a] text-[18px] md:text-[20px]">
              Browse our curated selection of quality supplements
            </p>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <p className="font-['Inter:Regular',sans-serif] text-[#1f3a3a] text-[24px]">Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-['Inter:Regular',sans-serif] text-[#1f3a3a] text-[24px] mb-8">
                No products available yet. Check back soon!
              </p>
              <Link to="/" className="bg-[#1f3a3a] inline-flex items-center justify-center px-[40px] py-[20px] rounded-[100px] hover:opacity-90">
                <p className="font-['Inter:Regular',sans-serif] font-normal text-[#e2d15a] text-[20px]">Back to Home</p>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
