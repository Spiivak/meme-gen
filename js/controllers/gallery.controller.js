'use strict'

function renderGallery() {
  let images = getImagesToShow()
  const elGallery = document.querySelector('.gallery-container')
  var strHtml = ''

  images.forEach(img => {
    strHtml += `<img onclick="onSelectImg(this)" src='${img.url}'>`
    // console.log('strHtml', strHtml)
  })
  elGallery.innerHTML = strHtml
}


function onSelectImg(elImg) {
  gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height)
}