'use strict'

function initGallery() {
  // createKeywordsList()
  // renderKeywords()
  renderGallery()
}

function renderGallery() {
  const imgs = getImagesToShow()
  let imgsHTMLs = imgs.map(img => {
    return `<img class="gallery-img" src="assets/img/${img.id}.jpg" onclick="onSelectImg(${img.id})">`
  })
  if (!imgs.length) imgsHTMLs = ['<p>No results found...</p>'];
  imgsHTMLs.unshift('<div class="file-input gallery-img" name="image" onchange="onImgInput(event)"><span>+ Load photo</span><input type="file"/></div>')
  document.querySelector('.gallery-container').innerHTML = imgsHTMLs.join('');
  // if (!keyword) document.querySelector('.search-line input').value = '';
}

function onSelectImg(imgId) {
  document.querySelector('.gallery-container').classList.add('hide')
  document.querySelector('.canvas-container').classList.remove('hide')
  // openEditor()
  initMeme(imgId)
}

function onImgInput(ev) {
  loadImageFromInput(ev, DrawUploadedImg)
}

function DrawUploadedImg(img) {
  document.querySelector('.test-img').src = img.src;
  onSelectImg(0)
}

function loadImageFromInput(ev, onImageReady) {
  var reader = new FileReader()

  reader.onload = (event) => {
     console.log('onload');
     var img = new Image()
     // Render on canvas
     img.onload = onImageReady.bind(null, img)
     img.src = event.target.result
  }
  console.log('after');
  reader.readAsDataURL(ev.target.files[0])
}
// function openEditor() {
//   navigateTo('editor')
//   // document.body.classList.add('background')
// }