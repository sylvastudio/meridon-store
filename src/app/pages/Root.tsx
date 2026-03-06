import { Outlet } from 'react-router';
import { CartProvider } from '../context/CartContext';
import { useEffect } from 'react';
import faviconImage from 'figma:asset/89a61a2758e438e982bfcd95f64e181c81fd9112.png';

export default function Root() {
  useEffect(() => {
    // Update favicon
    const link = document.querySelector("link[rel*='icon']") as HTMLLinkElement || document.createElement('link');
    link.type = 'image/png';
    link.rel = 'icon';
    link.href = faviconImage;
    if (!document.querySelector("link[rel*='icon']")) {
      document.head.appendChild(link);
    }
    
    // Update document title
    document.title = 'Meridon Store - Quality Supplements';
  }, []);

  return (
    <CartProvider>
      <Outlet />
    </CartProvider>
  );
}
