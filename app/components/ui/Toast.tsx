'use client';

import { useUI } from '@/app/context/UIContext';

export default function Toast() {
  const { toasts, removeToast } = useUI();

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`rounded-md px-4 py-3 text-white ${
            toast.type === 'error'
              ? 'bg-red-500'
              : toast.type === 'success'
              ? 'bg-green-500'
              : 'bg-blue-500'
          }`}
        >
          <div className="flex items-center gap-2">
            <span>{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-auto text-white hover:text-gray-200"
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
