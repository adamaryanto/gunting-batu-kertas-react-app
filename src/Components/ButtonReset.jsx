import React from 'react'

function ButtonReset(props) {
  return (
    <div>
        <button onClick={props.handleReset}>Reset</button>
    </div>
  )
}

export default ButtonReset