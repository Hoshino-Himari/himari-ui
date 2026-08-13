"use client";

// 移植自 MagicUI <https://magicui.design/docs/components/avatar-circles> — MIT License © magicuidesign
// 保留原始實作，僅做自足化最小調整；另修正原作的連結行為：profileUrl 省略時渲染成
// 非連結元素，「+N」也不再是 href="" 的連結（原作點下去會重載當前頁）。

/**
 * 頭像圈：一排互相重疊的圓形頭像，最後可加一顆「+N」表示其餘人數，適合展示參與者或用戶群。
 * 有給 profileUrl 的頭像才會變成連結。
 * @example
 * <AvatarCircles
 *   numPeople={99}
 *   avatarUrls={[{ imageUrl: "https://avatar.vercel.sh/himari" }]}
 * />
 */

const cn = (...cls: (string | undefined | null | false)[]) =>
  cls.filter(Boolean).join(" ");

interface Avatar {
  imageUrl: string;
  /** 個人頁連結；省略時頭像不會是連結，也不會開新分頁 */
  profileUrl?: string;
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
      {avatarUrls.map((url, index) => {
        const avatar = (
          // eslint-disable-next-line @next/next/no-img-element -- 可攜元件，不依賴 next/image
          <img
            className="h-10 w-10 rounded-full border-2 border-white dark:border-gray-800"
            src={url.imageUrl}
            width={40}
            height={40}
            alt={`Avatar ${index + 1}`}
          />
        );
        return url.profileUrl ? (
          <a
            key={index}
            href={url.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {avatar}
          </a>
        ) : (
          <span key={index} className="inline-flex">
            {avatar}
          </span>
        );
      })}
      {(numPeople ?? 0) > 0 && (
        <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-black text-center text-xs font-medium text-white dark:border-gray-800 dark:bg-white dark:text-black">
          +{numPeople}
        </span>
      )}
    </div>
  );
};
