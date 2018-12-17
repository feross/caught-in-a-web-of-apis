const html = document.querySelector('html')

html.addEventListener('mousemove', e => {
  window.opener.game.mouse = { x: e.screenX, y: e.screenY }
})

interceptUserInput(event => {
  // Capture key presses on the Command or Control keys, to interfere with the
  // "Close Window" shortcut.
  if (event.key === 'Meta' || event.key === 'Control') {
    window.print()
  }
})

/**
 * Intercept all user-initiated events and call the given the function, `onInput`.
 */
function interceptUserInput (onInput) {
  document.body.addEventListener('touchstart', onInput, { passive: false })

  document.body.addEventListener('mousedown', onInput)
  document.body.addEventListener('mouseup', onInput)
  document.body.addEventListener('click', onInput)

  document.body.addEventListener('keydown', onInput)
  document.body.addEventListener('keyup', onInput)
  document.body.addEventListener('keypress', onInput)
}
