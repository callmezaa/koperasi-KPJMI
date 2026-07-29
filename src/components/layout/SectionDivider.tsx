interface Props {
  variant?: "wave" | "curve" | "leaf";
  from?: string;
}

const variants = {
  wave: {
    viewBox: "0 0 1440 48",
    paths: [
      "M0 24C240 48 480 0 720 24C960 48 1200 0 1440 24V48H0V24Z",
    ],
  },
  curve: {
    viewBox: "0 0 1440 64",
    paths: [
      "M0 0C360 64 720 0 1440 32V64H0V0Z",
    ],
  },
  leaf: {
    viewBox: "0 0 1440 56",
    paths: [
      "M0 28C180 56 360 14 540 28C720 42 900 0 1080 14C1260 28 1350 42 1440 28V56H0V28Z",
      "M0 28C180 48 360 20 540 28C720 36 900 8 1080 20C1260 32 1350 40 1440 28",
    ],
  },
};

export function SectionDivider({ variant = "wave", from = "#FAFAFA" }: Props) {
  const v = variants[variant];

  return (
    <div className="pointer-events-none -mb-1 leading-none" aria-hidden="true">
      <svg
        viewBox={v.viewBox}
        preserveAspectRatio="none"
        className="h-[32px] w-full sm:h-[40px] lg:h-[48px]"
        style={{ color: from }}
      >
        {v.paths.map((d, i) => (
          <path
            key={i}
            d={d}
            fill="currentColor"
            opacity={i === 0 ? 1 : 0.4}
          />
        ))}
      </svg>
    </div>
  );
}
