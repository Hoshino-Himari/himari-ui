import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { getCategory, getEntry, registry } from "@/lib/registry";
import { OG_CONTENT_TYPE, OG_SIZE, OgCard, ogFonts } from "@/lib/og";

export const alt = "Himari UI 元件";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return registry.map((e) => ({ slug: e.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getEntry(slug);
  if (!entry) notFound();
  const category = getCategory(entry.category);

  return new ImageResponse(
    (
      <OgCard
        eyebrow={category.name}
        title={entry.name}
        subtitle={entry.description}
        footer={entry.nameEn}
      />
    ),
    { ...size, fonts: await ogFonts() }
  );
}
