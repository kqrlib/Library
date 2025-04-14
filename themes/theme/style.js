"use client"

/**
 * Custom styles for the theme
 * @returns {JSX.Element}
 */
const Style = () => {
  return (
    <style jsx global>{`
      /* Base styles */
      body {
        transition: background-color 0.3s ease, color 0.3s ease;
      }
      
      .dark body {
        background-color: #121212;
      }
      
      /* Text selection */
      ::selection {
        background-color: #3b82f6;
        color: white;
      }
      
      /* Smooth scrolling */
      html {
        scroll-behavior: smooth;
      }
      
      /* Blog item title styling */
      #theme-simple .blog-item-title {
        color: #1e40af;
      }
      
      .dark #theme-simple .blog-item-title {
        color: #93c5fd;
      }
      
      /* Notion content adjustments */
      .notion {
        margin-top: 0 !important;
        margin-bottom: 0 !important;
      }
      
      /* Link hover effects */
      #theme-simple .menu-link {
        position: relative;
        text-decoration: none;
        transition: color 0.2s ease;
      }
      
      #theme-simple .menu-link::after {
        content: '';
        position: absolute;
        width: 0;
        height: 2px;
        bottom: -2px;
        left: 0;
        background-color: #3b82f6;
        transition: width 0.3s ease;
      }
      
      #theme-simple .menu-link:hover {
        color: #3b82f6;
      }
      
      #theme-simple .menu-link:hover::after {
        width: 100%;
      }
      
      /* Card hover effects */
      .card-hover-effect {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }
      
      .card-hover-effect:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
      }
      
      /* Custom scrollbar */
      ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }
      
      ::-webkit-scrollbar-track {
        background: #f1f1f1;
      }
      
      .dark ::-webkit-scrollbar-track {
        background: #2d3748;
      }
      
      ::-webkit-scrollbar-thumb {
        background: #c5c5c5;
        border-radius: 4px;
      }
      
      .dark ::-webkit-scrollbar-thumb {
        background: #4a5568;
      }
      
      ::-webkit-scrollbar-thumb:hover {
        background: #a0a0a0;
      }
      
      .dark ::-webkit-scrollbar-thumb:hover {
        background: #718096;
      }
    `}</style>
  )
}

export { Style }
