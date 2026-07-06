import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scissors, Hand, HandFist, ChevronLeft, Trash2, ShieldAlert } from 'lucide-react';
import ButtonOption from './Components/ButtonOption';
import ButtonReset from './Components/ButtonReset';
import BotAvatar from './Components/BotAvatar';

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

const weaponNames = {
  scissors: 'Gunting',
  rock: 'Batu',
  paper: 'Kertas'
};

function HomePage(props) {
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const UserIcon = props.userOption ? iconMap[props.userOption] : null;
  const BotIcon = props.botOption ? iconMap[props.botOption] : null;

  // Bot Avatar expression status
  const getBotAvatarStatus = () => {
    if (props.isShaking) return 'shaking';
    if (props.roundResult === 'win') return 'lose'; // Player wins = Bot loses
    if (props.roundResult === 'lose') return 'win'; // Player loses = Bot wins
    if (props.roundResult === 'draw') return 'draw';
    return 'idle';
  };

  const renderBattleArena = () => {
    // If shaking, we display the shaking fists
    if (props.isShaking) {
      return (
        <div className="flex items-center justify-center gap-4 md:gap-16 py-6 md:py-8">
          {/* Player Shaking Fist */}
          <div className="text-center">
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [90, 85, 90]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 0.35, 
                ease: "easeInOut" 
              }}
              className="mb-3 p-3 md:p-6 rounded-2xl bg-white/5 border border-white/10 shadow-xl"
            >
              <HandFist className="w-12 h-12 md:w-20 md:h-20 text-accent drop-shadow-lg transform rotate-90" />
            </motion.div>
            <p className="font-bold text-accent tracking-widest text-sm md:text-lg">YOU</p>
          </div>

          {/* Shaking VS */}
          <motion.div 
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 0.35 }}
            className="text-2xl md:text-4xl font-black text-white/30 italic"
          >
            VS
          </motion.div>

          {/* Bot Shaking Fist */}
          <div className="text-center">
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [-90, -85, -90]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 0.35, 
                ease: "easeInOut" 
              }}
              className="mb-3 p-3 md:p-6 rounded-2xl bg-white/5 border border-white/10 shadow-xl"
            >
              <HandFist className="w-12 h-12 md:w-20 md:h-20 text-red-400 drop-shadow-lg transform -scale-x-100 -rotate-90" />
            </motion.div>
            <p className="font-bold text-red-400 tracking-widest text-sm md:text-lg">BOT</p>
          </div>
        </div>
      );
    }

    // Shaking finished, show actual results
    return (
      <div className="flex flex-col items-center gap-4 md:gap-6 py-2 md:py-4">
        <div className="flex items-center justify-center gap-3 md:gap-16">
          {/* Player Pick */}
          <div className="text-center">
            <motion.div
              initial={{ scale: 0.3, rotate: -45, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className={`mb-3 p-3 md:p-6 rounded-2xl bg-white/5 border border-white/10 shadow-xl transition-all duration-300 ${
                props.roundResult === 'win' ? 'ring-4 ring-emerald-500 shadow-emerald-500/20' : ''
              }`}
            >
              {UserIcon && <UserIcon className="w-12 h-12 md:w-20 md:h-20 text-accent drop-shadow-lg" />}
            </motion.div>
            <p className="font-bold text-accent tracking-widest text-sm md:text-lg">YOU</p>
            <p className="text-white/50 text-[10px] md:text-xs mt-1 font-semibold uppercase tracking-wider">
              {weaponNames[props.userOption]}
            </p>
          </div>

          <div className="text-center z-10 min-w-[100px] md:min-w-[180px]">
            {/* Show Result Label */}
            <AnimatePresence mode="wait">
              {props.roundResult === 'win' && (
                <motion.div
                  key="win"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1.1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  className="text-emerald-400 font-extrabold text-lg md:text-3xl drop-shadow-[0_0_15px_rgba(16,185,129,0.5)] tracking-wide select-none uppercase"
                >
                  YOU WIN! 🎉
                </motion.div>
              )}
              {props.roundResult === 'lose' && (
                <motion.div
                  key="lose"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1.1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  className="text-red-500 font-extrabold text-lg md:text-3xl drop-shadow-[0_0_15px_rgba(239,68,68,0.5)] tracking-wide select-none uppercase"
                >
                  YOU LOSE! 😢
                </motion.div>
              )}
              {props.roundResult === 'draw' && (
                <motion.div
                  key="draw"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1.1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  className="text-yellow-500 font-extrabold text-lg md:text-3xl drop-shadow-[0_0_15px_rgba(234,179,8,0.5)] tracking-wide select-none uppercase"
                >
                  DRAW! 🤝
                </motion.div>
              )}
            </AnimatePresence>
            <div className="text-xs font-black text-white/10 italic mt-3">VS</div>
          </div>

          {/* Bot Pick */}
          <div className="text-center">
            <motion.div
              initial={{ scale: 0.3, rotate: 45, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.15 }}
              className={`mb-3 p-3 md:p-6 rounded-2xl bg-white/5 border border-white/10 shadow-xl transition-all duration-300 ${
                props.roundResult === 'lose' ? 'ring-4 ring-red-500 shadow-red-500/20' : ''
              }`}
            >
              {BotIcon && <BotIcon className="w-12 h-12 md:w-20 md:h-20 text-red-400 drop-shadow-lg" />}
            </motion.div>
            <p className="font-bold text-red-400 tracking-widest text-sm md:text-lg">BOT</p>
            <p className="text-white/50 text-[10px] md:text-xs mt-1 font-semibold uppercase tracking-wider">
              {weaponNames[props.botOption]}
            </p>
          </div>
        </div>
      </div>
    );
  };

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

        {/* Global Stats Reset Button */}
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => setShowResetConfirm(true)}
          className="absolute right-0 top-1/2 -translate-y-1/2 p-2 hover:bg-red-500/10 rounded-full transition-colors text-white/50 hover:text-red-400"
          title="Reset Semua Data"
        >
          <Trash2 size={24} />
        </motion.button>
      </motion.div>

      <div className="w-full max-w-4xl bg-surface/30 backdrop-blur-xl border border-white/10 rounded-3xl p-4 md:p-8 shadow-2xl relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl -z-10" />

        <div className="text-center">
          {/* Bot Reactive Avatar */}
          <BotAvatar status={getBotAvatarStatus()} />

          <h2 className="text-2xl font-semibold text-white/90 mb-8 min-h-[36px]">
            {props.isShaking ? 'Gunting... Batu... Kertas...' : (!props.userOption ? 'Pilih Senjata Kamu' : 'Hasil Ronde')}
          </h2>

          <AnimatePresence mode="wait">
            {!props.userOption ? (
              <motion.div
                key="options"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <ButtonOption
                  setBotOption={props.setBotOption}
                  setUserOption={props.setUserOption}
                  options={props.options}
                />
              </motion.div>
            ) : (
              <motion.div
                key="battle"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
              >
                {renderBattleArena()}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Stats Section */}
        <motion.div
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 bg-black/20 rounded-2xl p-4 border border-white/5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-center">
            <p className="text-white/50 text-xs md:text-sm">Win Rate</p>
            <p className="text-lg md:text-2xl font-bold text-accent">
              {props.totalPertandingan > 0 ? Math.round(props.winRate) : 0}%
            </p>
          </div>
          <div className="text-center border-l border-white/10">
            <p className="text-white/50 text-xs md:text-sm">Matches</p>
            <p className="text-lg md:text-2xl font-bold text-white">
              {props.totalPertandingan}
            </p>
          </div>
          <div className="text-center border-l border-white/10">
            <p className="text-white/50 text-xs md:text-sm">Win Streak</p>
            <p className="text-lg md:text-2xl font-bold text-orange-400 flex items-center justify-center gap-1">
              {props.streak} <span className="text-orange-500 animate-pulse text-sm md:text-lg">🔥</span>
              <span className="text-[10px] md:text-xs text-white/40 font-normal ml-0.5">
                (Best {props.maxStreak})
              </span>
            </p>
          </div>
          <div className="text-center border-l border-white/10 relative">
            <p className="text-white/50 text-xs md:text-sm">Score</p>
            <p className="text-lg md:text-2xl font-bold text-yellow-400">
              {props.totalPertandingan > 0 ? props.point : 0}
            </p>
            {/* Floating Score effect */}
            <AnimatePresence>
              {props.scoreEffect && (
                <motion.span
                  key={props.scoreEffect}
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  animate={{ opacity: 1, y: -25, scale: 1.25 }}
                  exit={{ opacity: 0, y: -45 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className={`absolute left-1/2 -translate-x-1/2 font-extrabold text-sm md:text-lg z-20 ${
                    props.scoreEffect.startsWith('+') 
                      ? 'text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.6)]' 
                      : 'text-red-400 drop-shadow-[0_0_8px_rgba(248,113,113,0.6)]'
                  }`}
                >
                  {props.scoreEffect}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {props.userOption && !props.isShaking && (
          <ButtonReset handleReset={props.handleReset} />
        )}
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showResetConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowResetConfirm(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            {/* Dialog Content */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 border border-white/10 rounded-3xl p-8 max-w-md w-full relative z-10 shadow-2xl text-center"
            >
              <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-red-500">
                <ShieldAlert size={36} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Reset Semua Data?</h3>
              <p className="text-white/60 mb-8 leading-relaxed">
                Tindakan ini akan menghapus semua skor, kemenangan, dan streak terbaik Anda selamanya. Tindakan ini tidak bisa dibatalkan.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="flex-1 py-3 rounded-xl border border-white/10 text-white/80 font-semibold hover:bg-white/5 transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={() => {
                    props.handleResetAll();
                    setShowResetConfirm(false);
                  }}
                  className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold transition-colors shadow-lg shadow-red-600/30"
                >
                  Ya, Reset
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default HomePage;
