import { useEffect, useRef, useState } from 'react';

////////////////////////
const delay = 5000;

////////////////////////
export function useTimeout(data) {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();

    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === data.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => resetTimeout();
  }, [index, data.length]);

  return { index, setIndex };
}
