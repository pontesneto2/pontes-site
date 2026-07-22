import SpinnerRing from "@/components/SpinnerRing";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#08080b]">
      <SpinnerRing size="sm" />
    </div>
  );
}
