'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[50vh] p-8 text-center bg-surface">
      <div className="w-20 h-20 bg-error/10 text-error rounded-full flex items-center justify-center mb-6">
        <span className="material-symbols-outlined text-4xl">warning</span>
      </div>
      <h2 className="text-3xl font-black tracking-tight text-on-surface mb-2">Something went wrong!</h2>
      <p className="text-on-surface-variant font-medium mb-8 max-w-md">
        We encountered an unexpected error while processing your request. Please try again.
      </p>
      <div className="flex gap-4">
        <button
          className="bg-primary text-white px-8 py-3 rounded-full font-bold shadow-md hover:bg-primary/90 transition-all active:scale-95"
          onClick={() => reset()}
        >
          Try again
        </button>
        <button
          className="bg-surface-container-high text-on-surface px-8 py-3 rounded-full font-bold shadow-sm hover:bg-surface-container-highest transition-all active:scale-95"
          onClick={() => window.location.href = '/'}
        >
          Go Home
        </button>
      </div>
    </div>
  );
}
