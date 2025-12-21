"use client";
import { useEffect, useState } from "react";

export const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T, (value: T) => void, boolean] => {
  const [state, setState] = useState<T>(initialValue);
  const [isPending, setIsPending] = useState<boolean>(true);

  const handleSetState = (value: T) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      setState(value);
    } catch (err) {}
  };

  useEffect(() => {
    try {
      const storedValue = localStorage.getItem(key);

      if (storedValue !== null) {
        setState(JSON.parse(storedValue));
      } else {
        localStorage.setItem(key, JSON.stringify(initialValue));
        setState(initialValue);
      }
    } catch (err) {
      setState(initialValue);
    } finally {
      setIsPending(false);
    }
  }, [key, initialValue]);

  return [state, handleSetState, isPending];
};
