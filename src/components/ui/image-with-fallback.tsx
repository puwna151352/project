"use client";

import { useState, useEffect } from "react";
import Image, { ImageProps } from "next/image";
import { ImageOff } from "lucide-react"; // ใช้ Icon สวยๆ จาก Lucide แทน Base64 ยาวๆ

interface ImageWithFallbackProps extends Omit<ImageProps, "onError"> {
  fallbackText?: string;
}

export function ImageWithFallback({
  src,
  alt,
  className,
  fallbackText,
  ...props
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false);

  // Reset error state if src changes
  useEffect(() => {
    setError(false);
  }, [src]);

  if (error) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gray-100 text-gray-400 ${className}`}
      >
        <ImageOff className="w-8 h-8 opacity-50 mb-2" />
        {fallbackText && <span className="text-xs">{fallbackText}</span>}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
      {...props}
    />
  );
}