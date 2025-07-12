import React from 'react'
import ButtonOption from './Components/ButtonOption'
import ButtonReset from './Components/ButtonReset'


function HomePage(props) {
  return (
    <div className='wrapperHomePage'>
      <h1 className='gameTitle'>Gunting Batu Kertas</h1>

      <div className='wrapperOptionButton'>
        <h2 className='selectTitle'>Select Your Weapon</h2>

        {props.userOption === '' ? (
          <div className="optionButtonGroup">
            <ButtonOption 
              setBotOption={props.setBotOption} 
              setUserOption={props.setUserOption} 
              options={props.options}
              className="option-button"
            />
          </div>
        ) : (
          <div className='wrapperChoice'>
            <h1 className="userChoice">{props.userOption}</h1>
            <h1 className="versus">vs</h1>
            <h1 className="botChoice">{props.botOption}</h1>
          </div>
        )}
      </div>

      <div className='wrapperStatistic'>
        <h3 className="statItem">WinRate: {props.totalPertandingan > 0 ? props.winRate : 0}%</h3>
        <h3 className="statItem">Jumlah Pertandingan: {props.totalPertandingan}</h3>
        <h3 className="statItem">Point: {props.point}</h3>
      </div>

      {props.userOption !== '' && (
        <div className='wrapperBtnReset'>
          <ButtonReset handleReset={props.handleReset} className="reset-button"/>
        </div>
      )}
    </div>
  )
}

export default HomePage
