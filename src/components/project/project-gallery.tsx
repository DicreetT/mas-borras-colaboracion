import Image from "next/image";
import type { ProjectGalleryImage } from "@/domain/collaboration/types";

export function ProjectGallery({
  images,
  title = "Imágenes de la estancia",
}: {
  images?: ProjectGalleryImage[];
  title?: string;
}) {
  const visibleImages = images?.slice(0, 6) ?? [];

  if (visibleImages.length === 0) {
    return null;
  }

  return (
    <section className="grid gap-4">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-terracotta">
          Vida del lugar
        </p>
        <h2 className="mt-2 font-serif text-3xl font-semibold">{title}</h2>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {visibleImages.map((image, index) => (
          <figure
            key={image.id}
            className={index === 0 ? "sm:col-span-2" : undefined}
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-[8px] bg-surface-soft">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes={
                  index === 0
                    ? "(max-width: 768px) 100vw, 66vw"
                    : "(max-width: 768px) 100vw, 33vw"
                }
                className="object-cover"
              />
            </div>
            {image.caption ? (
              <figcaption className="mt-2 text-sm leading-6 text-muted">
                {image.caption}
              </figcaption>
            ) : null}
          </figure>
        ))}
      </div>
    </section>
  );
}
