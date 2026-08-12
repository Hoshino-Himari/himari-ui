import type { ReactNode } from "react";
import { Sidebar } from "@/components/site/sidebar";
import { categories, registry } from "@/lib/registry";

export default function ComponentsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex w-full max-w-screen-2xl flex-1">
      <Sidebar categories={categories} entries={registry} />
      <div className="min-w-0 flex-1 px-4 py-8 sm:px-8">{children}</div>
    </div>
  );
}
