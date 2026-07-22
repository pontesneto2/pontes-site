export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0d]">
      <div
        className="h-10 w-10 rounded-full border-2 border-violet-500/25 border-t-violet-400 animate-spin motion-reduce:animate-none"
        role="status"
        aria-label="Loading"
      />
    </div>
  );
}
