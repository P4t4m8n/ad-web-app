"use client";

import { useCallback, useEffect, useState } from "react";
import { TItem } from "@/types/app";
import Image from "next/image";

interface GirdProps {
  items: TItem[];
}
export default function Gird({ items }: GirdProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);
  const showPrev = useCallback(
    () =>
      setActiveIndex((i) =>
        i === null ? i : (i - 1 + items.length) % items.length
      ),
    [items.length]
  );
  const showNext = useCallback(
    () => setActiveIndex((i) => (i === null ? i : (i + 1) % items.length)),
    [items.length]
  );

  useEffect(() => {
    if (activeIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, close, showPrev, showNext]);

  const activeItem = activeIndex === null ? null : items[activeIndex];

  return (
    <>
      <ul
        className="mx-auto lg:w-[50%] gap-6 columns-[12.5rem] p-4"
        // never allocate more columns than there are items, so a handful of
        // images stretch to fill the row instead of leaving empty columns
        style={{ columnCount: Math.max(items.length, 1) }}
      >
        {items.map((item, index) => (
          <li
            key={item.id}
            className="group relative mb-6 break-inside-avoid rounded-[5px] border-2 border-black p-1.25 shadow-[5px_5px_5px_rgba(0,0,0,0.5)] transition-colors duration-250 hover:border-header"
          >
            <button
              type="button"
              onClick={() => setActiveIndex(index)}
              className="block w-full cursor-zoom-in"
              aria-label={`View full size image: ${item.text}`}
            >
              <Image
                className="w-full p-2 transition-all duration-250 group-hover:bg-header group-hover:filter-none"
                src={item.imgPath}
                alt={item.text}
                width={1024}
                height={0}
                loading="eager"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                }}
              />
            </button>
            {/* <p className="my-1.25 text-center italic group-hover:text-header">
              {item.text}
            </p> */}
          </li>
        ))}
      </ul>

      {activeItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeItem.text}
          onClick={close}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-4 top-4 text-3xl leading-none text-white transition-colors hover:text-header"
          >
            &times;
          </button>

          {items.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  showPrev();
                }}
                aria-label="Previous image"
                className="absolute left-2 top-1/2 -translate-y-1/2 text-4xl text-white transition-colors hover:text-header sm:left-6"
              >
                &#8249;
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  showNext();
                }}
                aria-label="Next image"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-4xl text-white transition-colors hover:text-header sm:right-6"
              >
                &#8250;
              </button>
            </>
          )}

          <div
            className="relative h-[85vh] w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              key={activeItem.id}
              src={activeItem.imgPath}
              alt={activeItem.text}
              fill
              sizes="90vw"
              priority
              className="object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
