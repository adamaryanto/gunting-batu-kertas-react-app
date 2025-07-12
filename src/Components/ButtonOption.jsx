import React from 'react'

function ButtonOption(props) {
  return (
    <div className='optionButtonGroup'>
      <button className='option-button btnGunting' onClick={() => props.setUserOption(props.options[0])}>
        ✌<br />Gunting
      </button>
      <button className='option-button btnBatu' onClick={() => props.setUserOption(props.options[1])}>
        ✊<br />Batu
      </button>
      <button className='option-button btnKertas' onClick={() => props.setUserOption(props.options[2])}>
        ✋<br />Kertas
      </button>
    </div>
  )
}

export default ButtonOption
