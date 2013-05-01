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
     
</head>

<body onload="init()">
  <!-- Prompt IE 6 users to install Chrome Frame. Remove this if you support IE 6.
       chromium.org/developers/how-tos/chrome-frame-getting-started -->
  <!--[if lt IE 7]><p class=chromeframe>Your browser is <em>ancient!</em> <a href="http://browsehappy.com/">Upgrade to a different browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">install Google Chrome Frame</a> to experience this site.</p><![endif]-->
    
    <div id="canvas-test" style="float:left;width:100%;height:100%;margin-top:3%;">
    
    </div>
    
	<canvas style="float:left;clear:both;margin-left:33%;margin-top:40px" id="testCanvas" width="500" height="500">
		Canvas not supported
	</canvas>
    
	
  </div>


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
</body>
</html>