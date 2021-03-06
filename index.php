<?php //CONSTANTS
    // "Server details"
	define ('NAME',$_SERVER['SERVER_NAME']  );
	define ('ADDR',$_SERVER['SERVER_ADDR']  );
	define ('PORT',$_SERVER['SERVER_PORT']  );
	define ('RQ_URL',$_SERVER['REQUEST_URI']);
	
	define('SYS_URL','http://'.NAME.'/');
	
	// "IMG"
	define('IMG',SYS_URL.'images/');
	
	// "CSS"
	define ('CSS',SYS_URL.'css/');
		// define('GOOGLE_FONT','http://fonts.googleapis.com/css?family=');
		
	// "JavaScripts"
	define ('JS',SYS_URL.'js/libs/');
	define ('JQ',JS.'jq/'); 
		define ('JQext','//ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js');
	define ('JQM',JQ.'mobile/');
	define ('BB',JS.'backbone/');
?>
<!DOCTYPE html>
<!-- paulirish.com/2008/conditional-stylesheets-vs-css-hacks-answer-neither/ -->
<!--[if lt IE 7]> <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang="en"> <![endif]-->
<!--[if IE 7]>    <html class="no-js lt-ie9 lt-ie8" lang="en"> <![endif]-->
<!--[if IE 8]>    <html class="no-js lt-ie9" lang="en"> <![endif]-->
<!-- Consider adding a manifest.appcache: h5bp.com/d/Offline -->
<!--[if gt IE 8]><!-->
<html class="no-js" lang="en"> <!--<![endif]-->
<head>
  <!-- More ideas for your <head> here: h5bp.com/d/head-Tips -->
  <meta charset="utf-8">
  <!-- Use the .htaccess and remove these lines to avoid edge case issues.
       More info: h5bp.com/i/378 -->
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <title>Canvas banner</title>
  <meta name="description" content="My testing page">
  <meta name="viewport" content="width=device-width">
	  
	  <!-- CSS -->
	  <link href="<?php echo CSS?>base_style.css" 	rel="stylesheet" type="text/css">
	  <link href="<?php echo CSS?>fields.css" 		rel="stylesheet" type="text/css">
	  <link rel="stylesheet" href="css/style.css">
		
	  <!-- SCRIPT CONSTANTS (JS,JQ,JQM) --> 
	  <script src="js/libs/modernizr-2.5.3.min.js"></script>
      
      
      <link href='http://fonts.googleapis.com/css?family=Open+Sans|Source+Code+Pro' rel='stylesheet' type='text/css'>
      <style>
      #wrapper {
            text-align: center;
        }
        #wrapper > div {
        	display: inline-block;
        	margin: 0 20px;
        	padding: 10px;
        	background-color: #eee;
        	border-radius: 10px;
        	font-weight: 600;
        }
        #container {
          width: 300px;
          height: 300px;
          /*https://www.webkit.org/blog/176/css-canvas-drawing/*/
          background: -webkit-canvas(animation) no-repeat 50% 50%;
          background-size: 100%;
          display: inline-block;
          -webkit-transition: background 0.4s;
        }
        pre.prettyprint {
        	font-family: 'Source Code Pro', sans-serif;
        	width: auto;
        	display: inline-block;
        	text-align: left;
        	margin-top: 30px;
        }
        #notsupport {
          text-align: center;
          font-weight: bold;
          color: red;
          padding: 10px;
          border: 1px solid red;
          background-color: rgba(255,0,0,0.1);
          border-radius: 5px;
          display: none;
          position: relative;
          z-index: 1000;
        }
      
      </style>
</head>

