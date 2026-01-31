
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, ShieldAlert, ShieldCheck } from 'lucide-react';

function DifficultySelection({ setDifficulty }) {
    const levels = [
        {
            id: 'easy',
            name: 'Easy',
            desc: 'Bot plays randomly.',
            icon: ShieldCheck,
            color: 'from-green-400 to-emerald-600',
            shadow: 'shadow-green-500/30'
        },
        {
            id: 'medium',
            name: 'Medium',
            desc: 'Bot tries to counter you.',
            icon: Shield,
            color: 'from-blue-400 to-indigo-600',
            shadow: 'shadow-blue-500/30'
        },
        {
            id: 'hard',
            name: 'Impossible',
            desc: 'Bot reads your mind!',
            icon: ShieldAlert,
            color: 'from-red-500 to-rose-700',
            shadow: 'shadow-red-500/30'
        }
    ];

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
            >
                <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-400 mb-4">
                    Choose Difficulty
                </h1>
                <p className="text-white/60 text-lg">Select your challenge level</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
                {levels.map((level, index) => (
                    <motion.div
                        key={level.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05, y: -10 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setDifficulty(level.id)}
                        className={`relative overflow-hidden rounded-3xl p-8 cursor-pointer 
              bg-gradient-to-br ${level.color} shadow-2xl ${level.shadow}
              border border-white/20 backdrop-blur-sm group`}
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <level.icon size={120} />
                        </div>

                        <div className="relative z-10 flex flex-col items-center text-center h-full justify-between gap-6">
                            <div className="p-4 bg-white/10 rounded-full backdrop-blur-md">
                                <level.icon size={48} className="text-white" />
                            </div>

                            <div>
                                <h3 className="text-2xl font-bold text-white mb-2">{level.name}</h3>
                                <p className="text-white/80 font-medium">{level.desc}</p>
                            </div>

                            <div className="px-6 py-2 rounded-full bg-white/20 text-sm font-semibold text-white backdrop-blur-md group-hover:bg-white/30 transition-colors">
                                Select
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

export default DifficultySelection;
