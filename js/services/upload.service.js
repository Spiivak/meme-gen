function uploadMeme() {
  const imgDataUrl = gElCanvas.toDataURL("image/jpeg");
  doUploadImg(imgDataUrl, onSuccess);

  // A function to be called if request succeeds
  function onSuccess(uploadedImgUrl) {
      const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
      // document.querySelector('.user-msg').innerText = `Your photo is available here: ${uploadedImgUrl}`
      // document.querySelector('.share-container').innerHTML = `
      // <a class="btn" href="https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
      //    Share   
      // </a>`
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}`)
      // return false;
  }
}

function doUploadImg(imgDataUrl, onSuccess) {
  const formData = new FormData();
  formData.append('img', imgDataUrl)

  fetch('//ca-upload.com/here/upload.php', {
      method: 'POST',
      body: formData
  })
      .then(res => res.text())
      .then((url) => {
          // console.log('Got back live url:', url);
          onSuccess(url)
      })
      .catch((err) => {
          console.error(err)
      })
}