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
  window.opener.postMessage('success')
  window.close()
}

initCamera()
