import Slider from 'rc-slider'
import React from 'react'

import { Foot, SliderContainer } from './Footer.styles'

const Footer: React.FC = () => {
  return (
    <Foot>
      <span>54 recipes</span>
      <SliderContainer>
        <Slider
          step={1}
          defaultValue={200}
          min={100}
          max={500}
          onChange={value => {
            // setCardWidth(value)
            console.info(value)
          }}
        />
      </SliderContainer>
    </Foot>
  )
}

export default Footer
