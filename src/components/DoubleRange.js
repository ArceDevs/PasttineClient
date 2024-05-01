import React from 'react';

function DoubleRange({ minValue, maxValue, setMinValue, setMaxValue, debounce }) {
  const min = 0
  const max = 100

  const handleRangeMin = (event) => {
    setMinValue(event.target.value)
    debounce()
  }
  const handleRangeMax = (event) => {
    setMaxValue(event.target.value)
    debounce()
  }
  return (
    <>
    <label>Precio mínimo</label>
    <div className="range-slider">
      <input
        type="range"
        min={min}
        max={maxValue}
        value={minValue}
        onChange={handleRangeMin}
        className="range-slider__range"
      />
      <div className="range-slider__value">{minValue} €</div>
    </div>
    <label>Precio máximo</label>
    <div className="range-slider">
      <input
        type="range"
        min={minValue}
        max={max}
        value={maxValue}
        onChange={handleRangeMax}
        className="range-slider__range"
      />
      <div className="range-slider__value">{maxValue} €</div>
    </div>
    </>
  );
}

export default DoubleRange;
