'use client';

import Image from "next/image";

interface HeroImageProps {
  className?: string;
}

export default function HeroImage({ className = "" }: HeroImageProps) {
  return (
    <div className={`hero-image-wrapper ${className}`}>
      <Image
        src="/hero/hero-desktop.webp"
        alt="Starting something NEW starts here"
        width={1920}
        height={1080}
        priority
        quality={90}
        className="hero-image"
        sizes="100vw"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
      <style jsx>{`
        .hero-image-wrapper {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        .hero-image {
          transition: transform 0.3s ease;
        }
      `}</style>
    </div>
  );
}