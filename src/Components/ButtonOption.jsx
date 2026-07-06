import React from 'react';
import { motion } from 'framer-motion';
import { Scissors, Hand, HandFist } from 'lucide-react';

function ButtonOption({ setUserOption }) {
  const choices = [
    { name: 'Gunting', icon: Scissors, value: 'scissors', color: 'from-pink-500 to-rose-500' },
    { name: 'Batu', icon: HandFist, value: 'rock', color: 'from-blue-500 to-cyan-500' },
    { name: 'Kertas', icon: Hand, value: 'paper', color: 'from-amber-400 to-orange-500' },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-6 z-10">
      {choices.map((choice) => (
        <motion.button
          key={choice.name}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300 }}
          className={`flex flex-col items-center justify-center w-32 h-32 md:w-40 md:h-40 rounded-2xl 
            bg-gradient-to-br ${choice.color} shadow-lg shadow-white/10
            border border-white/20 backdrop-blur-sm group`}
          onClick={() => setUserOption(choice.value)}
        >
          <choice.icon size={64} className="text-white mb-2 drop-shadow-md group-hover:scale-110 transition-transform" strokeWidth={1.5} />
          <span className="text-white font-bold text-lg tracking-wide uppercase drop-shadow-sm">
            {choice.name}
          </span>
        </motion.button>
      ))}
    </div>
  );
}

export default ButtonOption;
