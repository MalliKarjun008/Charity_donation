import { useState, useEffect, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { RiArrowLeftWideFill, RiArrowRightWideFill } from "react-icons/ri";

function ImageOneSlider({ images }) {
  const [imageIdx, setImageIdx] = useState(0);
  const [direction, setDirection] = useState(1);
  const [autoSliding, setautoSliding] = useState(true);
  const intervalRef = useRef(null);

  // Auto slide every 5 sec when enabled
  useEffect(() => {
    if (images.length > 1 && autoSliding) {
      intervalRef.current = setInterval(() => {
        setDirection(1);
        setImageIdx((prev) => (prev + 1) % images.length);
      }, 5000);

      return () => clearInterval(intervalRef.current);
    }
  }, [images, autoSliding]);

  // Reset auto sliding after manual interaction
  const resetAutoSlide = () => {
    setautoSliding(false);
    clearInterval(intervalRef.current);

    // Restart auto sliding after 10 seconds of interactivity
    const timeout = setTimeout(() => {
      setautoSliding(true);
    }, 10000);

    return () => clearTimeout(timeout);
  };

  // Manual navigation
  const handleArrowPress = (side) => {
    if (side === "left") {
      setDirection(-1);
      setImageIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    }
    if (side === "right") {
      setDirection(1);
      setImageIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }

    resetAutoSlide();
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      position: "absolute",
    }),
    center: {
      x: 0,
      opacity: 1,
      position: "relative",
    },
    exit: (direction) => ({
      x: direction > 0 ? "-100%" : "100%",
      opacity: 0,
      position: "absolute",
    }),
  };

  const handleDotPress = (idx) => {
    setDirection(idx > imageIdx ? 1 : -1);
    setImageIdx(idx);
    resetAutoSlide();
  };

  return (
    <div className="relative flex items-center justify-center w-full h-80 mt-2 rounded-lg overflow-hidden">
      {images.length == 1 && (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          <img
            src={images[0].url}
            className="object-contain max-w-full max-h-full rounded-lg"
            alt="post image"
          />
        </div>
      )}
      {images.length > 1 && (
        <>
          {/* Left Arrow */}
          <button
            onClick={() => handleArrowPress("left")}
            className="absolute left-2 z-20 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition"
          >
            <RiArrowLeftWideFill size={30} />
          </button>

          {/* Image + Dots Container */}
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.img
                key={imageIdx}
                src={images[imageIdx].url}
                alt="post content"
                className="object-contain max-w-full max-h-full rounded-lg"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.5 },
                }}
              />
            </AnimatePresence>

            {/* Dots overlayed on image */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex rounded-full bg-black/30 py-1 px-4 justify-center items-center gap-2">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handleDotPress(idx)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    imageIdx === idx ? "bg-white" : "bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => handleArrowPress("right")}
            className="absolute right-2 z-20 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition"
          >
            <RiArrowRightWideFill size={30} />
          </button>
        </>
      )}
    </div>
  );
}

export default ImageOneSlider;
