'use strict'

let gElCanvas
let gElCtx

function onInit() {
  // console.log('hi')
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

function goBack() {
  // flashMsg('Are you sure?')

  // Remove Hide
  document.querySelector('.main-side-bar').classList.remove('hide')
  document.querySelector('.gallery-container').classList.remove('hide')

  // Add Hide
  document.querySelector('.canvas-container').classList.add('hide')
}


function openColorPicker() {
  const colorPicker = document.getElementById('colorPicker');
  colorPicker.click();
}

