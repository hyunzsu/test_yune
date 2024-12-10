interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function Button({ children, className, onClick }: ButtonProps) {
  return (
    <button
      className={`w-full border border-black bg-white p-1 text-sm font-medium transition-colors hover:bg-gray-100 ${className} `}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
