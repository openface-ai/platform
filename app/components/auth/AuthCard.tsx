// components/auth/AuthCard.tsx
"use client";

type AuthCardProps = {
  children: React.ReactNode;
  className?: string;
};

export function AuthCard({ children, className = "" }: AuthCardProps) {
  return (
    <div
      className={`max-w-md w-full mx-auto bg-background/95 backdrop-blur-sm rounded-xl p-8 border border-gray-800 ${className}`}
    >
      {children}
    </div>
  );
}
