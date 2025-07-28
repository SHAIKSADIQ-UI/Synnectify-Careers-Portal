// components/Preloader.tsx
import { useEffect, useState } from 'react';

const Preloader = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000); // 2 seconds preloader

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black z-[9999]">
  <div className="text-center">
    <img 
      src="/sclogo.gif" 
      alt="SYNNECTIFY..." 
      className="mx-auto w-72 h-72"
    />
    <p className="text-white mt-4 text-xl font-extrabold">
      SYNNECTIFY
      <span className="inline-flex ml-2">
  <span className="bg-white rounded-full w-2 h-2 mx-0.5 animate-bounce-fast !duration-500 [animation-delay:-0.3s]"></span>
  <span className="bg-white rounded-full w-2 h-2 mx-0.5 animate-bounce-fast !duration-500 [animation-delay:-0.15s]"></span>
  <span className="bg-white rounded-full w-2 h-2 mx-0.5 animate-bounce-fast !duration-500 [animation-delay:-0.18s]"></span>  
  <span className="bg-white rounded-full w-2 h-2 mx-0.5 animate-bounce-fast !duration-500 [animation-delay:-0.21s]"></span>      
  <span className="bg-white rounded-full w-2 h-2 mx-0.5 animate-bounce-fast !duration-500 [animation-delay:-0.23s]"></span>      
  <span className="bg-white rounded-full w-2 h-2 mx-0.5 animate-bounce-fast !duration-500 [animation-delay:-0.26s]"></span>      
  <span className="bg-white rounded-full w-2 h-2 mx-0.5 animate-bounce-fast !duration-500 [animation-delay:-0.28s]"></span>            
  <span className="bg-white rounded-full w-2 h-2 mx-0.5 animate-bounce-fast !duration-500"></span>
</span>
    </p>
  </div>
</div>
    );
  }

  return <>{children}</>;
};

export default Preloader;