"use client";

import { useEffect, useState } from "react";

interface GalleryImage {
  src: string;
  alt: string;
  label?: string;
  fit?: "cover" | "contain";
}

interface ProductImageGalleryProps {
  images: GalleryImage[];
}

export default function ProductImageGallery({ images }: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedImage(null);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImage]);

  return (
    <>
      <div className="panel-surface space-y-4 overflow-hidden p-4">
        {images.map((image, index) => (
          <div key={image.src}>
            {image.label ? (
              <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-[0.18em] text-sage">
                {image.label}
              </p>
            ) : null}
            <button
              type="button"
              onClick={() => setSelectedImage(image)}
              className="relative block aspect-square w-full cursor-zoom-in overflow-hidden rounded-[1.75rem] bg-white"
              aria-label={`Enlarge ${image.alt}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image.src}
                alt={image.alt}
                className={`h-full w-full ${image.fit === "contain" ? "object-contain p-4" : "object-cover"}`}
                loading={index === 0 ? "eager" : "lazy"}
              />
            </button>
          </div>
        ))}
      </div>

      {selectedImage ? (
        <div
          className="fixed inset-0 z-[100] flex cursor-zoom-out items-center justify-center bg-black/95 p-4 md:p-10"
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged product image"
          onClick={() => setSelectedImage(null)}
        >
          <button
            type="button"
            onClick={() => setSelectedImage(null)}
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-3xl leading-none text-white transition-colors hover:bg-white/25"
            aria-label="Close image"
          >
            &times;
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={selectedImage.src}
            alt={selectedImage.alt}
            className="max-h-full max-w-full cursor-default object-contain"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      ) : null}
    </>
  );
}
