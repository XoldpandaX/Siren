import { type FC, type PointerEvent, useRef, useEffect, useCallback } from 'react';

import './range-bar.scss';

interface RangeBarProps {
  /** The maximum value of the range */
  max: number;

  /** The current value, controlled externally */
  value: number;

  /**
   * Callback triggered when the user releases the mouse
   * after changing the value
   */
  onChange: (newValue: number) => void;
}

export const RangeBar: FC<RangeBarProps> = ({ max, value, onChange }) => {
  const barRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const currentPosRef = useRef(value);
  const activePointerIdRef = useRef<number | null>(null);

  // Обновление thumb и progress напрямую через ref
  const updateThumb = useCallback(
    (pos: number) => {
      if (!barRef.current || !thumbRef.current) return;
      const percent = Math.min(Math.max((pos / max) * 100, 0), 100);
      thumbRef.current.style.left = `${percent}%`;
      const progress = barRef.current.querySelector<HTMLDivElement>('.range-bar__progress');
      if (progress) progress.style.width = `${percent}%`;
    },
    [max]
  );

  // Synchronize with external value only when the thumb is not being dragged
  useEffect(() => {
    if (!isDraggingRef.current) {
      currentPosRef.current = value;
      updateThumb(value);
    }
  }, [value, updateThumb]);

  const calcValue = useCallback(
    (clientX: number) => {
      if (!barRef.current) return 0;
      const rect = barRef.current.getBoundingClientRect();
      const offsetX = Math.min(Math.max(clientX - rect.left, 0), rect.width);
      return (offsetX / rect.width) * max;
    },
    [max]
  );

  const handlePointerDown = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      if (e.button !== 0 || isDraggingRef.current) return;

      e.preventDefault();
      e.stopPropagation();

      isDraggingRef.current = true;
      activePointerIdRef.current = e.pointerId;
      currentPosRef.current = calcValue(e.clientX);
      updateThumb(currentPosRef.current);

      // Захватываем pointer на элементе
      e.currentTarget.setPointerCapture(e.pointerId);
    },
    [calcValue, updateThumb]
  );

  const handlePointerMove = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      if (!isDraggingRef.current || activePointerIdRef.current !== e.pointerId) return;

      e.preventDefault();
      e.stopPropagation();

      currentPosRef.current = calcValue(e.clientX);
      updateThumb(currentPosRef.current);
    },
    [calcValue, updateThumb]
  );

  const handlePointerUp = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      if (!isDraggingRef.current || activePointerIdRef.current !== e.pointerId) return;

      e.preventDefault();
      e.stopPropagation();

      const finalValue = currentPosRef.current;

      // Сбрасываем состояние
      isDraggingRef.current = false;
      activePointerIdRef.current = null;

      // Освобождаем pointer capture
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }

      // Вызываем onChange
      onChange(finalValue);
    },
    [onChange]
  );

  const handlePointerCancel = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      if (!isDraggingRef.current || activePointerIdRef.current !== e.pointerId) return;

      const finalValue = currentPosRef.current;

      // Сбрасываем состояние
      isDraggingRef.current = false;
      activePointerIdRef.current = null;

      // Вызываем onChange
      onChange(finalValue);
    },
    [onChange]
  );

  const handleLostPointerCapture = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      if (!isDraggingRef.current || activePointerIdRef.current !== e.pointerId) return;

      const finalValue = currentPosRef.current;

      // Сбрасываем состояние
      isDraggingRef.current = false;
      activePointerIdRef.current = null;

      // Вызываем onChange
      onChange(finalValue);
    },
    [onChange]
  );

  return (
    <div
      ref={barRef}
      className="range-bar"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      onLostPointerCapture={handleLostPointerCapture}
      style={{ touchAction: 'none' }} // Disable native browser touch events
    >
      <div className="range-bar__progress" />
      <div ref={thumbRef} className="range-bar__thumb" />
    </div>
  );
};
