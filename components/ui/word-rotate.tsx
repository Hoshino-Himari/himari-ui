"use client"

// 移植自 MagicUI <https://magicui.design/docs/components/word-rotate> — MIT License © magicuidesign
// 保留原始實作，僅做自足化最小調整。

import { useEffect, useState } from "react"
import { AnimatePresence, motion, type MotionProps } from "motion/react"

const cn = (...cls: (string | undefined | null | false)[]) =>
  cls.filter(Boolean).join(" ")

/**
 * 詞語輪播：一組詞彙以垂直翻頁動畫依序輪播。
 * @example <WordRotate words={["美麗", "現代", "流暢"]} />
 */
interface WordRotateProps {
  words: string[]
  duration?: number
  motionProps?: MotionProps
  className?: string
}

export function WordRotate({
  words,
  duration = 2500,
  motionProps = {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
    transition: { duration: 0.25, ease: "easeOut" },
  },
  className,
}: WordRotateProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length)
    }, duration)

    // Clean up interval on unmount
    return () => clearInterval(interval)
  }, [words, duration])

  return (
    <div className="overflow-hidden py-2">
      <AnimatePresence mode="wait">
        <motion.h1
          key={words[index]}
          className={cn(className)}
          {...motionProps}
        >
          {words[index]}
        </motion.h1>
      </AnimatePresence>
    </div>
  )
}
