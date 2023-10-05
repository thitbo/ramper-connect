import React from 'react'
import Select from 'react-select'
import { REACT_SELECT_THEME } from '../../controller/commons/constant'



export default function DropdownSelectChain(props) {
  const { options, selectedOption, setSelectedOption, styles, className } = props

  const colorStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: '#2f2f2f',
      boxShadow: 'unset',
      borderColor: 'transparent',
      borderRadius: '8px',
      fontSize: '14px',
      color: '#fffff',
      ':hover': {
        borderColor: '#ffd86f',
      },
    }),
    singleValue: provided => ({
      ...provided,
      color: 'white'
    }),
    multiValue: (styles) => ({
      ...styles,
      backgroundColor: '#2f2f2f',
    }),
    multiValueLabel: (styles) => ({
      ...styles,
      color: '#fffff',
    }),
    menu: (styles) => ({
      ...styles,
      backgroundColor: '#3b3b3b',
    }),
    option: (styles) => ({
      ...styles,
      backgroundColor: 'transparent',
      fontSize: '12px',
      ':hover': {
        backgroundColor: '#5E5E5E',
      },
    }),
    multiValueRemove: (styles) => ({
      ...styles,
      color: '#f4f4f4',
      cursor: 'pointer',
      ':hover': {
        color: '#c59d38',
        backgroundColor: 'transparent',
        borderRadius: '50%',
      },
    }),
  };

  return (
    <div className={`w-[400px] ${className} `}>
      <Select
        styles={styles || colorStyles}
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
      />
    </div>
  )
}