<body onload="init()">
  <!-- Prompt IE 6 users to install Chrome Frame. Remove this if you support IE 6.
       chromium.org/developers/how-tos/chrome-frame-getting-started -->
  <!--[if lt IE 7]><p class=chromeframe>Your browser is <em>ancient!</em> <a href="http://browsehappy.com/">Upgrade to a different browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">install Google Chrome Frame</a> to experience this site.</p><![endif]-->
  <header>

  </header>
  <div style="float:left;width:100%" role="main">
    <div style="float left">
      
        <details>
          <summary>What's this?</summary>
          <div>
            <p>Drawing to <code>&lt;canvas></code> and using it as the CSS background of a DOM node. This allows programmatic animations for background images. Most people use hacks using <code>.toDataURL()</code> to do the same, but <code>.toDataURL()</code> adds a ~33% overhead to the resulting image and involves touching the DOM in JS (<code>el.style.background = 'url("data:...")';</code>). Both are inefficient.</p>
        
            	<p>Instead of specifying a URL for the <code>background-image</code>, reference the same 
        		identifier/name in <code>-webkit-canvas()</code> as the one used in the call to <code>document.getCSSCanvasContext()</code>. Note: this is a special method that you need to create
        		the 2d context with.</p>
        		
        		<p>Once things are hooked up, <code>requestAniamtionFrame()</code> is used to drive the canvas animation.
        		The rest is taken care of by the browser when the association is made.</p>
          </div>
        </details>

        <div id="notsupport">Your browser doesn't support document.getCSSCanvasContext</div>

        <div id="wrapper">
        	<p>Drawing an animation to <code>&lt;canvas></code> and using it as the CSS <code>background-image</code> of a DOM node.<br>This allows backgrounds to be "live" and powered programmatically via canvas.</p> 
        <div>
    	    <div id="container"></div>
    	    <div>&lt;div class="canvas-bg"&gt;</div>
        </div>
        <div id="canvas-container">
        	<div>&lt;canvas&gt;</div>
        </div>
        
        <pre class="prettyprint">
        &lt;style&gt;
          .canvas-bg {
            background: -webkit-canvas(animation) no-repeat 50% 50%;
          }
        &lt;/style&gt;
        &lt;script&gt;
          var ctx = document.getCSSCanvasContext('2d', 'animation', 300, 300);
        &lt;/script&gt;
        </pre>
        </div>
    </div>
	
    <div id="canvas-test" style="float:left;width:100%;height:200px;margin-top:3%;">
    
    </div>
    
	<canvas style="float:left;clear:both;margin-left:33%;margin-top:40px" id="testCanvas" width="500" height="500">
		Canvas not supported
	</canvas>
    
	
  </div>
  <footer>

  </footer>

  <!-- JavaScript at the bottom for fast page loading -->
	<?php /*   	<script src="<=JQM?>jquery.mobile-1.1.0.min.js" type="text/javascript"></script>
      <script src="<?php echo JQ?>jquery.iosslider.min.js"    type="text/javascript"></script>  */?>
	
  <!-- Grab Google CDN's jQuery, with a protocol relative URL; fall back to local if offline -->
	  <script src="<?php echo JQext?>"></script> 
	  <script>window.jQuery || document.write('<script src="<?php echo JQ?>jquery.min.js"><\/script>')</script>
	  
	  <script src="<?php echo JS?>underscore.min.js"          type="text/javascript"></script>
	  <script src="<?php echo BB?>backbone.min.js"            type="text/javascript"></script>
	  <script src="<?php echo BB?>localStorage.js"            type="text/javascript"></script>
	  
		<!-- scripts concatenated and minified via build script -->
	  <script src="js/plugins.js"></script>
	  <script src="js/script.js"></script>
  <!-- end scripts -->

  <!-- Asynchronous Google Analytics snippet. Change UA-XXXXX-X to be your site's ID.
       mathiasbynens.be/notes/async-analytics-snippet -->
  <!--script>
    var _gaq=[['_setAccount','UA-XXXXX-X'],['_trackPageview']];
    (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
    g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
    s.parentNode.insertBefore(g,s)}(document,'script'));
  </script-->
</body>
</html>