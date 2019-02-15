import React from 'react'
import Player from '../player' 
import Map from '../map'

function World(props) {
  return (
    <div
      style={{
        position: 'relative',
        width: '600px',
        height: '300px',
        margin: '20px auto',
      }}
    >
      <Map />
      <Player />
    </div>
  )
}

export default World