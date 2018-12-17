document.body.addEventListener('keydown', onInput)

function onInput (e) {
  e.preventDefault()
  console.log(e.key)
  window.opener.postMessage({ key: e.key })
}
