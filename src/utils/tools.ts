type Callback = (..._args: any[]) => void;
export function debounce<T extends Callback>(callback: T, delay = 300): T {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function Fn(...args: Parameters<T>) {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      callback.apply(Fn, args);
    }, delay);
  } as T;
}
