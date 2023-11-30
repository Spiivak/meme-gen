'use strict'

function renderGallery() {
  let images = getImagesToShow()
  const elGallery = document.querySelector('.gallery-container')
  var strHtml = ''

  images.forEach(img => {
    strHtml += `<img onclick="onSelectImg(this)" src='assets/${img.url}'>`
    // console.log('strHtml', strHtml)
  })
  elGallery.innerHTML = strHtml
}