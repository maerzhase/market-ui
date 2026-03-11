import { AnimatePresence, motion } from "motion/react";
import * as React from "react";
import { createContext, useContext } from "react";
import { cn } from "@/lib/cn";

type FeedbackPosition = "bottom" | "top" | "left" | "right";

interface FeedbackContextValue {
  show: boolean;
  position: FeedbackPosition;
  transition: {
    duration: number;
    stiffness: number;
    damping: number;
  };
}

const FeedbackContext = createContext<FeedbackContextValue | null>(null);

function useFeedback() {
  const context = useContext(FeedbackContext);
  if (!context) {
    throw new Error("Feedback.Content must be used within Feedback.Root");
  }
  return context;
}

const positionStyles: Record<FeedbackPosition, string> = {
  bottom: "top-full right-0 left-0",
  top: "bottom-full right-0 left-0",
  left: "right-full top-0 bottom-0",
  right: "left-full top-0 bottom-0",
};

const initialAnimations: Record<FeedbackPosition, { x?: string; y?: string }> =
  {
    bottom: { y: "-100%" },
    top: { y: "100%" },
    left: { x: "100%" },
    right: { x: "-100%" },
  };

interface FeedbackRootProps {
  children: React.ReactNode;
  show?: boolean;
  position?: FeedbackPosition;
  className?: string;
  transition?: {
    duration?: number;
    stiffness?: number;
    damping?: number;
  };
}

const FeedbackRoot: React.FC<FeedbackRootProps> = ({
  children,
  show = false,
  position = "bottom",
  className,
  transition = { duration: 0.3, stiffness: 300, damping: 25 },
}): React.ReactElement => {
  const contextValue = React.useMemo(
    () => ({
      show,
      position,
      transition: {
        duration: transition.duration ?? 0.3,
        stiffness: transition.stiffness ?? 300,
        damping: transition.damping ?? 25,
      },
    }),
    [show, position, transition],
  );

  return (
    <FeedbackContext.Provider value={contextValue}>
      <span className={cn("relative inline-block", className)}>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child) && child.type === FeedbackContent) {
            return child;
          }
          return <span className="relative z-10">{child}</span>;
        })}
      </span>
    </FeedbackContext.Provider>
  );
};

type ContentTransitionMode = "crossfade" | "slide-up" | "slide-down";

interface FeedbackContentProps {
  children: React.ReactNode;
  className?: string;
  contentKey?: string | number;
  mode?: ContentTransitionMode;
}

const contentAnimations = {
  crossfade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  "slide-up": {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
  },
  "slide-down": {
    initial: { opacity: 0, y: -8 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 8 },
  },
} as const;

function getContentKey(children: React.ReactNode): string {
  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }
  if (React.isValidElement(children)) {
    return children.key ?? JSON.stringify(children.props);
  }
  return JSON.stringify(children);
}

const FeedbackContent: React.FC<FeedbackContentProps> = ({
  children,
  className,
  contentKey,
  mode = "slide-up",
}): React.ReactElement => {
  const { show, position, transition } = useFeedback();

  const key = contentKey ?? getContentKey(children);
  const contentAnimation = contentAnimations[mode];

  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          key="feedback-container"
          initial={{
            ...initialAnimations[position],
            opacity: 0,
            rotateZ: 5,
          }}
          animate={{ x: "0%", y: "0%", opacity: 1, rotateZ: 0 }}
          exit={{ ...initialAnimations[position], opacity: 0, rotateZ: -5 }}
          className={cn(
            "absolute z-0 flex items-center justify-center",
            positionStyles[position],
            className,
          )}
          transition={{
            duration: transition.duration,
            type: "spring",
            stiffness: transition.stiffness,
            damping: transition.damping,
          }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={key}
              initial={contentAnimation.initial}
              animate={contentAnimation.animate}
              exit={contentAnimation.exit}
              transition={{
                duration: 0.2,
                ease: "easeInOut",
              }}
            >
              {children}
            </motion.span>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface FeedbackComponent {
  Root: React.FC<FeedbackRootProps>;
  Content: React.FC<FeedbackContentProps>;
}

export const Feedback: FeedbackComponent = {
  Root: FeedbackRoot,
  Content: FeedbackContent,
};
