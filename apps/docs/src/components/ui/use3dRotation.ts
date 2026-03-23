"use client";

import {
  type PointerEvent as ReactPointerEvent,
  type RefObject,
  useCallback,
  useEffect,
  useRef,
} from "react";

interface Use3DRotationOptions {
  maxRotation?: number;
  scale?: number;
  moveDuration?: number;
  moveTimingFunction?: string;
  resetDuration?: number;
  resetTimingFunction?: string;
  disabled?: boolean;
  idleRotateX?: number;
  idleRotateY?: number;
  idleRotateZ?: number;
  glowX?: string;
  glowY?: string;
  glowPropertyX?: string;
  glowPropertyY?: string;
  transformRef?: RefObject<HTMLElement | null>;
}

type PointerHandlers<T extends HTMLElement> = {
  onPointerEnter: () => void;
  onPointerMove: (event: ReactPointerEvent<T>) => void;
  onPointerLeave: () => void;
  onPointerCancel: () => void;
};

type Use3DRotationResult<T extends HTMLElement> = [
  {
    ref: RefObject<T | null>;
  },
  PointerHandlers<T>,
];

export function use3dRotation<T extends HTMLElement>({
  maxRotation = 8,
  scale = 1.012,
  moveDuration = 90,
  moveTimingFunction = "cubic-bezier(.22,.61,.36,1)",
  resetDuration = 320,
  resetTimingFunction = "cubic-bezier(.03,.98,.52,.99)",
  disabled = false,
  idleRotateX = 0,
  idleRotateY = 0,
  idleRotateZ = 0,
  glowX = "50%",
  glowY = "35%",
  glowPropertyX = "--landing-receipt-glow-x",
  glowPropertyY = "--landing-receipt-glow-y",
  transformRef,
}: Use3DRotationOptions = {}): Use3DRotationResult<T> {
  const elementRef = useRef<T>(null);
  const rafRef = useRef<number | null>(null);
  const nextTransformRef = useRef("rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(1)");

  const getTransformElement = useCallback(() => {
    return transformRef?.current ?? elementRef.current;
  }, [transformRef]);

  const applyTransform = useCallback(() => {
    const element = getTransformElement();
    if (!element) {
      return;
    }

    element.style.transform = nextTransformRef.current;
  }, [getTransformElement]);

  const scheduleTransform = useCallback((transform: string) => {
    nextTransformRef.current = transform;
    if (rafRef.current !== null) {
      return;
    }

    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = null;
      applyTransform();
    });
  }, [applyTransform]);

  const setGlowPosition = useCallback(
    (x: string, y: string) => {
      const element = getTransformElement();
      if (!element) {
        return;
      }

      element.style.setProperty(glowPropertyX, x);
      element.style.setProperty(glowPropertyY, y);
    },
    [getTransformElement, glowPropertyX, glowPropertyY],
  );

  const resetTransform = useCallback(() => {
    const element = getTransformElement();
    if (!element) {
      return;
    }

    element.style.transition = `transform ${resetDuration}ms ${resetTimingFunction}`;
    scheduleTransform(
      `rotateX(${idleRotateX}deg) rotateY(${idleRotateY}deg) rotateZ(${idleRotateZ}deg) scale(1)`,
    );
    setGlowPosition(glowX, glowY);
  }, [
    glowX,
    glowY,
    idleRotateX,
    idleRotateY,
    idleRotateZ,
    resetDuration,
    resetTimingFunction,
    scheduleTransform,
    setGlowPosition,
    getTransformElement,
  ]);

  const handlePointerEnter = useCallback(() => {
    const element = getTransformElement();
    if (!element || disabled) {
      return;
    }

    element.style.transition = `transform ${moveDuration}ms ${moveTimingFunction}`;
  }, [disabled, getTransformElement, moveDuration, moveTimingFunction]);

  const handlePointerMove = useCallback(
    (event: ReactPointerEvent<T>) => {
      const eventElement = elementRef.current;
      const element = getTransformElement();
      if (!eventElement || !element || disabled || event.pointerType === "touch") {
        return;
      }

      const rect = eventElement.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) {
        return;
      }

      const x = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
      const y = Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height));

      const centerX = x * 2 - 1;
      const centerY = y * 2 - 1;

      const rotateX = idleRotateX + -centerY * maxRotation;
      const rotateY = idleRotateY + centerX * maxRotation;

      element.style.transition = `transform ${moveDuration}ms ${moveTimingFunction}`;
      scheduleTransform(
        `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) rotateZ(${idleRotateZ}deg) scale(${scale})`,
      );
      setGlowPosition(`${(x * 100).toFixed(2)}%`, `${(y * 100).toFixed(2)}%`);
    },
    [
      disabled,
      idleRotateX,
      idleRotateY,
      idleRotateZ,
      maxRotation,
      moveDuration,
      moveTimingFunction,
      getTransformElement,
      scheduleTransform,
      scale,
      setGlowPosition,
    ],
  );

  useEffect(() => {
    resetTransform();
  }, [resetTransform]);

  useEffect(() => {
    if (disabled) {
      resetTransform();
    }
  }, [disabled, resetTransform]);

  useEffect(() => {
    return () => {
      const transformElement = getTransformElement();
      if (!transformElement) {
        return;
      }

      transformElement.style.transform = "";
      transformElement.style.transition = "";
      transformElement.style.removeProperty(glowPropertyX);
      transformElement.style.removeProperty(glowPropertyY);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [getTransformElement, glowPropertyX, glowPropertyY]);

  return [
    {
      ref: elementRef,
    },
    {
      onPointerEnter: handlePointerEnter,
      onPointerMove: handlePointerMove,
      onPointerLeave: resetTransform,
      onPointerCancel: resetTransform,
    },
  ];
}
