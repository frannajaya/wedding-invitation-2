import React from 'react';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  eyebrow?: string;
  pinned?: boolean;
}

/**
 * Reusable Card component.
 * Usage: <Card title="Our Story">Content here</Card>
 */
export default function Card({ title, children, className = '', eyebrow, pinned = false }: CardProps) {
  return (
    <div className={`paper-card ${pinned ? 'paper-card--pinned' : ''} ${className}`.trim()}>
      {eyebrow && <p className="paper-card__eyebrow">{eyebrow}</p>}
      {title && <h3 className="paper-card__title">{title}</h3>}
      {children}
    </div>
  );
}
