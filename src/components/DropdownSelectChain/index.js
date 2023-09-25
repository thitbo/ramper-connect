import React from 'react'
import Select from 'react-select'

export default function DropdownSelectChain(props) {
  const { options, selectedOption, setSelectedOption } = props

  return (
    <div className="w-[400px]">
      <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
      />
    </div>
  )
}
