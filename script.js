var pages = 3;
var currentpage = 1;
if (document.location.hash) { currentpage = parseInt(document.location.hash.replace('#', '')); }

console.log(currentpage);

var nextpage = currentpage + 1; if (nextpage > pages) { nextpage = pages; }
var prevpage = currentpage - 1; if (prevpage < 1) { prevpage = 1; }
	
var animatingup = false;
var animatingdown = false;
	
$(document).ready(function() {
	resizeDiv();
	//scrolltocurrent();
});

window.onresize = function(event) {
	resizeDiv();
	scrolltocurrent();
}

$(window).scroll(function(event) {
	
	if (animatingup==true) { console.log("animating up..."); return; }
	if (animatingdown==true) { console.log("animating down..."); return; }
	
	nextpage = currentpage + 1; if (nextpage > pages) { nextpage = pages; }
	prevpage = currentpage - 1; if (prevpage < 1) { prevpage = 1; }
		
	console.log("scroll happened, previous page is " + prevpage + ", current page is " + currentpage + ", next page is " + nextpage);

	
	if (animatingup == false) {
		if ($(window).scrollTop()+$(window).height()>=$("#page"+(nextpage)).offset().top+0.5) {
			if (nextpage > currentpage) {
				var p2 = $( "#page"+(nextpage) );
				var pageheight = p2.position().top;
				animatingdown = true;
				$('html, body').animate({ scrollTop: pageheight }, 2000, function() { currentpage = nextpage; animatingdown = false; document.location.hash = currentpage;});
				return;
			}
		}
	}
	
	if (animatingdown == false) {
		if ($(window).scrollTop()<=$("#page"+(currentpage)).offset().top-0.5) {
			if (prevpage < currentpage) {
				var p2 = $( "#page"+(currentpage) );
				var pageheight = p2.position().top-$(window).height();
				animatingup = true;
				$('html, body').animate({ scrollTop: pageheight }, 2000, function() { currentpage = prevpage; animatingup = false; document.location.hash = currentpage;});
				return;
			}
		}
	}
});
 

function scrolltocurrent() {
	var p2 = $( "#page"+(currentpage) );
	var pageheight = p2.position().top;
	$('html, body').animate({ scrollTop: pageheight }, 1);
}

function resizeDiv() {
	vpw = $(window).width();
	vph = $(window).height();
	$('.page').css({'min-height': vph + 'px'});
}
$(window).scroll(function(){
    if ($(window).scrollTop() >= 0.5) {
        $('nav').addClass('fixed-header');
        $('nav div').addClass('visible-title');
        $('nav div').addClass('site-title');
     
}});

$(document).ready(function(){
  $('#background figure').click(function(e){
    $(this).toggleClass('fullscreen'); 
  });
});