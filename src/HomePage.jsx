
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scissors, Hand, HandFist, ChevronLeft } from 'lucide-react';
import ButtonOption from './Components/ButtonOption';
import ButtonReset from './Components/ButtonReset';

const iconMap = {
  scissors: Scissors,
  rock: HandFist,
  paper: Hand
};

const difficultyColors = {
  easy: 'text-green-400',
  medium: 'text-blue-400',
  hard: 'text-red-500'
};

function HomePage(props) {

  const UserIcon = props.userOption ? iconMap[props.userOption] : null;
  const BotIcon = props.botOption ? iconMap[props.botOption] : null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10 relative w-full max-w-4xl"
      >
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={props.handleBackToMenu}
          className="absolute left-0 top-1/2 -translate-y-1/2 p-2 hover:bg-white/10 rounded-full transition-colors text-white/50 hover:text-white"
        >
          <ChevronLeft size={32} />
        </motion.button>

        <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary drop-shadow-lg">
          Gunting Batu Kertas
        </h1>
        <p className="text-white/60 mt-2 text-lg">
          Difficulty: <span className={`font-bold uppercase ${difficultyColors[props.difficulty] || 'text-white'}`}>{props.difficulty}</span>
        </p>
      </motion.div>

      <div className="w-full max-w-4xl bg-surface/30 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl -z-10" />

        <div className="text-center">
          <h2 className="text-2xl font-semibold text-white/90 mb-8">
            Select Your Weapon
          </h2>

          <AnimatePresence mode="wait">
            {!props.userOption ? (
              <motion.div
                key="options"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ButtonOption
                  setBotOption={props.setBotOption}
                  setUserOption={props.setUserOption}
                  options={props.options}
                />
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center gap-8 py-8"
              >
                <div className="flex items-center gap-8 md:gap-16">
                  <div className="text-center group">
                    <div className="mb-4 p-6 rounded-2xl bg-white/5 border border-white/10 shadow-xl">
                      {UserIcon && <UserIcon size={80} className="text-accent drop-shadow-lg" />}
                    </div>
                    <p className="font-bold text-accent tracking-widest text-lg">YOU</p>
                  </div>
                  <div className="text-4xl font-black text-white/20 italic">VS</div>
                  <div className="text-center group">
                    <div className="mb-4 p-6 rounded-2xl bg-white/5 border border-white/10 shadow-xl">
                      {BotIcon && <BotIcon size={80} className="text-red-400 drop-shadow-lg" />}
                    </div>
                    <p className="font-bold text-red-400 tracking-widest text-lg">BOT</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.div
          className="mt-12 grid grid-cols-3 gap-4 bg-black/20 rounded-2xl p-4 border border-white/5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-center">
            <p className="text-white/50 text-sm">Win Rate</p>
            <p className="text-xl md:text-2xl font-bold text-accent">
              {props.totalPertandingan > 0 ? Math.round(props.winRate) : 0}%
            </p>
          </div>
          <div className="text-center border-x border-white/10">
            <p className="text-white/50 text-sm">Matches</p>
            <p className="text-xl md:text-2xl font-bold text-white">
              {props.totalPertandingan}
            </p>
          </div>
          <div className="text-center">
            <p className="text-white/50 text-sm">Score</p>
            <p className="text-xl md:text-2xl font-bold text-yellow-400">
              {props.totalPertandingan > 0 ? props.point : 0}
            </p>
          </div>
        </motion.div>

        {props.userOption && (
          <ButtonReset handleReset={props.handleReset} />
        )}
      </div>
    </div>
  );
}

export default HomePage;
