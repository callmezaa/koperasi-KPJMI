import { cn } from "../../utils/cn";

interface Props {
  className?: string;
}

export function Skeleton({ className }: Props) {
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden rounded-xl bg-[#F3F4F6]",
        "before:absolute before:inset-0 before:-translate-x-full",
        "before:animate-[shimmer_1.8s_ease-in-out_infinite]",
        "before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent",
        className,
      )}
    />
  );
}
