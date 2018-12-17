const SCREEN_WIDTH = window.screen.availWidth
const SCREEN_HEIGHT = window.screen.availHeight
const CATCHER_HEIGHT = 600
const CATCHER_WIDTH = 800
const TICK_LENGTH = 70

const game = window.game = {
  attempt: 0,
  lastMouse: { x: SCREEN_WIDTH / 2, y: SCREEN_HEIGHT / 2 },
  mouse: {},
  catcher: null
}

document.body.addEventListener('click', function () {
  if (game.catcher) {
    game.catcher.focus()
  } else {
    game.catcher = openWindow('pop.html', 0, 0, SCREEN_WIDTH, SCREEN_HEIGHT)
  }
})

function tick () {
  if (!game.catcher) return
  if (!game.mouse) {
    // mouse has escaped
    if (game.attempt < 10) {
      game.attempt += 1
    } else if (game.attempt === 10 || game.attempt === 11) {
      game.catcher.resizeTo(CATCHER_WIDTH / 2, CATCHER_HEIGHT)
      game.catcher.moveTo(game.lastMouse.x - (CATCHER_WIDTH / 1.5), game.lastMouse.y - (CATCHER_HEIGHT / 2))
      game.attempt += 1
    } else if (game.attempt === 12 || game.attempt === 13) {
      game.catcher.resizeTo(CATCHER_WIDTH, CATCHER_HEIGHT)
      game.catcher.moveTo(game.lastMouse.x - (CATCHER_WIDTH / 2), game.lastMouse.y - (CATCHER_HEIGHT / 2))
      game.attempt += 1
    } else if (game.attempt === 14 || game.attempt === 15) {
      game.catcher.resizeTo(SCREEN_WIDTH / 2, SCREEN_HEIGHT)
      game.catcher.moveTo(0, 0)
      game.attempt += 1
    } else {
      game.catcher.resizeTo(SCREEN_WIDTH / 2, SCREEN_HEIGHT)
      game.catcher.moveTo(SCREEN_WIDTH / 2, 0)
      game.attempt = 0
    }
    return
  }

  const x = game.mouse.x - (CATCHER_WIDTH / 2)
  const y = game.mouse.y - (CATCHER_HEIGHT / 2)
  game.lastMouse = game.mouse
  game.mouse = null
  game.attempt = 0

  game.catcher.resizeTo(CATCHER_WIDTH, CATCHER_HEIGHT)
  game.catcher.moveTo(Math.floor(x), Math.floor(y))
}
tick()
window.setInterval(tick, TICK_LENGTH)

/**
 * Open a new popup window. Requires user-initiated event.
 */
function openWindow (
  url = window.location.pathname, x = 0, y = 0, width = 100, height = 100
) {
  const opts = `width=${width},height=${height},left=${x},top=${y}`
  const _win = window.open(url, '', opts)

  // New windows may be blocked by the popup blocker
  if (!_win) return
  return _win
}
