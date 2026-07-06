import React, { useEffect, useState } from 'react'
import HomePage from './HomePage'
import DifficultySelection from './Components/DifficultySelection'

const options = ['scissors', 'rock', 'paper']

function App() {
  const [userOption, setUserOption] = useState(null)
  const [botOption, setBotOption] = useState(null)
  const [difficulty, setDifficulty] = useState(null)

  const [points, setPoints] = useState(0)
  const [win, setWin] = useState(0)
  const [lose, setLose] = useState(0)
  const [draw, setDraw] = useState(0)
  const [streak, setStreak] = useState(0)
  const [maxStreak, setMaxStreak] = useState(0)

  const [isShaking, setIsShaking] = useState(false)
  const [roundResult, setRoundResult] = useState(null)
  const [scoreEffect, setScoreEffect] = useState(null)

  const [isInitialized, setIsInitialized] = useState(false)
  const totalPertandingan = win + lose + draw
  const winRate = totalPertandingan > 0 ? Math.round((win / totalPertandingan) * 100) : 0

  function handleReset() {
    setUserOption(null)
    setBotOption(null)
    setRoundResult(null)
    setIsShaking(false)
  }

  function handleBackToMenu() {
    setDifficulty(null)
    handleReset()
  }

  function handleResetAll() {
    localStorage.removeItem('win')
    localStorage.removeItem('lose')
    localStorage.removeItem('draw')
    localStorage.removeItem('Point')
    localStorage.removeItem('streak')
    localStorage.removeItem('maxStreak')
    
    setWin(0)
    setLose(0)
    setDraw(0)
    setPoints(0)
    setStreak(0)
    setMaxStreak(0)
    handleReset()
  }

  // Load from Local Storage
  useEffect(() => {
    const savedWins = parseInt(localStorage.getItem('win')) || 0
    const savedLose = parseInt(localStorage.getItem('lose')) || 0
    const savedDraw = parseInt(localStorage.getItem('draw')) || 0
    const savedPoint = parseInt(localStorage.getItem('Point')) || 0
    const savedStreak = parseInt(localStorage.getItem('streak')) || 0
    const savedMaxStreak = parseInt(localStorage.getItem('maxStreak')) || 0
    
    setWin(savedWins)
    setPoints(savedPoint)
    setLose(savedLose)
    setDraw(savedDraw)
    setStreak(savedStreak)
    setMaxStreak(savedMaxStreak)
    setIsInitialized(true)
  }, [])

  // Save to Local Storage
  useEffect(() => {
    if (!isInitialized) return
    localStorage.setItem('win', win)
    localStorage.setItem('lose', lose)
    localStorage.setItem('draw', draw)
    localStorage.setItem('Point', points)
    localStorage.setItem('streak', streak)
    localStorage.setItem('maxStreak', maxStreak)
  }, [win, lose, draw, points, streak, maxStreak, isInitialized])

  // Clear score effect after some time
  useEffect(() => {
    if (scoreEffect) {
      const timer = setTimeout(() => setScoreEffect(null), 1500)
      return () => clearTimeout(timer)
    }
  }, [scoreEffect])

  // --- GAME LOGIC (OTAK BOT & PLAY ROUND) ---
  function handlePlay(playerPick) {
    if (isShaking) return

    setUserOption(playerPick)
    setBotOption(null)
    setRoundResult(null)
    setIsShaking(true)
    setScoreEffect(null)

    // Pilihan yang bikin BOT MENANG (Counter)
    const winningMove = {
      scissors: 'rock',
      rock: 'paper',
      paper: 'scissors'
    }[playerPick];

    // Pilihan yang bikin BOT KALAH (Player Menang)
    const losingMove = {
      scissors: 'paper',
      rock: 'scissors',
      paper: 'rock'
    }[playerPick];

    let botPick;
    
    // --- DIFFICULTY ALGORITHM ---
    if (difficulty === 'easy') {
      // MODE EZ: 80% Bot Sengaja Ngalah (Pilih losingMove)
      if (Math.random() < 0.8) {
        botPick = losingMove
      } else {
        const randomIndex = Math.floor(Math.random() * options.length)
        botPick = options[randomIndex]
      }
    } else if (difficulty === 'medium') {
      // MODE MEDIUM: 50% Curang (Counter), 50% Random
      if (Math.random() < 0.5) {
        botPick = winningMove
      } else {
        const randomIndex = Math.floor(Math.random() * options.length)
        botPick = options[randomIndex]
      }
    } else if (difficulty === 'hard') {
      // MODE HARD: 90% Curang (Counter/Impossible)
      if (Math.random() < 0.9) {
        botPick = winningMove
      } else {
        const randomIndex = Math.floor(Math.random() * options.length)
        botPick = options[randomIndex]
      }
    }

    // Determine outcome
    let result;
    if (playerPick === botPick) {
      result = 'draw';
    } else {
      const isWins = (playerPick === 'scissors' && botPick === 'paper') ||
        (playerPick === 'rock' && botPick === 'scissors') ||
        (playerPick === 'paper' && botPick === 'rock')
      result = isWins ? 'win' : 'lose';
    }

    // Wait for shaking animation to complete (1.2 seconds)
    setTimeout(() => {
      setBotOption(botPick)
      setIsShaking(false)
      setRoundResult(result)

      // --- WIN/LOSE CALCULATION ---
      if (result === 'draw') {
        setDraw(prev => prev + 1)
      } else if (result === 'win') {
        setPoints(prev => prev + 2)
        setWin(prev => prev + 1)
        setScoreEffect('+2')
        setStreak(prev => {
          const newStreak = prev + 1
          if (newStreak > maxStreak) {
            setMaxStreak(newStreak)
          }
          return newStreak
        })

        // Confetti effect
        import('canvas-confetti').then((module) => {
          const confetti = module.default;
          confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.6 },
            colors: ['#22d3ee', '#6366f1', '#a855f7', '#10b981', '#fbbf24']
          });
        });
      } else {
        setPoints(prev => (prev > 0 ? prev - 1 : 0))
        setLose(prev => prev + 1)
        setScoreEffect('-1')
        setStreak(0)
      }
    }, 1200)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-surface to-background text-white selection:bg-accent/30">
      {!difficulty ? (
        <DifficultySelection setDifficulty={setDifficulty} />
      ) : (
        <HomePage
          setUserOption={handlePlay}
          setBotOption={setBotOption}
          userOption={userOption}
          botOption={botOption}
          handleReset={handleReset}
          handleBackToMenu={handleBackToMenu}
          options={options}
          win={win}
          lose={lose}
          draw={draw}
          winRate={winRate}
          totalPertandingan={totalPertandingan}
          point={points}
          difficulty={difficulty}
          isShaking={isShaking}
          roundResult={roundResult}
          streak={streak}
          maxStreak={maxStreak}
          scoreEffect={scoreEffect}
          handleResetAll={handleResetAll}
        />
      )}
    </div>
  )
}

export default App