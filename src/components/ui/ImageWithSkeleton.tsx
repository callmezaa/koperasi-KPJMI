import { useState } from "react";
import { cn } from "../../utils/cn";
import { Skeleton } from "./Skeleton";

interface Props {
  src: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
}

export function ImageWithSkeleton({ src, alt, className, wrapperClassName }: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={cn("relative overflow-hidden", wrapperClassName)}>
      {!loaded && <Skeleton className="absolute inset-0 h-full w-full" />}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={cn(
          "transition-all duration-700",
          loaded
            ? "scale-100 blur-0 opacity-100"
            : "scale-105 blur-xl opacity-0",
          className,
        )}
      />
    </div>
  );
}
