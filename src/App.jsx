import React, { useEffect, useState } from 'react'
import HomePage from './HomePage'
import ButtonReset from './Components/ButtonReset'

function App() {
  const [userOption,setUserOption]= useState('')
  const [botOption,setBotOption]= useState('')
  const [points,setPoints]= useState(0)
  const [win, setWin] = useState(0)
  const [lose, setLose] = useState(0)
  const [draw, setDraw] = useState(0)
  const options = ['✌️','✊','🖐️']
  const [isInitialized,setIsInitialized] = useState(false)
  const totalPertandingan = win+lose+draw
  const winRate = totalPertandingan>0? (win/totalPertandingan)*100:0
  function handleReset(){
    window.location.reload()
  }
  
  // Load TO Local Storage
  useEffect(()=>{
    const savedWins = parseInt(localStorage.getItem('win'))||0
    const savedLose = parseInt(localStorage.getItem('lose'))||0
    const savedDraw = parseInt(localStorage.getItem('draw'))||0
    const savedPoint = parseInt(localStorage.getItem('Point'))||0
    setIsInitialized(true)
    setWin(savedWins)
    setPoints(savedPoint)
    setLose(savedLose)
    setDraw(savedDraw)
    
  },[])


  //  Save to local storage
  useEffect(()=>{
    if(!isInitialized) return
    localStorage.setItem('win', win)
    localStorage.setItem('lose', lose)
    localStorage.setItem('draw', draw)
    localStorage.setItem('Point', points)
  },[win,lose,draw,points])
  useEffect(()=>{
    if(!userOption) return
    const randomIndex = ~~(Math.random()* options.length)
    const botPick = options[randomIndex]
    setBotOption(botPick)
    if(userOption===botPick){
      setDraw(prev=>prev +1)
    }else{
      const isWins = (userOption===options[0]&&botPick===options[2])||
      (userOption===options[1]&& botPick === options[0])||
      (userOption === options[2] && botPick === options[1])
      if(isWins){
        setPoints(prev=>prev+2)
        setWin(prev=> prev+1)
      }else{
        setPoints(prev=>(prev>0? prev-1:0))
        setLose(prev=> prev+1)
      }
    }
  },[userOption])
  console.log('Point ' + points)
  console.log('Win  '+win)
  console.log('Lose '+lose)
  console.log('Draw '+draw)
  

  return (
    <div>
      <HomePage 
      setUserOption={setUserOption} 
      setBotOption={setBotOption} 
      userOption={userOption} 
      botOption={botOption}
      handleReset={handleReset}
      options={options}
      win={win}
      lose={lose}
      draw={draw}
      winRate={winRate}
      totalPertandingan={totalPertandingan}
      point={points}
      />
    </div>
  )
}

export default App