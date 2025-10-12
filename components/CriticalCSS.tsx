/**
 * Critical CSS Inliner
 * 
 * Inlines critical CSS to prevent render-blocking
 * Improves LCP and FCP scores
 */

export default function CriticalCSS() {
  return (
    <style dangerouslySetInnerHTML={{
      __html: `
      /* Critical CSS for above-the-fold content */
      .hero-section {
        min-height: 100vh;
        background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%);
      }
      
      .category-section {
        padding: 5rem 0;
      }
      
      .product-card {
        background: white;
        border-radius: 1rem;
        border: 1px solid #d1fae5;
        transition: all 0.3s ease;
      }
      
      .product-card:hover {
        transform: translateY(-0.5rem);
        box-shadow: 0 20px 25px -5px rgba(16, 185, 129, 0.1);
      }
      
      /* Prevent layout shifts */
      .image-container {
        width: 100%;
        height: 5rem;
        overflow: hidden;
        border-radius: 0.75rem;
      }
      
      .image-container img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      
      /* Font display optimization */
      @font-face {
        font-family: 'Inter';
        font-display: swap;
        font-weight: 300 700;
        src: url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
      }
      
      /* System font fallback for instant text rendering */
      body {
        font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-display: swap;
      }
      
      /* Prevent font flash */
      .font-loading {
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }
      
      /* Critical button styles */
      .btn-primary {
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        color: white;
        padding: 0.75rem 1.5rem;
        border-radius: 0.5rem;
        font-weight: 600;
        transition: all 0.3s ease;
      }
      
      .btn-primary:hover {
        background: linear-gradient(135deg, #059669 0%, #047857 100%);
        transform: translateY(-2px);
      }
      
      /* Loading skeleton to prevent shifts */
      .skeleton {
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 200% 100%;
        animation: loading 1.5s infinite;
      }
      
      @keyframes loading {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
      
      /* Mobile-specific optimizations */
      @media (max-width: 768px) {
        .hero-section {
          min-height: 70vh;
          padding: 2rem 0;
        }
        
        .product-card {
          margin-bottom: 1rem;
        }
        
        .image-container {
          height: 4rem;
        }
        
        /* Reduce font sizes for mobile */
        h1 { font-size: 1.75rem; }
        h2 { font-size: 1.5rem; }
        h3 { font-size: 1.25rem; }
        
        /* Optimize button sizes for touch */
        .btn-primary {
          padding: 1rem 1.5rem;
          font-size: 1rem;
          min-height: 44px; /* Touch target size */
        }
        
        /* Reduce spacing on mobile */
        .category-section {
          padding: 3rem 0;
        }
        
        /* Optimize grid for mobile */
        .product-grid {
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }
        
        /* Critical mobile styles */
        .mobile-optimized {
          transform: translateZ(0);
          will-change: transform;
        }
      }
      
      /* Mobile performance optimizations */
      @media (max-width: 480px) {
        .hero-section {
          min-height: 60vh;
        }
        
        .product-grid {
          grid-template-columns: 1fr;
          gap: 0.75rem;
        }
        
        .image-container {
          height: 3.5rem;
        }
        
        /* Ultra-compact mobile layout */
        .mobile-compact {
          padding: 1rem;
          margin: 0.5rem;
        }
      }
    `
    }} />
  )
}
