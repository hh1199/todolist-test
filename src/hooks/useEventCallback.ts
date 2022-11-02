import { useRef, useEffect, useCallback } from 'react';
import { CallBack } from '../type';

export const useEventCallback = <T extends (...args: any[]) => unknown>(
  fn: T,
  deps: ReadonlyArray<unknown>,
): CallBack => {
  const ref = useRef<T>(fn);

  useEffect(() => {
    ref.current = fn;
  }, [fn, ...deps]);

  return useCallback(
    (...args: any[]) => {
      const callback = ref.current;
      callback(...args);
    },
    [ref],
  );
};
