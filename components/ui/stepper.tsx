"use client";

// 移植自 GodUI <https://godui.design/docs/components/layout/stepper> — MIT License © LucasBassetti
// 保留原始實作，僅做自足化最小調整（主題變數加上 fallback）。

import { motion, useReducedMotion } from "framer-motion";
import * as React from "react";

/**
 * 步驟指示器：水平或垂直的多步驟進度指示，完成的步驟打勾、連接線以彈簧動畫填滿。
 * @example
 * <Stepper active={1} steps={[{ label: "填寫資料" }, { label: "確認內容" }, { label: "完成" }]} />
 */
export type Step = {
  label: React.ReactNode;
  description?: React.ReactNode;
};

export type StepperProps = React.HTMLAttributes<HTMLDivElement> & {
  steps: Step[];
  /** Zero-based index of the current step. Earlier steps render complete. */
  active: number;
  orientation?: "horizontal" | "vertical";
};

type StepState = "complete" | "active" | "upcoming";

function StepCircle({
  state,
  index,
  reduceMotion,
}: {
  state: StepState;
  index: number;
  reduceMotion: boolean | null;
}) {
  const base =
    "grid size-9 shrink-0 place-items-center rounded-full border-2 text-sm font-medium [transition:background-color_250ms_ease,border-color_250ms_ease,color_250ms_ease,box-shadow_250ms_ease]";
  const tone =
    state === "complete"
      ? "border-[var(--primary,#fafafa)] bg-[var(--primary,#fafafa)] text-[var(--primary-foreground,#18181b)]"
      : state === "active"
        ? "border-[var(--primary,#fafafa)] bg-[var(--background,#09090b)] text-[var(--foreground,#fafafa)] ring-4 ring-[var(--primary,#fafafa)]/15"
        : "border-[var(--border,#3f3f46)] bg-[var(--background,#09090b)] text-[var(--muted-foreground,#a1a1aa)]";
  return (
    <div className={`${base} ${tone}`}>
      {state === "complete" ? (
        <motion.svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-4"
          aria-hidden="true"
        >
          <motion.path
            d="M5 13l4 4L19 7"
            initial={reduceMotion ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </motion.svg>
      ) : (
        index + 1
      )}
    </div>
  );
}

function Connector({
  filled,
  orientation,
  reduceMotion,
}: {
  filled: boolean;
  orientation: "horizontal" | "vertical";
  reduceMotion: boolean | null;
}) {
  const horizontal = orientation === "horizontal";
  return (
    <div
      className={`relative overflow-hidden bg-[var(--border,#3f3f46)] ${
        horizontal ? "mt-[17px] h-0.5 flex-1" : "my-1 w-0.5 flex-1 self-center"
      }`}
      style={horizontal ? undefined : { minHeight: 24 }}
    >
      <motion.span
        className={`absolute inset-0 bg-[var(--primary,#fafafa)] ${
          horizontal ? "origin-left" : "origin-top"
        }`}
        initial={false}
        animate={
          horizontal ? { scaleX: filled ? 1 : 0 } : { scaleY: filled ? 1 : 0 }
        }
        transition={
          reduceMotion
            ? { duration: 0 }
            : { type: "spring", stiffness: 320, damping: 32, mass: 0.9 }
        }
      />
    </div>
  );
}

const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  ({ steps, active, orientation = "horizontal", className, ...props }, ref) => {
    const reduceMotion = useReducedMotion();
    const horizontal = orientation === "horizontal";

    const stateFor = (i: number): StepState =>
      i < active ? "complete" : i === active ? "active" : "upcoming";

    const Label = ({ step, state }: { step: Step; state: StepState }) => (
      <>
        <div
          className={`text-sm font-medium ${
            state === "upcoming"
              ? "text-[var(--muted-foreground,#a1a1aa)]"
              : "text-[var(--foreground,#fafafa)]"
          }`}
        >
          {step.label}
        </div>
        {step.description && (
          <div className="mt-0.5 text-xs text-[var(--muted-foreground,#a1a1aa)]">
            {step.description}
          </div>
        )}
      </>
    );

    if (horizontal) {
      return (
        <div
          ref={ref}
          className={`flex w-full items-start ${className ?? ""}`}
          {...props}
        >
          {steps.map((step, i) => {
            const state = stateFor(i);
            const isLast = i === steps.length - 1;
            return (
              // 固定順序的步驟，索引即識別
              <React.Fragment key={i}>
                <div
                  className="flex w-24 shrink-0 flex-col items-center text-center"
                  aria-current={state === "active" ? "step" : undefined}
                >
                  <StepCircle
                    state={state}
                    index={i}
                    reduceMotion={reduceMotion}
                  />
                  <div className="mt-2">
                    <Label step={step} state={state} />
                  </div>
                </div>
                {!isLast && (
                  <Connector
                    filled={active > i}
                    orientation="horizontal"
                    reduceMotion={reduceMotion}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      );
    }

    return (
      <div ref={ref} className={`flex flex-col ${className ?? ""}`} {...props}>
        {steps.map((step, i) => {
          const state = stateFor(i);
          const isLast = i === steps.length - 1;
          return (
            <div
              // 固定順序的步驟，索引即識別
              key={i}
              className="flex gap-4"
              aria-current={state === "active" ? "step" : undefined}
            >
              <div className="flex flex-col items-center">
                <StepCircle
                  state={state}
                  index={i}
                  reduceMotion={reduceMotion}
                />
                {!isLast && (
                  <Connector
                    filled={active > i}
                    orientation="vertical"
                    reduceMotion={reduceMotion}
                  />
                )}
              </div>
              <div className="pb-6 pt-1">
                <Label step={step} state={state} />
              </div>
            </div>
          );
        })}
      </div>
    );
  },
);
Stepper.displayName = "Stepper";

export { Stepper };
