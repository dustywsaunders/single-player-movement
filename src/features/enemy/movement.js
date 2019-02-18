import store from '../../config/store'
import { SPRITE_SIZE, MAP_WIDTH, MAP_HEIGHT} from '../../config/constants'

export default function handleMovement(enemy) {
  
  function getNewPosition(oldPos, direction) {

    switch(direction) {
      case 'West':
        return [
          oldPos[0]-SPRITE_SIZE, oldPos[1]
        ]  
      case 'East':
        return [
          oldPos[0]+SPRITE_SIZE, oldPos[1]
        ] 
      case 'North':
        return [
          oldPos[0], oldPos[1]-SPRITE_SIZE
        ] 
      case 'South':
        return [
          oldPos[0], oldPos[1]+SPRITE_SIZE
        ] 
      default:
        return oldPos
    }
  }

  function getSpriteLocation(direction, walkIndex) {
    switch(direction) {
      case 'North':
        return `${SPRITE_SIZE * walkIndex}px ${SPRITE_SIZE * 0}px`
      case 'East':
        return `${SPRITE_SIZE * walkIndex}px ${SPRITE_SIZE * 1}px`
      case 'South':
        return `${SPRITE_SIZE * walkIndex}px ${SPRITE_SIZE * 2}px`
      case 'West':
        return `${SPRITE_SIZE * walkIndex}px ${SPRITE_SIZE * 3}px`
      default:
        return `0px 0px`
    }
  }

  function getWalkIndex() {
    const walkIndex = store.getState().enemy.walkIndex
      return walkIndex >= 7 ? 0 : walkIndex + 1
  }

  function observeBoundaries(oldPos, newPos) {
    return  (newPos[0] >= 0 && newPos[0] <= MAP_WIDTH - SPRITE_SIZE) &&
            (newPos[1] >= 0 && newPos[1] <= MAP_HEIGHT - SPRITE_SIZE)
            // returns true or false
  }

  function observeImpassable(oldPos, newPos) {
    const tiles = store.getState().map.tiles
    const y = newPos[1] / SPRITE_SIZE
    const x = newPos[0] / SPRITE_SIZE
    const nextTile = tiles[y][x]
    return nextTile < 5
  }

  function dispatchMove(direction, newPos) {
    const walkIndex = getWalkIndex()
    store.dispatch({
      type: 'MOVE_ENEMY',
      payload: {
        position: newPos,
        direction,
        walkIndex,
        spriteLocation: getSpriteLocation(direction, walkIndex),
      }
    })
  }

  function attemptMove(direction) {
    const oldPos = store.getState().enemy.position
    const newPos = getNewPosition(oldPos, direction)

    if (
      observeBoundaries(oldPos, newPos) && 
      observeImpassable(oldPos, newPos)
      )
      dispatchMove(direction, newPos)

  }

  function handleKeyDown(e) {
    e.preventDefault()

    switch(e.keyCode) {
      case 65: // 'A' key
        return attemptMove('West')
      
      case 87: // 'W' key
        return attemptMove('North')

      case 68: // 'D' key
        return attemptMove('East')

      case 83: // 'S' key
        return attemptMove('South')

      default:
        console.log(e.keyCode)
    }
  }

  window.addEventListener('keydown', (e) => {
    handleKeyDown(e)
  })
  
  return enemy
}