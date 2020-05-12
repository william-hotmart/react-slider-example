import React from 'react'
import Slider from './Slider'

const App = () => {
  const handleSlideVisible = () => {
    console.log('slide visible')
  }

  return (
    <Slider onSlideVisible={handleSlideVisible}>
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
    </Slider>
  )
}

export default App
