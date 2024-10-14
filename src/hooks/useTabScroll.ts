'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

type UseTapScrollProps = {
  ref: React.RefObject<HTMLDivElement>;
};

export function useTapScroll({ ref }: UseTapScrollProps) {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);
  const [isOverflowing, setIsOverflowing] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1280);

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check on mount

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (!ref.current) return;
    const calculateOverflowStates = () => {
      if (ref.current) {
        setIsOverflowing(ref.current.scrollWidth > ref.current.clientWidth);
      }
    };
    // Calculate overflow states on mount and when refs are updated
    calculateOverflowStates();
  }, [ref]);

  // Handlers for arrow buttons on desktop, with specific ref
  const createScrollHandler = useCallback(
    (ref: React.RefObject<HTMLElement>, direction: 'left' | 'right') => {
      if (!isDesktop) return () => {};

      return () => {
        if (ref.current) {
          const scrollAmount = direction === 'left' ? -500 : 500;
          ref.current.scrollBy({
            left: scrollAmount,
            behavior: 'smooth',
          });
        }
      };
    },
    [isDesktop],
  );

  const scrollHandlers = useMemo(() => {
    if (!isDesktop || !isOverflowing) return null;

    return {
      createScrollLeft: () => createScrollHandler(ref, 'left'),
      createScrollRight: () => createScrollHandler(ref, 'right'),
    };
  }, [isDesktop, isOverflowing, ref, createScrollHandler]);

  return isDesktop ? { scrollHandlers } : null;
}
