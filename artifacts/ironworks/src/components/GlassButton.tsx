import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  as?: any;
  href?: string;
}

export function GlassButton({ children, className = '', as, href, ...props }: GlassButtonProps) {
  const Component = as || motion.button;
  
  return (
    <Component
      href={href}
      className={`
        relative inline-flex items-center justify-center
        px-8 py-4 rounded-full font-display font-medium text-lg uppercase tracking-wider
        text-white overflow-hidden group
        backdrop-blur-md bg-white/5 border border-white/10
        shadow-[0_8px_32px_rgba(255,77,0,0.15)]
        transition-all duration-300 hover:shadow-[0_8px_32px_rgba(255,77,0,0.3)]
        hover:border-white/20 hover:bg-white/10
        ${className}
      `}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      <div className="absolute inset-0 bg-forge-gradient opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
      <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-full" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1/3 bg-white/20 blur-md rounded-full" />
      <span className="relative z-10">{children}</span>
    </Component>
  );
}
