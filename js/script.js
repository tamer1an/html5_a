/* Author: 

*/


var canvas = null;
var context = null;
var bufferCanvas = null;
var bufferCanvasCtx = null;
var flakeArray = [];
var flakeTimer = null;
var maxFlakes = 200;

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

	initialize the rects
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