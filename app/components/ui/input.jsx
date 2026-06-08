import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    (<input
      type={type}
      className={cn(
        "flex h-12 w-full rounded-md border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white placeholder:text-white/45 transition-colors focus-visible:outline-none focus-visible:border-orange focus-visible:bg-white/[0.06] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props} />)
  );
})
Input.displayName = "Input"

export { Input }
