"use client";

// 移植自 MagicUI <https://magicui.design/docs/components/avatar-circles> — MIT License © magicuidesign
// 保留原始實作，僅做自足化最小調整。

/**
 * 頭像圈：一排互相重疊的圓形頭像，最後可加一顆「+N」表示其餘人數，適合展示參與者或用戶群。
 * @example
 * <AvatarCircles
 *   numPeople={99}
 *   avatarUrls={[{ imageUrl: "https://avatar.vercel.sh/himari", profileUrl: "#" }]}
 * />
 */

const cn = (...cls: (string | undefined | null | false)[]) =>
  cls.filter(Boolean).join(" ");

interface Avatar {
  imageUrl: string;
  profileUrl: string;
}
interface AvatarCirclesProps {
  className?: string;
  /** 頭像之外的剩餘人數（顯示為 +N） */
  numPeople?: number;
  /** 頭像清單：圖片網址與個人頁連結 */
  avatarUrls: Avatar[];
}

export const AvatarCircles = ({
  numPeople,
  className,
  avatarUrls,
}: AvatarCirclesProps) => {
  return (
    <div className={cn("z-10 flex -space-x-4 rtl:space-x-reverse", className)}>
      {avatarUrls.map((url, index) => (
        <a
          key={index}
          href={url.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- 可攜元件，不依賴 next/image */}
          <img
            key={index}
            className="h-10 w-10 rounded-full border-2 border-white dark:border-gray-800"
            src={url.imageUrl}
            width={40}
            height={40}
            alt={`Avatar ${index + 1}`}
          />
        </a>
      ))}
      {(numPeople ?? 0) > 0 && (
        <a
          className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-black text-center text-xs font-medium text-white hover:bg-gray-600 dark:border-gray-800 dark:bg-white dark:text-black"
          href=""
        >
          +{numPeople}
        </a>
      )}
    </div>
  );
};
