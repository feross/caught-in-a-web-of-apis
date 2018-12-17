const html = document.querySelector('html')

html.addEventListener('mousemove', e => {
  window.opener.game.mouse = { x: e.screenX, y: e.screenY }
})
