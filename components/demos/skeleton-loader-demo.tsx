"use client";

import { Skeleton } from "@/components/ui/skeleton-loader";

export default function SkeletonLoaderDemo() {
  return (
    <div className="flex h-64 items-center justify-center px-6">
      <div className="w-full max-w-sm rounded-2xl border border-ink/10 p-5">
        <div className="flex items-center gap-3">
          <Skeleton width={44} height={44} radius="9999px" />
          <div className="flex-1 space-y-2">
            <Skeleton width="55%" height={12} />
            <Skeleton width="35%" height={10} />
          </div>
        </div>
        <div className="mt-4 space-y-2.5">
          <Skeleton height={12} />
          <Skeleton height={12} width="90%" />
          <Skeleton height={12} width="70%" />
        </div>
        <Skeleton className="mt-5" height={120} radius={12} />
      </div>
    </div>
  );
}
