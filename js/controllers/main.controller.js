'use strict'

let gElCanvas
let gElCtx

function onInit() {
  console.log('hi')
  renderCanvas()
  renderGallery()

  gElCanvas = document.querySelector('canvas')
  gElCtx = gElCanvas.getContext('2d')
  console.log('gElCtx', gElCtx)

}

function downloadImg(elLink) {
  const imgContent = gElCanvas.toDataURL('image/jpeg') // image/jpeg the default format
  elLink.href = imgContent
}

