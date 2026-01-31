import React from 'react';
import { motion } from 'framer-motion';
import { RotateCcw } from 'lucide-react';

function ButtonReset({ handleReset }) {
  return (
    <div className="mt-8 flex justify-center">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={handleReset}
        className="px-8 py-3 rounded-full bg-surface border border-white/10 text-white/80 
                   font-semibold hover:bg-white/10 hover:text-white transition-colors
                   shadow-lg backdrop-blur-md flex items-center gap-2"
      >
        <RotateCcw size={18} />
        Main Lagi
      </motion.button>
    </div>
  );
}

export default ButtonReset;
