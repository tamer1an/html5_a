var PagesApp = (function () {
	var App = {
		stores : {},
		views : {}
		// u: {	path: function(splitText){return window.location.pathname.split(splitText);} }
	};
	
	/*** ioSliderPage Page Functionality */
	var ioSliderPage = Backbone.View.extend({
		el : 'body',
		currentPageId : function () { return ($.mobile.activePage.attr('id') || '_').split('_'); },
		lastPage : false,
		events : {
			//	"swipeleft" :function(e) { alert(e.type); },
			//	"swiperight" :function(e) { alert(e.type); },
			//	"pagebeforecreate": function(e) { alert(e.type); },
			//	"pagebeforeshow" : function(e) { alert(e.type); }
			// "pagebeforeload": 	function(e) { alert(e.type); },
			// "pageload": 			function(e) { alert(e.type); },
			// "pageloadfailed": 	function(e) { alert(e.type); },
			// "pagebeforechange":	function(e) { alert(e.type); },
			// "pagechange": 		function(e) { alert(e.type); },
			// "pagechangefailed":	function(e)	{ alert(e.type); },
			// "pagebeforehide": 	function(e) { alert(e.type); },
			// "pageshow": 			function(e) { alert(e.type); },
			// "pagehide": 			function(e) { alert(e.type); },
			// "pagecreate": 		function(e) { alert(e.type); },
			// "pageinit": 			function(e) { alert(e.type); },
			// "pageremove": 		function(e) { alert(e.type); },
			// "updatelayout": 		function(e) { alert(e.type); }
		},
		initialize : function () {
			this.pageCounter = $('div[data-role="page"]').size().toFixed();
			
			//ioSlider
			_.bindAll(this, 'ioSlide');
			this.ioSlide();
		},
		
		// io slider presentation
		ioSlide : function () { // paginator in the footer
			$(document).ready(function() {
			    $('.iosSlider').iosSlider({
					scrollbar: false,
					snapToChildren: true,
					desktopClickDrag: true,
					autoSlideTransTimer: '2200',
//						infiniteSlider: true,
					
//						navPrevSelector: $('.prevButton'),
//						navNextSelector: $('.nextButton'),
					navSlideSelector: $('a'),
					
//						autoSlide:false ,
//						autoSlideTimer: 5000,
//						autoSlideTransTimer:  750,
					
//						responsiveSlideWidth: 	true,
					
					// onSlideChange: navHandler,
					onSlideComplete: navHandler,
					// onSliderLoaded: loadHandler
				});
			    
			    // disable vertical bounce on iOS
			    document.ontouchmove = function(e){ 
			        e.preventDefault(); 
			    };
			});
			//if (window.location.hash == '#page_1' || ' ')
			//footer.addClass('hidden');
			var footerContent = '',
				currentPageId = this.currentPageId(),
				footer = $('footer h4');
			
			for (var count = 1; count <= this.pageCounter; count++) //'+(currentPageId[1] == count? 'navA': '')+'
				footerContent += '<div class="ml0pc f w3pc h100pc nav  block">' +
									'<a class="f w100pc h100pc" href="#"></a>' +
								  '</div>';
			
			footer.html(footerContent).find('a').eq(0).addClass('navA');
			// .click(function (e) {
				// //	e.preventDefault();
				// //	e.stopPropogation();
				// //	e.stopImmediatePropagation();
			// });
		}			
	}); //end ioSlider = Backbone.View.extend 
	

	/*** BasicPage Page Functionality */
	var BasicPage = Backbone.View.extend({
		el : 'body',
		currentPageId : function () {
			return ($.mobile.activePage.attr('id') || '_').split('_');
		},
		lastPage : false,
		events : {
			"swipeleft" : "slide",
			"swiperight" : "slide",
			'pagebeforecreate #page_1' : function (event) {
				App.views.basic.titlePage();
			},
			"pagebeforeshow" : function (e) {
				App.views.basic.pages();
			}
			// "pagebeforeload": 	function(e) { alert(e.type); },
			// "pageload": 		function(e) { alert(e.type); },
			// "pageloadfailed": 	function(e) { alert(e.type); },
			// "pagebeforechange":	function(e) { alert(e.type); },
			// "pagechange": 		function(e) { alert(e.type); },
			// "pagechangefailed":	function(e)	{ alert(e.type); },
			// "pagebeforehide": 	function(e) { alert(e.type); },
			// "pageshow": 		function(e) { alert(e.type); },
			// "pagehide": 		function(e) { alert(e.type); },
			// "pagecreate": 		function(e) { alert(e.type); },
			// "pageinit": 		function(e) { alert(e.type); },
			// "pageremove": 		function(e) { alert(e.type); },
			// "updatelayout": 	function(e) { alert(e.type); }
		},
		initialize : function () {
			_.bindAll(this, 'slide', 'pages'); // Text resize 4 the title page
			this.pageCounter = $('div[data-role="page"]').size().toFixed();
			
			if (this.currentPageId()[1] == 1)
				this.titlePage();
			this.pages();
		},
		pages : function () { // paginator in the footer
			var footerContent = '',
			currentPageId = this.currentPageId(),
			footer = $('footer h4');
			
			if (window.location.hash == '#page_1' || ' ')
				footer.addClass('hidden');
			
			for (var count = 1; count <= this.pageCounter; count++)
				footerContent += currentPageId[1] == count
				 ? '<div class="ml0pc w2pc h100pc navA f block">' +
				'<a class="hidden f w100pc h100pc" href="#page_' + count + '"></a>' +
				'</div>'
				 : '<div class="ml0pc f w2pc h100pc nav block">' +
				'<a class="f w100pc h100pc" href="#page_' + count + '">' + '</a>' +
				'</div>';
			
			footer.html(footerContent).find('a')
			.click(function (e) {
				var currOld = $('.current');
				var currNew = $(e.currentTarget);
				
				if (currNew.attr('href') == '#page_1')
					currOld.parent().addClass('hidden');
				
				currOld.add(currNew.addClass('hidden').parent()).toggleClass('current');
				currOld.children('a').removeClass('hidden');
			});
			
			if (currentPageId[1] == 2 && this.lastPage[1] != 3)
				setTimeout(function () {
					footer.removeClass('hidden');
				}, 200);
			else if (this.pageCounter > 1 && currentPageId[1] > 1)
				footer.removeClass('hidden');
		},
		slide : function (event) { // slide actions
			switch (event.type) {
			case "swiperight":
				if ($.mobile.activePage.prev().size() && typeof $.mobile.activePage.prev().attr('id') !== 'undefined') {
					this.lastPage = ($.mobile.activePage.attr('id') || '_').split('_');
					$.mobile.changePage($.mobile.activePage.prev());
				}
				break;
			case "swipeleft":
				if ($.mobile.activePage.next().size() == 1 && typeof $.mobile.activePage.next().attr('id') !== 'undefined') {
					this.lastPage = ($.mobile.activePage.attr('id') || '_').split('_');
					$.mobile.changePage($.mobile.activePage.next());
				}
				break;
			}
			event.preventDefault();
		},
		titlePage : function () { // var fontSize = parseInt($('.main_text_1 p:first').css('fontSize'));
			var scale = (typeof fontScaleFactor == 'number') ? fontScaleFactor : 100;
			var ScrW = $(window).width();
			
			var p1 = 20,   	//  / 12)
				p2 = 24,   	//  / 17)
				p3 = 45;   	//  / 25);    

			// console.log(ScrW);
			
			$('.main_text_1 p:first').css('fontSize', (ScrW / 100 * scale) / p1);
			$('.main_text_1 p:last').css('fontSize', (ScrW / 100 * scale) / p2); 
			$('.logo_1').css('fontSize', (ScrW / 100 * scale) / p3);
			
			$(window).resize(function (e) { // console.log('new ',$('body').width()+' ',scale) ;
				// var ScrW = $('.ui-content').width();
				var ScrW = $(window).width();
				
				$('.main_text_1 p:first').css('fontSize', (ScrW / 100 * scale) / p1);   
				$('.main_text_1 p:last').css('fontSize', (ScrW / 100 * scale) / p2);    
				$('.logo_1').css('fontSize', (ScrW / 100 * scale) / p3);	//e.stopPropogation();
			});
		}
	});
	
	//APP CONSTRUCTOR:
	$(function () {	
//		App.views.basic = new BasicPage; 
		App.views.ioSlider = new ioSliderPage; 
	});
	return App;
	
})(); //end PagesApp // console.log(PagesApp);

