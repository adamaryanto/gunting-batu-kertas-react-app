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

  const [isInitialized, setIsInitialized] = useState(false)
  const totalPertandingan = win + lose + draw
  const winRate = totalPertandingan > 0 ? Math.round((win / totalPertandingan) * 100) : 0

  function handleReset() {
    setUserOption(null)
    setBotOption(null)
  }

  function handleBackToMenu() {
    setDifficulty(null)
    handleReset()
    setPoints(0)
    setWin(0)
    setLose(0)
    setDraw(0)
  }

  // Load from Local Storage
  useEffect(() => {
    const savedWins = parseInt(localStorage.getItem('win')) || 0
    const savedLose = parseInt(localStorage.getItem('lose')) || 0
    const savedDraw = parseInt(localStorage.getItem('draw')) || 0
    const savedPoint = parseInt(localStorage.getItem('Point')) || 0
    setIsInitialized(true)
    setWin(savedWins)
    setPoints(savedPoint)
    setLose(savedLose)
    setDraw(savedDraw)
  }, [])

  // Save to Local Storage
  useEffect(() => {
    if (!isInitialized) return
    localStorage.setItem('win', win)
    localStorage.setItem('lose', lose)
    localStorage.setItem('draw', draw)
    localStorage.setItem('Point', points)
  }, [win, lose, draw, points])

  // --- GAME LOGIC (OTAK BOT) ---
  useEffect(() => {
    if (!userOption) return

    let botPick;
    
    // Pilihan yang bikin BOT MENANG (Counter)
    const winningMove = {
      scissors: 'rock',
      rock: 'paper',
      paper: 'scissors'
    }[userOption];

    // Pilihan yang bikin BOT KALAH (Player Menang)
    const losingMove = {
      scissors: 'paper',
      rock: 'scissors',
      paper: 'rock'
    }[userOption];

    // --- DIFFICULTY ALGORITHM ---
    if (difficulty === 'easy') {
      // MODE EZ: 80% Bot Sengaja Ngalah (Pilih losingMove)
      if (Math.random() < 0.8) {
        botPick = losingMove
      } else {
        // 20% Random biar gak ketebak banget
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

    setBotOption(botPick)

    // --- WIN/LOSE CALCULATION ---
    if (userOption === botPick) {
      setDraw(prev => prev + 1)
    } else {
      const isWins = (userOption === 'scissors' && botPick === 'paper') ||
        (userOption === 'rock' && botPick === 'scissors') ||
        (userOption === 'paper' && botPick === 'rock')

      if (isWins) {
        setPoints(prev => prev + 2)
        setWin(prev => prev + 1)
      } else {
        setPoints(prev => (prev > 0 ? prev - 1 : 0))
        setLose(prev => prev + 1)
      }
    }
  }, [userOption, difficulty]) // Dependencies

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-surface to-background text-white selection:bg-accent/30">
      {!difficulty ? (
        <DifficultySelection setDifficulty={setDifficulty} />
      ) : (
        <HomePage
          setUserOption={setUserOption}
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
        />
      )}
    </div>
  )
}

export default App