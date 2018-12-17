triggerFileDownload('cat.jpg')

const url = new URL(window.location)

const currentNum = Number(url.searchParams.get('a')) || 0
url.searchParams.set('a', currentNum + 1)

setTimeout(() => {
  window.location = url
}, 100)

/**
 * Trigger a file download immediately. One file download is allowed *without* user
 * interaction. Further file downloads should happen in response to a user-initiated
 * event or they will be blocked.
 */
function triggerFileDownload (fileName) {
  const a = document.createElement('a')
  a.href = fileName
  a.download = fileName
  document.body.appendChild(a)
  a.click()
}