function loadHandler(args){
	// console.log("loadHandler",args);
	selectCurrent(args);
}

function navHandler(args){
	// console.log($('a').eq(args.currentSlideNumber).addClass('nav')) //
	// console.log(pages.eq(args.currentSlideNumber-1).removeClass('navA'));
	var pages = $('a');
	pages.removeClass('navA');
	pages.eq(args.currentSlideNumber).addClass('navA');
	// console.log("1",pages);
	// console.log("2",pages.eq(args.currentSlideNumber));
	// console.log("3",pages.eq(0));
	// console.log("navHandler",args);
}

function selectCurrent(args){
	// console.log("selectCurrent",args);
}


//////////////////////////////////////////////////////////////
// some custom settings */
//$('.iosSlider').iosSlider({
//	snapToChildren: true,
//	scrollbar: true,
//	scrollbarHide: false,
//	desktopClickDrag: true,
//	scrollbarLocation: 'bottom',
//	scrollbarHeight: '6px',
//	scrollbarBackground: 'url(_img/some-img.png) repeat 0 0',
//	scrollbarBorder: '1px solid #000',
//	scrollbarMargin: '0 30px 16px 30px',
//	scrollbarOpacity: '0.75',
//	onSlideChange: changeSlideIdentifier
//});

//$('div').iosSlider('destroy');
//$('div').iosSlider('goToSlide', slideNum); 

