import { useEffect, useState, type ImgHTMLAttributes } from 'react';

type Props = ImgHTMLAttributes<HTMLImageElement> & {
  fallbackSrc?: string;
};

export function ResilientImage({ src, fallbackSrc, onError, onLoad, ...props }: Props) {
  const [currentSrc, setCurrentSrc] = useState(src);

  useEffect(() => setCurrentSrc(src), [src]);

  return (
    <img
      {...props}
      src={currentSrc}
      onLoad={(event) => {
        event.currentTarget.style.display = '';
        onLoad?.(event);
      }}
      onError={(event) => {
        if (fallbackSrc && currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
          return;
        }
        event.currentTarget.style.display = 'none';
        onError?.(event);
      }}
    />
  );
}
