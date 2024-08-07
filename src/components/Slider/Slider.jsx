import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Slider.css'

// Slider Component
const Slider = ({ min, max, step, value, setValue }) => {
  const [sliderValue, setSliderValue] = useState(1);

  const handleChange = (event) => {
    const newValue = Number(event.target.value);
    setSliderValue(newValue);
    setValue(newValue);
  };

  return (
    <div className="slider-container">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={sliderValue}
        onChange={handleChange}
        className="slider"
      />
      <span className="slider-value">{sliderValue}</span>
    </div>
  );
};

// PropTypes for validation
Slider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number,
  value: PropTypes.number,
  setValue: PropTypes.func,
};

export default Slider;
