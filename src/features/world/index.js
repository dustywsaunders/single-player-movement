import React from 'react'
import Player from '../player' 
import Enemy from '../enemy' 
import Map from '../map'
import { tiles } from '../../data/maps/1'
import store from '../../config/store'


function World(props) {
  store.dispatch({
    type: 'ADD_TILES',
    payload: {
      tiles
    }
  })
  return (
    <div
      style={{
        position: 'relative',
        width: '800px',
        height: '480px',
        margin: '20px auto',
      }}
    >
      <Map />
      <Player />
      <Enemy />
    </div>
  )
}

export default World