//	$(document).ready(function() {
//	    $('.iosSlider').iosSlider({
//			scrollbar: false,
//			snapToChildren: true,
//			desktopClickDrag: true,
//			autoSlideTransTimer: '2200',
////			navPrevSelector: $('.prevButton'),
////			navNextSelector: $('.nextButton'),
//			navSlideSelector: $('a'),
////			infiniteSlider: true,
////			autoSlide:false ,
////			autoSlideTimer: 5000,
////			autoSlideTransTimer:  750,
//			
////			responsiveSlideWidth: 	true,
//			
//			onSlideComplete: navHandler,
////			onSlideChange: navHandler,
//			onSliderLoaded: loadHandler
//		});
////////////////////////////////////////////////////////////////////

// usage: log('inside coolFunc', this, arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
// window.log = function f() {
    // log.history = log.history || [];
    // log.history.push(arguments);
    // if (this.console) {
        // var args = arguments;
        // var newarr;

        // try {
            // args.callee = f.caller;
        // } catch(e) {

        // }

        // newarr = [].slice.call(args);

        // if (typeof console.log === 'object') {
            // log.apply.call(console.log, console, newarr);
        // } else {
            // console.log.apply(console, newarr);
        // }
    // }
// };

// make it safe to use console.log always
// (function(a) {
    // function b() {}
    // var c = "assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn";
    // var d;
    // for (c = c.split(","); !!(d = c.pop());) {
        // a[d] = a[d] || b;
    // }
// })(function() {
    // try {
        // console.log();
        // return window.console;
    // } catch(a) {
        // return (window.console = {});
    // }
// }());
// place any jQuery/helper plugins in here, instead of separate, slower script files.




// ################################### // 



//var wi = $(window).width()*scale/100;
//console.log(fontSize);
//console.log('subSize',$(window).width()/22.5 );
//console.log('addSize',$(window).width()*0.045 );
//console.log('new',($(window).width()/100*scale)/22.5) ;

// MODEL MOCKUP
// App.stores.page = new Store('page'); // Initialize localStorage Data Store

//== Page Model ==//
// var Presentation = Backbone.Model.extend({ // Use localStorage datastore
// // localStorage: App.stores.page,
// initialize: function(){
// if(!this.get('date_log'))
// this.set({date_log: "Page @ " + Date() });

// if(!this.get('footer'))
// this.set({footer: "No Content"});
// },
// });
// window.Presentation = Presentation; // mypage = new Presentation // mypage.save();

// window.appObj = new Presentation;

//////////////////////////////////////
// A transition handler is a function with the following call signature:
// Define your transition handler:

// function myTransitionHandler(name, reverse, $to, $from)
// {
// var deferred = new $.Deferred();

// // Perform any actions or set-up necessary to kick-off
// // your transition here. The only requirement is that
// // whenever the transition completes, your code calls
// // deferred.resolve(name, reverse, $to, $from).

// // Return a promise.
// return deferred.promise();
// }

// // Register it with jQuery Mobile:

// $.mobile.transitionHandlers["slide"] = myTransitionHandler;

// ---------------------------------------
// Registering and Invoking Your Transition Handler

// Once you have created a transition handler function, you need to tell jQuery Mobile about it. To do this, simply add your handler to the $.mobile.transitionHandlers dictionary. Remember, the key used should be the name of your transition. This name is also the same name that will be used within the @data-transition attribute of any navigation links.


// // Define your transition handler:

// function myTransitionHandler(name, reverse, $to, $from)
// {
// var deferred = new $.Deferred();

// // Perform any actions or set-up necessary to kick-off
// // your transition here. The only requirement is that
// // whenever the transition completes, your code calls
// // deferred.resolve(name, reverse, $to, $from).

// // Return a promise.
// return deferred.promise();
// }

// // Register it with jQuery Mobile:

// $.mobile.transitionHandlers["myTransition"] = myTransitionHandler;


// Once you've registered your handler, you can invoke your transition by placing a data-transition attribute on a link:

// <a href="#page2" data-transition="myTransition">Page 2</a>
