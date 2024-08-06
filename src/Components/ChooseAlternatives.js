import React from 'react'
import CardCousol from './CardCousol'

const ChooseAlternatives = () => {
  return (
    <div className='choose-alternatives-container'>
      <h2 style={{marginLeft:'20px'}}>Choose Alternatives</h2>
      <CardCousol filter={true} />
    </div>
  )
}

export default ChooseAlternatives
