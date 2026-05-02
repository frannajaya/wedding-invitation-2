import React from 'react';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Reusable Card component.
 * Usage: <Card title="Our Story">Content here</Card>
 */
export default function Card({ title, children, className = '' }: CardProps) {
  return (
    <div className={`rounded-lg shadow-md bg-white p-6 ${className}`}>
      {title && <h3 className="text-xl font-semibold mb-4">{title}</h3>}
      {children}
    </div>
  );
}
