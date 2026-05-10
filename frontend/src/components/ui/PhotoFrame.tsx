import type { HTMLAttributes, ReactNode } from 'react';
import type { PhotoRatio } from '@/lib/content';

interface PhotoFrameProps extends HTMLAttributes<HTMLDivElement> {
  ratio: PhotoRatio;
  tone?: 'blush' | 'sage' | 'gold';
  label?: string;
  caption?: string;
  detail?: string;
  children?: ReactNode;
}

export default function PhotoFrame({
  ratio,
  tone = 'blush',
  label,
  caption,
  detail,
  children,
  className = '',
  ...props
}: PhotoFrameProps) {
  return (
    <div className={`photo-frame ${className}`.trim()} data-ratio={ratio} data-tone={tone} {...props}>
      <div className="photo-frame__surface">
        <div className="photo-frame__content">
          {children ?? (
            <>
              {label && <p className="photo-frame__label">{label}</p>}
              {caption && <p className="photo-frame__caption">{caption}</p>}
              {detail && <p className="photo-frame__detail">{detail}</p>}
            </>
          )}
        </div>
      </div>
    </div>
  );
}