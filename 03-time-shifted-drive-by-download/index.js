window.addEventListener('blur', () => {
  setTimeout(() => triggerDownload('cat.jpg'), 8000)
})

/**
 * Trigger a file download immediately. One file download is allowed *without* user
 * interaction. Further file downloads should happen in response to a user-initiated
 * event or they will be blocked.
 */
function triggerDownload (fileName) {
  const a = document.createElement('a')
  a.href = fileName
  a.download = fileName
  a.click()
}
