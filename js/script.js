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




(function(){ // css background driven by canvas
    ctxCSS = document.getCSSCanvasContext('2d', 'heart', 300, 300);
//    buffer2Canvas = ctxCSS.canvas;

    function drawShape(ctx, xoff, yoff, options) {
//        try {
            var linGrd = ctx.createLinearGradient(230,230,20,280);

            // add some color stops: red to blue, blue to green
            linGrd.addColorStop(0, "rgba(255,100,100,0.07)"); // start with red at 0
            linGrd.addColorStop(0.5, "rgba(255,100,100,0.2)"); // put blue at the halfway point
            linGrd.addColorStop(1,"rgba(255,100,100,0.04)"); // finish with green
//        } catch (e) {
//             console.log(e);
//        }
        ctx.shadowColor = "rgba(255,100,100,1)";
        ctx.shadowOffsetX = 4;
        ctx.shadowOffsetY = 3;
        ctx.shadowBlur = 5;

        ctx.beginPath();
        ctx.moveTo(231 + xoff, 263 + yoff);
        ctx.bezierCurveTo(239 + xoff, 232 + yoff, 208 + xoff, 213 + yoff, 226 + xoff, 183 + yoff);
        ctx.bezierCurveTo(252 + xoff, 140 + yoff, 310 + xoff, 192 + yoff, 269 + xoff, 189 + yoff);
        ctx.bezierCurveTo(254 + xoff, 188 + yoff, 323 + xoff, 172 + yoff, 308 + xoff, 214 + yoff);
        ctx.bezierCurveTo(297 + xoff, 244 + yoff, 268 + xoff, 247 + yoff, 231 + xoff, 263 + yoff);

//        console.log(options.mathR);
//        ctx.lineWidth = 3;
        ctx.strokeStyle = "rgba(255, 100, 100, 0.18)";
        ctx.fillStyle = linGrd;

        ctx.fill();
        ctx.stroke();
    }

//    console.log (typeof ctxCSS.createLinearGradient)
    drawShape(ctxCSS,-25,-70);
//    requestAnimationFrame(drawShape)
})();

// var gl = document.getCSSCanvasContext('experimental-webgl', 'animation', 300, 150);
///////////// Begin new one 
// (function(){    
//     // clear canvas
//     ctxCSS = document.getCSSCanvasContext('2d', 'ide', 300, 300);
//     buffer2Canvas = ctxCSS.canvas;
        
//     function drawShape(ctx, xoff, yoff) {
        
//         ctx.shadowColor = "rgba(255,100,100,0.8)";
//         ctx.shadowOffsetX = 4;
//         ctx.shadowOffsetY = 3;
//         ctx.shadowBlur = 5;

//       ctx.beginPath();
//       ctx.moveTo(231 + xoff, 263 + yoff);
//       ctx.bezierCurveTo(239 + xoff, 232 + yoff, 208 + xoff, 213 + yoff, 226 + xoff, 183 + yoff);
//       ctx.bezierCurveTo(252 + xoff, 140 + yoff, 310 + xoff, 192 + yoff, 269 + xoff, 189 + yoff);
//       ctx.bezierCurveTo(254 + xoff, 188 + yoff, 323 + xoff, 172 + yoff, 308 + xoff, 214 + yoff);
//       ctx.bezierCurveTo(297 + xoff, 244 + yoff, 268 + xoff, 247 + yoff, 231 + xoff, 263 + yoff);
      
//          console.log(ctx);
         
         
//       ctx.strokeStyle = "rgba(255, 100, 100, 0.314)";   
//       ctx.stroke();
//     }
//     drawShape(ctxCSS,-50,-50);
    
// })();

        // ctx.fillStyle = "green";

    // text pattern
        // ctx.font = "25pt Georgia";
        // ctx.fillText("^-^", 250,75);
        
        /* 
        
        / create a linear gradient
        var linGrd = ctx.createLinearGradient(230,230,20,280);
        // add some color stops: red to blue, blue to green
        linGrd.addColorStop(0, "#f00"); // start with red at 0
        linGrd.addColorStop(0.5, "#00f"); // put blue at the halfway point
        linGrd.addColorStop(1,"#0f0"); // finish with green
        
        */
               
        ///////////////
        // create a radial gradient
        // var radGrd = ctx.createRadialGradient(525,150,20,525,150,100);
        // radGrd.addColorStop(0, "#f00"); // start with red at 0
        // radGrd.addColorStop(0.5, "#00f"); // put blue at the halfway point
        // radGrd.addColorStop(1,"#0f0"); // finish with green
        // ctx.fillStyle = radGrd;
        
        // ctx.beginPath();
        // ctx.arc(525,150,100,0,2*Math.PI);
        // ctx.stroke();
        
          // create and fill it with the gradient
      // ctx.fillStyle = linGrd;
      // ctx.lineWidth = 3;   
      ///////////////
      // ctx.strokeStyle(255,45,45,0.4)
    
       
      // ctx.fill(); 
