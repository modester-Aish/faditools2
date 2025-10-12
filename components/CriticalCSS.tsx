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
    `
    }} />
  )
}
