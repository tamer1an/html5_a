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
  <?/*
    <!-- Mobile viewport optimized: h5bp.com/viewport -->
    <!-- DEVICE CONFIG -->
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" /><!-- define width & scale attr-->
		<meta name="apple-mobile-web-app-capable" 			content="yes" /> <!-- full screen -->
		<meta name="apple-mobile-web-app-status-bar-style" 	content="black-translucent"> <!-- clock bar color -->
		<meta name="format-detection" content="telephone=no">   
	
	<!-- ICONS -->
	 <!-- Place favicon.ico and apple-touch-icon.png in the root directory: mathiasbynens.be/notes/touch-icons -->
		<link rel="apple-touch-icon" href="<?=ebIMG?>dt_icon.png" />
		<link rel="apple-touch-startup-image" href="<?=ebIMG?>load_screen.png" /> 
		 
		<link rel="apple-touch-icon" sizes="72x72" href="touch-icon-ipad.png" />
		<link rel="apple-touch-icon" sizes="114x114" href="touch-icon-iphone4.png" />
   */?><meta name="viewport" content="width=device-width">
	  
	  <!-- CSS -->
	  <link href="<?=CSS?>base_style.css" 	rel="stylesheet" type="text/css">
	  <link href="<?=CSS?>fields.css" 		rel="stylesheet" type="text/css">
	  <link rel="stylesheet" href="css/style.css">
		
	  <!-- SCRIPT CONSTANTS (JS,JQ,JQM) --> 
	  <script src="js/libs/modernizr-2.5.3.min.js"></script>
</head>

<body onload="init()">
  <!-- Prompt IE 6 users to install Chrome Frame. Remove this if you support IE 6.
       chromium.org/developers/how-tos/chrome-frame-getting-started -->
  <!--[if lt IE 7]><p class=chromeframe>Your browser is <em>ancient!</em> <a href="http://browsehappy.com/">Upgrade to a different browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">install Google Chrome Frame</a> to experience this site.</p><![endif]-->
  <header>

  </header>
  <div role="main">
	hello world!
	</br>
	
	<canvas id="testCanvas" width="800" height="800">
		Canvas not supported
	</canvas>
	
  </div>
  <footer>

  </footer>

  <!-- JavaScript at the bottom for fast page loading -->
	<?php /*   	<script src="<=JQM?>jquery.mobile-1.1.0.min.js" type="text/javascript"></script>
      <script src="<?=JQ?>jquery.iosslider.min.js"    type="text/javascript"></script>  */?>
	
  <!-- Grab Google CDN's jQuery, with a protocol relative URL; fall back to local if offline -->
	  <script src="<?=JQext?>"></script> 
	  <script>window.jQuery || document.write('<script src="<?=JQ?>jquery.min.js"><\/script>')</script>
	  
	  <script src="<?=JS?>underscore.min.js"          type="text/javascript"></script>
	  <script src="<?=BB?>backbone.min.js"            type="text/javascript"></script>
	  <script src="<?=BB?>localStorage.js"            type="text/javascript"></script>
	  
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