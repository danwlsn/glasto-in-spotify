import React from 'react';

const Band = ({name}) => {
  return (
    <div className="Band">
      { name }
    </div>
  )
}

export const BandList = ({bandList, title}) => {

  let bandItems = null

  if (bandList){
    bandItems = bandList.map(band => {
      return <li><Band name={band} /></li>
    })
  }

  return (
    <div className="BandList">
      <h2>{title}</h2>
      <ul>
        {bandItems}
      </ul>
    </div>
  )
}
