"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * 逐字浮現文字：進入視窗時每個字元依序淡入並上浮，適合標題或重點句的進場。
 * @example <StaggerText text="設計，從細節開始" />
 */
type StaggerTextProps = {
  /** 要逐字浮現的文字 */
  text: string;
  /** 相鄰字元的錯開時間（秒） */
  stagger?: number;
  /** 單一字元的動畫時長（秒） */
  duration?: number;
  /** 整段動畫的起始延遲（秒） */
  delay?: number;
  className?: string;
};

export function StaggerText({
  text,
  stagger = 0.04,
  duration = 0.5,
  delay = 0,
  className = "",
}: StaggerTextProps) {
  const reduced = useReducedMotion();
  // 用 Array.from 切字，中文與 emoji 不會被 surrogate pair 切壞
  const chars = Array.from(text);

  if (reduced) {
    return <span className={className}>{text}</span>;
  }

  return (
    <motion.span
      className={`inline-block ${className}`}
      aria-label={text}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {chars.map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="inline-block whitespace-pre"
          variants={{
            hidden: { opacity: 0, y: "0.6em" },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
        >
          {ch}
        </motion.span>
      ))}
    </motion.span>
  );
}
