import {React, useState, useEffect, useRef} from 'react'

export default function MultiSelect({ options, selectedOptions, setSelectedOptions, debounce }) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null);
  const toggleDropdown = () => setIsOpen(!isOpen)

  if (options === null) {
    options = [{
      Id: 1,
      Nombre: "None"
    }]
  }

  const handleOptionClick = (option) => {
    setSelectedOptions((prevSelectedOptions) => {
      const exists = prevSelectedOptions.some(selectedOption => selectedOption.Id === option.Id);
      if (exists) {
        return prevSelectedOptions.filter((selectedOption) => selectedOption.Id !== option.Id);
      } else {
        return [...prevSelectedOptions, option];
      }
    })
    debounce()
  }
  
  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  }

  useEffect(() => {
    window.addEventListener('click', handleOutsideClick);
    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const selectedOptionsText = selectedOptions.map(option => (
    <button key={`option-${option.Id}`} className='option' 
    onClick={(event) => {
      event.stopPropagation()
      event.preventDefault()
      handleOptionClick(option)
    }}>{option.Nombre}<div className='close-option'></div></button>   
  ))

  return (
    <div ref={dropdownRef} id="multi-select-dropdown" className="dropdown">
      <div className="dropdown-header" onClick={toggleDropdown}>
        <span className="dropdown-header-text">
          {selectedOptions.length > 0 ? selectedOptionsText : '¿Tienes alguna alergia?'}
        </span>
      </div>
      {isOpen && (
        <ul id="dropdown-list" className="dropdown-options" onBlur={handleOutsideClick}>
          {options.map((option) => (
            <li key={option.Id}>
              <label className='check-box-container'>
                {option.Nombre}
                <input type='checkbox' 
                  onChange={(event) => handleOptionClick(option)}
                  checked={selectedOptions.some(selectedOption => selectedOption.Id === option.Id)}/>
                <span className="checkmark"></span>
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}