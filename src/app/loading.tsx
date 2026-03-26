import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-screen bg-surface">
      <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
      <p className="text-on-surface-variant font-bold tracking-widest uppercase text-sm animate-pulse">
        Loading...
      </p>
    </div>
  );
}
