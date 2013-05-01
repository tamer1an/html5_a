/* Author: 
    Trybynenko Andrii
*/

// EXAMPLE 1 DIAG
 ctxCSS = document.getCSSCanvasContext('2d', 'diag', 200, 200);
    canvasCSS = ctxCSS.canvas;
   
    // console.log(ctxCSS,canvasCSS);
        
    ctxCSS.clearRect(0, 0, 200, 200);
    
	var center = [200 / 2, 200 / 2];
	var PADDING = 0; // px
	var R = Math.min(200, 200) / 2 - PADDING;

	var data = [75, 68, 32, 95];
	var colors = ["red", "black", "blue", "#ffcc00"];

	var lastPosition = 0;
	var total = data.reduce(function(previousValue, currentValue, index, array) {
	  return previousValue + currentValue
	});

	for (var i = 0; i < data.length; ++i) {
	  ctxCSS.fillStyle = colors[i];
	  ctxCSS.beginPath();
	  ctxCSS.moveTo(center[0], center[1]);
	  ctxCSS.arc(center[0], center[1], R, lastPosition,
	          lastPosition + (Math.PI * 2 * (data[i] / total)), false);
	  ctxCSS.lineTo(center[0], center[1]);
	  ctxCSS.fill();
	  lastPosition += Math.PI * 2 * (data[i] / total);
	}


// EXAMPLE 2 SNOW
var canvas = null;
var context = null;
var bufferCanvas = null;
var bufferCanvasCtx = null;
var flakeArray = [];
var flakeTimer = null;
var maxFlakes = 200;
var ctxCSS = null; 
var canvasCSS = null; 

function Flake() {
	this.x = Math.round(Math.random() * context.canvas.width);
	this.y = -10;
	this.drift = Math.random();
	this.speed = Math.round(Math.random() * 5) + 1;
	this.width = (Math.random() * 3) + 2;
	this.height = this.width;
}

function init() {        
    //////////////////// connecting to cssCanvas
    ctxS = document.getCSSCanvasContext('2d', 'demo', 200, 200);
    canvasS = ctxS.canvas;
    
    canvas = canvasS;
	context = ctxS;
    
    // console.log('4',ctxS,canvasS,context);
    
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
   // ctx = document.getCSSCanvasContext('2d', 'animation', 300, 300);
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
///////////// Begin new one 
(function(){    
    // clear canvas
    ctxCSS = document.getCSSCanvasContext('2d', 'ide', 500, 500);
    buffer2Canvas = ctxCSS.canvas;
    
    // console.log(buffer2Canvas,canvas2CSS);
    
    function drawShape(ctx, xoff, yoff) {
      ctx.beginPath();
      ctx.moveTo(114 + xoff, 93 + yoff);
      ctx.bezierCurveTo(118 + xoff, 60 + yoff, 132 + xoff, 54 + yoff, 164 + xoff, 49 + yoff);
      ctx.bezierCurveTo(217 + xoff, 40 + yoff, 218 + xoff, 85 + yoff, 230 + xoff, 80 + yoff);
      ctx.bezierCurveTo(240 + xoff, 76 + yoff, 266 + xoff, 47 + yoff, 306 + xoff, 49 + yoff);
      ctx.bezierCurveTo(321 + xoff, 50 + yoff, 378 + xoff, 88 + yoff, 341 + xoff, 132 + yoff);
      ctx.bezierCurveTo(315 + xoff, 163 + yoff, 203 + xoff, 282 + yoff, 194 + xoff, 294 + yoff);
      ctx.bezierCurveTo(185 + xoff, 306 + yoff, 121 + xoff, 115 + yoff, 112 + xoff, 90 + yoff);
        
      // ctx.transform(10,20,30,40,50,60,70)
      ctx.stroke();
    }
    
    drawShape(ctxCSS,0,0)
    
})();

