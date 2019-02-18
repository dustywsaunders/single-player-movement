
const initialState = {
  position: [600, 80],
  spriteLocation: '0px 0px',
  direction: 'East',
  walkIndex: 0
}

const enemyReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'MOVE_ENEMY':
      return {
        ...action.payload
      }

    default:
      return state
  }
}

export default enemyReducer