import React from 'react';

export const FestivalSwitcher = ({list, handleChange}) => {

  const festivalList = list.map(festival => {
    return <option value={festival}>{festival}</option>
  })

  return (
    <div className="FestivalSwitcher">
      <select onChange={(e) => handleChange(e.target.value, e)}>
        {festivalList}
      </select>
    </div>
  )
}
