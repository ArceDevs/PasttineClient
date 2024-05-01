import React, { useState, useEffect, useRef } from 'react';
import '../styles/components/select.css';

function Select({ options }) {
  const selectRef = useRef(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectClick = () => {
    setIsOpen(!isOpen);
  }

  const handleOptionClick = (optionValue) => {
    setSelectedOption(optionValue);
    setIsOpen(false);
  }

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  }

  return (
    <div className="select">
      <select className="select-hidden" ref={selectRef} value={selectedOption} onChange={handleChange}>
        {options.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
      <div className={`select-styled ${isOpen ? 'active' : ''}`} onClick={handleSelectClick}>
        {selectedOption || options[0]?.label}
      </div>
      <ul className={`select-options ${isOpen ? 'active' : ''}`}>
        {options.map(option => (
          <li key={option.value} onClick={() => handleOptionClick(option.value)}>
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Select;
