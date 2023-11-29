'use strict'

let gElCanvas
let gElCtx

function onInit() {
  console.log('hi')
  renderCanvas()
  renderGallery()

  gElCanvas = document.querySelector('canvas')
  gElCtx = gElCanvas.getContext('2d')

}
