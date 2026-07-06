import React from 'react';
import { motion } from 'framer-motion';

function BotAvatar({ status = 'idle' }) {
  // Color theme according to status
  const getThemeColors = () => {
    switch (status) {
      case 'shaking':
        return {
          eyeColor: '#10b981', // Emerald Green
          glowColor: 'rgba(16, 185, 129, 0.4)',
          antennaColor: '#10b981',
          screenBorder: 'border-emerald-500/30'
        };
      case 'win':
        return {
          eyeColor: '#ef4444', // Red
          glowColor: 'rgba(239, 68, 68, 0.5)',
          antennaColor: '#ef4444',
          screenBorder: 'border-red-500/40'
        };
      case 'lose':
        return {
          eyeColor: '#3b82f6', // Blue (Sad)
          glowColor: 'rgba(59, 130, 246, 0.4)',
          antennaColor: '#3b82f6',
          screenBorder: 'border-blue-500/30'
        };
      case 'draw':
        return {
          eyeColor: '#eab308', // Yellow
          glowColor: 'rgba(234, 179, 8, 0.4)',
          antennaColor: '#eab308',
          screenBorder: 'border-yellow-500/30'
        };
      case 'idle':
      default:
        return {
          eyeColor: '#22d3ee', // Cyan
          glowColor: 'rgba(34, 211, 238, 0.3)',
          antennaColor: '#22d3ee',
          screenBorder: 'border-cyan-500/20'
        };
    }
  };

  const theme = getThemeColors();

  // Floating animation for the whole head
  const headBob = {
    animate: {
      y: [0, -6, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Eyes rendering based on status
  const renderEyes = () => {
    switch (status) {
      case 'shaking':
        return (
          <>
            {/* Spinning/scanning eyes */}
            <motion.circle
              cx="35"
              cy="40"
              r="7"
              fill={theme.eyeColor}
              animate={{ scale: [1, 1.3, 0.8, 1] }}
              transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut" }}
            />
            <motion.circle
              cx="65"
              cy="40"
              r="7"
              fill={theme.eyeColor}
              animate={{ scale: [0.8, 1, 1.3, 0.8] }}
              transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut" }}
            />
          </>
        );
      case 'win':
        return (
          <>
            {/* Smug / Happy ^ ^ eyes */}
            <motion.path
              d="M 28 44 L 35 37 L 42 44"
              stroke={theme.eyeColor}
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.3 }}
            />
            <motion.path
              d="M 58 44 L 65 37 L 72 44"
              stroke={theme.eyeColor}
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.3 }}
            />
          </>
        );
      case 'lose':
        return (
          <>
            {/* Sad / Curved down eyes */}
            <motion.path
              d="M 28 38 L 35 44 M 35 44 L 42 38"
              stroke={theme.eyeColor}
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.3 }}
            />
            <motion.path
              d="M 58 38 L 65 44 M 65 44 L 72 38"
              stroke={theme.eyeColor}
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.3 }}
            />
          </>
        );
      case 'draw':
        return (
          <>
            {/* Flat neutral eyes - - */}
            <motion.line
              x1="28"
              y1="40"
              x2="42"
              y2="40"
              stroke={theme.eyeColor}
              strokeWidth="4"
              strokeLinecap="round"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.line
              x1="58"
              y1="40"
              x2="72"
              y2="40"
              stroke={theme.eyeColor}
              strokeWidth="4"
              strokeLinecap="round"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.2 }}
            />
          </>
        );
      case 'idle':
      default:
        return (
          <>
            {/* Blinking cyan circles */}
            <motion.circle
              cx="35"
              cy="40"
              r="6"
              fill={theme.eyeColor}
              animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
              transition={{ repeat: Infinity, duration: 4, repeatDelay: 2 }}
            />
            <motion.circle
              cx="65"
              cy="40"
              r="6"
              fill={theme.eyeColor}
              animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
              transition={{ repeat: Infinity, duration: 4, repeatDelay: 2 }}
            />
          </>
        );
    }
  };

  // Mouth rendering based on status
  const renderMouth = () => {
    switch (status) {
      case 'win':
        return (
          <motion.path
            d="M 40 54 Q 50 62 60 54"
            stroke={theme.eyeColor}
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.3 }}
          />
        );
      case 'lose':
        return (
          <motion.path
            d="M 42 58 Q 50 52 58 58"
            stroke={theme.eyeColor}
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.3 }}
          />
        );
      case 'shaking':
        return (
          <motion.path
            d="M 42 56 Q 46 52 50 56 T 58 56"
            stroke={theme.eyeColor}
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            animate={{
              d: [
                "M 42 56 Q 46 52 50 56 T 58 56",
                "M 42 56 Q 46 60 50 56 T 58 56",
                "M 42 56 Q 46 52 50 56 T 58 56"
              ]
            }}
            transition={{ repeat: Infinity, duration: 0.6 }}
          />
        );
      case 'draw':
      case 'idle':
      default:
        return (
          <motion.line
            x1="45"
            y1="56"
            x2="55"
            y2="56"
            stroke={theme.eyeColor}
            strokeWidth="3"
            strokeLinecap="round"
          />
        );
    }
  };

  return (
    <motion.div
      variants={headBob}
      animate="animate"
      className="flex flex-col items-center justify-center mb-6"
    >
      <div className="relative w-28 h-28 flex items-center justify-center">
        {/* Antenna */}
        <div className="absolute top-0 w-1.5 h-6 bg-slate-500 rounded-full" style={{ transform: 'translateY(-50%)' }} />
        <motion.div
          animate={{
            scale: status === 'shaking' ? [1, 1.4, 1] : [1, 1.2, 1],
            opacity: status === 'shaking' ? [0.8, 1, 0.8] : [0.5, 0.8, 0.5]
          }}
          transition={{
            duration: status === 'shaking' ? 0.3 : 2,
            repeat: Infinity
          }}
          className="absolute -top-4 w-4 h-4 rounded-full shadow-lg"
          style={{
            backgroundColor: theme.antennaColor,
            boxShadow: `0 0 12px ${theme.glowColor}`
          }}
        />

        {/* Robot Head Frame */}
        <div className={`w-28 h-24 bg-slate-800 rounded-3xl border-2 ${theme.screenBorder} flex items-center justify-center p-2.5 shadow-2xl relative transition-colors duration-300`}>
          {/* Side Ears */}
          <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-2 h-8 bg-slate-600 rounded-l-md border-y border-l border-white/10" />
          <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-2 h-8 bg-slate-600 rounded-r-md border-y border-r border-white/10" />

          {/* Screen */}
          <div className="w-full h-full bg-slate-950 rounded-2xl relative overflow-hidden flex items-center justify-center border border-slate-900 shadow-inner">
            {/* Scanlines effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,24,38,0)_95%,rgba(0,0,0,0.3)_95%)] bg-[size:100%_4px] pointer-events-none opacity-40" />

            {/* Glowing screen backing */}
            <div
              className="absolute inset-0 opacity-10 transition-colors duration-300"
              style={{
                background: `radial-gradient(circle, ${theme.glowColor} 0%, transparent 70%)`
              }}
            />

            {/* Face SVG */}
            <svg width="100" height="80" viewBox="0 0 100 80" className="relative z-10">
              {/* Render Eyes */}
              {renderEyes()}

              {/* Render Mouth */}
              {renderMouth()}
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default BotAvatar;
