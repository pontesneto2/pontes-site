export default function SegmentedProgress({
  total,
  current,
}: {
  total: number;
  current: number;
}) {
  return (
    <div className="mx-auto flex w-full max-w-xs items-center gap-1" role="presentation">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={`h-1.5 flex-1 rounded-full transition-colors duration-200 ${
            i <= current ? "bg-gradient-to-r from-violet-500 to-fuchsia-500" : "bg-white/10"
          }`}
        />
      ))}
    </div>
  );
}
