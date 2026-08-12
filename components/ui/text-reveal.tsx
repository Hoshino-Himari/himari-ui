"use client"

// 移植自 MagicUI <https://magicui.design/docs/components/text-reveal> — MIT License © magicuidesign
// 保留原始實作，僅做自足化最小調整；另加選用的 containerRef，讓元件放進自訂捲動容器時也能追蹤進度。

import {
  useRef,
  type ComponentPropsWithoutRef,
  type FC,
  type ReactNode,
  type RefObject,
} from "react"
import { motion, MotionValue, useScroll, useTransform } from "motion/react"

const cn = (...cls: (string | undefined | null | false)[]) =>
  cls.filter(Boolean).join(" ")

export interface TextRevealProps extends ComponentPropsWithoutRef<"div"> {
  children: string
  /** 自訂捲動容器的 ref；不傳則追蹤整頁捲動 */
  containerRef?: RefObject<HTMLElement | null>
}

/**
 * 捲動顯現文字：整段文字先以低透明度鋪底，隨捲動進度逐字轉為實色。
 * @example <TextReveal>Himari UI 讓 介面 動 起來</TextReveal>
 */
export const TextReveal: FC<TextRevealProps> = ({
  children,
  className,
  containerRef,
}) => {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    container: containerRef,
  })

  if (typeof children !== "string") {
    throw new Error("TextReveal: children must be a string")
  }

  const words = children.split(" ")

  return (
    <div ref={sectionRef} className={cn("relative z-0 h-[200vh]", className)}>
      <div
        className={
          "sticky top-0 mx-auto flex h-[50%] max-w-4xl items-center bg-transparent px-4 py-20"
        }
      >
        <span
          className={
            "flex flex-wrap p-5 text-2xl font-bold text-black/20 md:p-8 md:text-3xl lg:p-10 lg:text-4xl xl:text-5xl dark:text-white/20"
          }
        >
          {words.map((word, i) => {
            const start = i / words.length
            const end = start + 1 / words.length
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            )
          })}
        </span>
      </div>
    </div>
  )
}

interface WordProps {
  children: ReactNode
  progress: MotionValue<number>
  range: [number, number]
}

const Word: FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1])
  return (
    <span className="xl:lg-3 relative mx-1 lg:mx-1.5">
      <span className="absolute opacity-30">{children}</span>
      <motion.span
        style={{ opacity: opacity }}
        className={"text-black dark:text-white"}
      >
        {children}
      </motion.span>
    </span>
  )
}
