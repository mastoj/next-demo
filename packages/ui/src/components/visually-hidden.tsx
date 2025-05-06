import * as React from "react";
import { cn } from "../lib/utils";

interface VisuallyHiddenProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * The content to be visually hidden
   */
  children: React.ReactNode;
}

const VisuallyHidden = React.forwardRef<HTMLSpanElement, VisuallyHiddenProps>(
  ({ className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "absolute w-[1px] h-[1px] p-0 -m-[1px] overflow-hidden whitespace-nowrap border-0",
          "clip-[0_0_0_0]",
          className
        )}
        {...props}
      />
    );
  }
);

VisuallyHidden.displayName = "VisuallyHidden";

export { VisuallyHidden };
