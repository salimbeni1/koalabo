const body = document.body;

// -- Canvas Creation
const canvas = document.createElement("canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;


const offscreenCanvas = canvas.transferControlToOffscreen();

const worker = new Worker('canvasworker.js');
worker.postMessage({msg: 'init', canvas: offscreenCanvas}, [offscreenCanvas]);


body.append(canvas);



