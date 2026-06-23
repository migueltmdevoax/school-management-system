import { useSelector } from "react-redux";

export default function GlobalLoader() {
  const globalLoading = useSelector((s) => s.loading.globalLoading);
  if (!globalLoading) return null;

  return (
    <div className="fixed inset-0 z-[999999] bg-black/50 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-gray-950 border border-gray-800 rounded-2xl px-8 py-6 shadow-2xl flex items-center gap-4">
        <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-white font-medium">Loading...</p>
      </div>
    </div>
  );
}