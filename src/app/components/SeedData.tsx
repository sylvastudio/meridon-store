import { useState } from 'react';
import { projectId } from '/utils/supabase/info';
import { dummyProducts } from '../data/products';

export default function SeedData({ onComplete }: { onComplete?: () => void }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const seedProducts = async () => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      setMessage('Please login as admin first');
      return;
    }

    setLoading(true);
    setMessage('Seeding products...');

    let successCount = 0;
    let errorCount = 0;

    for (const product of dummyProducts) {
      try {
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-8965d177/products`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
              name: product.name,
              description: product.description,
              price: product.price,
              image: product.imageUrl,
              category: product.category.toLowerCase().replace(/\s+/g, '-'),
              stock: product.stock,
            }),
          }
        );

        if (response.ok) {
          successCount++;
        } else {
          errorCount++;
          console.error(`Failed to create ${product.name}`);
        }
      } catch (error) {
        errorCount++;
        console.error(`Error creating ${product.name}:`, error);
      }
    }

    setMessage(`✅ Seeded ${successCount} products successfully! ${errorCount > 0 ? `(${errorCount} failed)` : ''}`);
    setLoading(false);
    
    if (onComplete) {
      setTimeout(onComplete, 1000);
    }
  };

  return (
    <div className="p-4 bg-[#eedb5a] border border-[#1f3a3a] rounded-[20px]">
      <h3 className="font-['Inter:Regular',sans-serif] text-[#1f3a3a] text-[20px] mb-4">
        Seed Sample Products
      </h3>
      <p className="font-['Inter:Regular',sans-serif] text-[#1f3a3a] text-[16px] mb-4">
        Click below to populate the store with {dummyProducts.length} sample supplement products.
      </p>
      <button
        onClick={seedProducts}
        disabled={loading}
        className="bg-[#1f3a3a] px-6 py-3 rounded-[15px] hover:opacity-90 disabled:opacity-50"
      >
        <span className="font-['Inter:Regular',sans-serif] text-[#e2d15a] text-[16px]">
          {loading ? 'Seeding...' : 'Seed Products'}
        </span>
      </button>
      {message && (
        <p className="font-['Inter:Regular',sans-serif] text-[#1f3a3a] text-[14px] mt-4">
          {message}
        </p>
      )}
    </div>
  );
}
