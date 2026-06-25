"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import db from "@/db/gallery.json";
import type { gallery } from "@/model/gallery";

type GalleryItem = gallery & {
  width?: number;
  height?: number;
};

type CloudinaryInfo = {
  width?: number;
  height?: number;
  input?: { width?: number; height?: number };
  output?: { width?: number; height?: number };
  image?: { width?: number; height?: number };
};

function getCloudinaryInfoUrl(url: string) {
  // Cloudinary's getinfo flag returns JSON metadata, including dimensions.
  return url.replace("/image/upload/", "/image/upload/fl_getinfo/");
}

function extractDimensions(info: CloudinaryInfo) {
  return {
    width:
      info.width ??
      info.input?.width ??
      info.output?.width ??
      info.image?.width,
    height:
      info.height ??
      info.input?.height ??
      info.output?.height ??
      info.image?.height,
  };
}

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [selectedImg, setSelectedImg] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const openImage = (index: number) => setSelectedImg(index);
  const closeImage = () => setSelectedImg(null);

  const swipeImg = (direction: "prev" | "next") => {
    if (selectedImg === null || images.length === 0) return;

    if (direction === "prev") {
      setSelectedImg(selectedImg === 0 ? images.length - 1 : selectedImg - 1);
      return;
    }

    setSelectedImg(selectedImg === images.length - 1 ? 0 : selectedImg + 1);
  };

  useEffect(() => {
    let cancelled = false;

    const loadDimensions = async () => {
      const baseImages = db.gallery as gallery[];

      const enriched = await Promise.all(
        baseImages.map(async (art) => {
          try {
            const res = await fetch(getCloudinaryInfoUrl(art.url), {
              cache: "force-cache",
            });

            if (!res.ok) return art;

            const info = (await res.json()) as CloudinaryInfo;
            const { width, height } = extractDimensions(info);

            if (!width || !height) return art;

            return { ...art, width, height };
          } catch {
            return art;
          }
        }),
      );

      if (!cancelled) {
        setImages(enriched);
        setIsLoading(false);
      }
    };

    void loadDimensions();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (selectedImg === null) return;

      if (event.key === "Escape") closeImage();
      if (event.key === "ArrowLeft") swipeImg("prev");
      if (event.key === "ArrowRight") swipeImg("next");
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedImg, images]);

  return (
    <main className="min-h-dvh w-screen bg-[var(--blush)] px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <section className="mx-auto max-w-[1600px]">
        <header className="mb-6 text-center sm:mb-8">
          <h1 className="font-titan text-3xl tracking-tight text-neutral-900 sm:text-4xl">
            Gallery <span className="text-[var(--pink)]">✦</span>
          </h1>
          <p className="mt-2 text-sm text-[var(--muted)] sm:text-base">
            Browse the collection and open any image to view it larger.
          </p>
        </header>

        {isLoading ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[3/4] animate-pulse rounded-2xl bg-white/40"
              />
            ))}
          </div>
        ) : (
          <div className="columns-2 gap-3 sm:columns-3 lg:columns-4 xl:columns-5">
            {images.map((art, i) => {
              const width = art.width ?? 1;
              const height = art.height ?? 1;

              return (
                <button
                  key={`${art.url}-${i}`}
                  type="button"
                  onClick={() => openImage(i)}
                  className="group mb-3 block w-full break-inside-avoid overflow-hidden rounded-2xl bg-white/40 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                >
                  <Image
                    src={art.url}
                    alt={art.title}
                    width={width}
                    height={height}
                    unoptimized
                    className="h-auto w-full object-contain transition duration-300 group-hover:scale-[1.01]"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  />
                </button>
              );
            })}
          </div>
        )}
      </section>

      {selectedImg !== null && images[selectedImg] && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={closeImage}
        >
          <div
            className="relative w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative overflow-hidden rounded-3xl bg-black shadow-2xl">
              <div className="relative aspect-[4/3] w-full sm:aspect-[16/10] lg:aspect-[16/9]">
                <Image
                  src={images[selectedImg].url}
                  alt={images[selectedImg].title}
                  fill
                  unoptimized
                  sizes="100vw"
                  className="object-contain"
                />
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-3 text-white sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-lg font-medium">
                {images[selectedImg].title}
              </h2>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => swipeImg("prev")}
                  className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur transition hover:bg-white/20"
                >
                  Prev
                </button>
                <button
                  type="button"
                  onClick={() => swipeImg("next")}
                  className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur transition hover:bg-white/20"
                >
                  Next
                </button>
                <button
                  type="button"
                  onClick={closeImage}
                  className="rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-neutral-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
