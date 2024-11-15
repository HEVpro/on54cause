"use client";

import { useEffect, useId, useRef, useState } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface AnimatedGridPatternProps {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  strokeDasharray?: any;
  numSquares?: number;
  className?: string;
  maxOpacity?: number;
  duration?: number;
  repeatDelay?: number;
}

export default function AnimatedGridPattern({
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  strokeDasharray = 0,
  numSquares = 50,
  className,
  maxOpacity = 0.5,
  duration = 4,
  repeatDelay = 0.5,
  ...props
}: AnimatedGridPatternProps) {
  const id = useId();
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [squares, setSquares] = useState(() => generateSquares(numSquares));
  const [colorIndex, setColorIndex] = useState(0);

  function getPos() {
    return [
      Math.floor((Math.random() * dimensions.width) / width),
      Math.floor((Math.random() * dimensions.height) / height),
    ];
  }

  function generateSquares(count: number) {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      pos: getPos(),
    }));
  }

  const updateSquarePosition = (id: number) => {
    setSquares((currentSquares) =>
      currentSquares.map((sq) =>
        sq.id === id
          ? {
              ...sq,
              pos: getPos(),
            }
          : sq
      )
    );
  };

  useEffect(() => {
    if (dimensions.width && dimensions.height) {
      setSquares(generateSquares(numSquares));
    }
  }, [dimensions, numSquares]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, [containerRef]);

  const colorHexValues = [
    "#f0fafb",
    "#d8f1f5",
    "#b5e2ec",
    "#82cdde",
    "#53b3cb",
    "#2d92ad",
    "#287692",
    "#266078",
    "#275163",
    "#244455",
    "#fffbeb",
    "#fdf3c8",
    "#fce68b",
    "#fad34f",
    "#f9c22e",
    "#f39f0d",
    "#d77908",
    "#b2540b",
    "#91410f",
    "#773610",
    "#fef3f2",
    "#fee5e2",
    "#ffcfc9",
    "#fdaea4",
    "#f97f70",
    "#f15946",
    "#de3924",
    "#bb2c1a",
    "#9a281a",
    "#80271c",
    "#fff1f3",
    "#ffe4e7",
    "#ffccd5",
    "#fea3b2",
    "#fd6f8b",
    "#f63d65",
    "#e01a4f",
    "#c01043",
    "#a1103f",
    "#8a113c",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prevIndex) => (prevIndex + 1) % colorHexValues.length);
    }, 1000); // Change color every 1000ms

    return () => clearInterval(interval);
  }, []);

  const randomColor = colorHexValues[colorIndex];

  return (
    <svg
      ref={containerRef}
      aria-hidden="true"
      className={cn(
        `pointer-events-none absolute inset-0 h-full w-full `,
        className
      )}
      {...props}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path
            d={`M.5 ${height}V.5H${width}`}
            fill="none"
            stroke={"#ffffff"}
            strokeDasharray={strokeDasharray}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
      <svg x={x} y={y} className="overflow-visible">
        {squares.map(({ pos: [x, y], id }, index) => (
          <motion.rect
            initial={{ opacity: 0 }}
            animate={{ opacity: maxOpacity }}
            transition={{
              duration,
              repeat: 1,
              delay: index * 0.1,
              repeatType: "reverse",
            }}
            onAnimationComplete={() => updateSquarePosition(id)}
            key={`${x}-${y}-${index}`}
            width={width - 1}
            height={height - 1}
            x={x * width + 1}
            y={y * height + 1}
            fill={randomColor}
            strokeWidth="0"
          />
        ))}
      </svg>
    </svg>
  );
}
