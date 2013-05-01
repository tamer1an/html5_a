/* Author: 

*/


var canvas = null;
var context = null;
var bufferCanvas = null;
var bufferCanvasCtx = null;
var flakeArray = [];
var flakeTimer = null;
var maxFlakes = 200;
var ctx = null;;

function Flake() {
	this.x = Math.round(Math.random() * context.canvas.width);
	this.y = -10;
	this.drift = Math.random();
	this.speed = Math.round(Math.random() * 5) + 1;
	this.width = (Math.random() * 3) + 2;
	this.height = this.width;
}

function init() {
	canvas = document.getElementById('testCanvas');
	context = canvas.getContext("2d");
    
	bufferCanvas = document.createElement("canvas");
	bufferCanvasCtx = bufferCanvas.getContext("2d");
	bufferCanvasCtx.canvas.width = context.canvas.width;
	bufferCanvasCtx.canvas.height = context.canvas.height;

//	initialize the rects
	flakeTimer = setInterval(addFlake, 200);

	Draw();
	
	setInterval(animate, 30);
}

function addFlake() {
	flakeArray[flakeArray.length] = new Flake();
	if (flakeArray.length == maxFlakes)
		clearInterval(flakeTimer);
}

function blank() {
	bufferCanvasCtx.fillStyle = "#330033";
	bufferCanvasCtx.fillRect(0,0,bufferCanvasCtx.canvas.width, bufferCanvasCtx.canvas.height);
}

function animate() {
	Update();
	Draw();
    
    ctx = document.getCSSCanvasContext('2d', 'animation', 300, 300);
}

function Update() {
	for (var i = 0; i < flakeArray.length; i++) {
		if (flakeArray[i].y < context.canvas.height) {
			flakeArray[i].y += flakeArray[i].speed;
			if (flakeArray[i].y > context.canvas.height)
				flakeArray[i].y = -5;
			flakeArray[i].x += flakeArray[i].drift;
			if (flakeArray[i].x > context.canvas.width)
				flakeArray[i].x = 0;
		}
	}
}

function Draw(){
	context.save();
/*
	// create a clipping region
	bufferCanvasCtx.beginPath();
	bufferCanvasCtx.fillStyle="black";
	bufferCanvasCtx.fillRect(0,0,bufferCanvas.width,bufferCanvas.height);
	bufferCanvasCtx.arc(bufferCanvas.width/2,bufferCanvas.height/2,bufferCanvas.height/3,0,2*Math.PI);
	bufferCanvasCtx.clip();
*/
	blank();

	for (var i = 0; i < flakeArray.length; i++) {
		bufferCanvasCtx.fillStyle = "white";
		bufferCanvasCtx.fillRect(flakeArray[i].x,flakeArray[i].y,flakeArray[i].width,flakeArray[i].height);
	}
	
	// copy the entire rendered image from the buffer canvas to the visible one
	context.drawImage(bufferCanvas, 0,0,bufferCanvas.width, bufferCanvas.height);
	context.restore();
}



// var gl = document.getCSSCanvasContext('experimental-webgl', 'animation', 300, 150);


(function(){
    
    
window.requestAnimationFrame = window.requestAnimationFrame ||
                               window.webkitRequestAnimationFrame;
var supported = true;

if (!!!document.getCSSCanvasContext) {
  document.querySelector('#notsupport').style.display = 'block';
  supported = false;
}

function correctPixelRatio(ctx, container) {
    var canvas = ctx.canvas;
	var ratio =  window.devicePixelRatio / ctx.webkitBackingStorePixelRatio;

	var oldWidth = canvas.width;
	var oldHeight = canvas.height;

	canvas.width = oldWidth * ratio;
	canvas.height = oldHeight * ratio;

	canvas.style.width = oldWidth + 'px';
	canvas.style.height = oldHeight + 'px';

  //ctx.scale(ratio, ratio);

	return ratio;
}

var computedStyle = window.getComputedStyle(document.querySelector('#container'));
var WIDTH = parseInt(computedStyle.width);
var HEIGHT = parseInt(computedStyle.height);

if (supported) {
  var ctx = document.getCSSCanvasContext('2d', 'animation', WIDTH, HEIGHT);
  var canvas = ctx.canvas;
} else {
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
}
var ratio = correctPixelRatio(ctx);

WIDTH = ctx.canvas.width;
HEIGHT = ctx.canvas.height;

//var rotation = 1;
function draw(time) {
	ctx.clearRect(0, 0, WIDTH, HEIGHT);
	
	var center = [WIDTH / 2, HEIGHT / 2];
	var PADDING = 0; // px
	var R = Math.min(WIDTH, HEIGHT) / 2 - PADDING;

	var data = [75, 68, 32, 95];
	var colors = ["red", "black", "blue", "#ffcc00"];

	var lastPosition = 0;
	var total = data.reduce(function(previousValue, currentValue, index, array) {
	  return previousValue + currentValue
	});

	for (var i = 0; i < data.length; ++i) {
	  ctx.fillStyle = colors[i];
	  ctx.beginPath();
	  ctx.moveTo(center[0], center[1]);
	  ctx.arc(center[0], center[1], R, lastPosition,
	          lastPosition + (Math.PI * 2 * (data[i] / total)), false);
	  ctx.lineTo(center[0], center[1]);
	  ctx.fill();
	  lastPosition += Math.PI * 2 * (data[i] / total);
	}
	
	ctx.translate(center[0], center[1]);
  //ctx.rotate(rotation / time);
  ctx.rotate(0.05);
  ctx.translate(-center[0], -center[1]);
  //rotation++;

  window.requestAnimationFrame(draw);
}

window.requestAnimationFrame(draw);

var container = document.querySelector('#canvas-container');
container.insertBefore(canvas, container.firstElementChild);
    
})();