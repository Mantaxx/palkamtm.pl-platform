'use client';

import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from 'lucide-react';
import { MouseEventHandler, useEffect, useState } from 'react';

interface ImageItem {
  id: string;
  src: string;
  alt: string;
}

interface ImageModalProps {
  image: ImageItem;
  onClose: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  hasPrevious?: boolean;
  hasNext?: boolean;
}

export default function ImageModal({ image, onClose, onPrevious, onNext, hasPrevious, hasNext }: ImageModalProps) {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Blokuj scroll
    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscapeKey);

    return () => {
      // Przywróć scroll
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollY);
      window.removeEventListener('keydown', handleEscapeKey);
    };
  }, [onClose]);

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.5, 0.5));
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
    setImagePosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - imagePosition.x, y: e.clientY - imagePosition.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoomLevel > 1) {
      setImagePosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      handleZoomIn();
    } else {
      handleZoomOut();
    }
  };

  const handleBackdropClick: MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={handleBackdropClick}
    >
      <motion.div
        className="relative w-full h-full max-w-none max-h-none overflow-hidden"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
      >
        {/* Zoom Controls */}
        <div className="absolute top-4 left-4 flex items-center space-x-2 z-10">
          <button
            onClick={handleZoomOut}
            disabled={zoomLevel <= 0.5}
            className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Oddal"
          >
            <ZoomOut size={20} />
          </button>

          <button
            onClick={handleResetZoom}
            className="px-3 py-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors text-sm"
            aria-label="Resetuj zoom"
          >
            {Math.round(zoomLevel * 100)}%
          </button>

          <button
            onClick={handleZoomIn}
            disabled={zoomLevel >= 3}
            className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Przybliż"
          >
            <ZoomIn size={20} />
          </button>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors z-10"
          aria-label="Zamknij"
        >
          <X size={24} />
        </button>

        {/* Previous Button */}
        {onPrevious && hasPrevious && (
          <button
            onClick={onPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors disabled:opacity-30 disabled:cursor-not-allowed z-10"
            aria-label="Poprzednie zdjęcie"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        {/* Next Button */}
        {onNext && hasNext && (
          <button
            onClick={onNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors disabled:opacity-30 disabled:cursor-not-allowed z-10"
            aria-label="Następne zdjęcie"
          >
            <ChevronRight size={24} />
          </button>
        )}

        {/* Image Container */}
        <div
          className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing bg-black"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
        >
          <motion.img
            src={image.src}
            alt={image.alt}
            className="max-w-full max-h-full object-contain"
            animate={{
              scale: zoomLevel,
              x: imagePosition.x / zoomLevel,
              y: imagePosition.y / zoomLevel,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            drag={isDragging}
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            onDrag={(e, info) => {
              if (zoomLevel > 1) {
                setImagePosition({
                  x: imagePosition.x + info.delta.x,
                  y: imagePosition.y + info.delta.y
                });
              }
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}