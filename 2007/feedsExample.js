// Dean Edwards/Matthias Miller/John Resig

function init() {
    // quit if this function has already been called
    if (arguments.callee.done) return;

    // flag this function so we don't do the same thing twice
    arguments.callee.done = true;

    // kill the timer
    if (_timer) clearInterval(_timer);
    hideFeedDivs();
	feedOne();
	feedTwo();
	feedThree();
	feedFour();
	feedFive();
};

/* for Mozilla/Opera9 */
if (document.addEventListener) {
    document.addEventListener("DOMContentLoaded", init, false);
}

/* for Internet Explorer */
/*@cc_on @*/
/*@if (@_win32)
    document.write("<script id=__ie_onload defer src=javascript:void(0)><\/script>");
    var script = document.getElementById("__ie_onload");
    script.onreadystatechange = function() {
        if (this.readyState == "complete") {
            init(); // call the onload handler
        }
    };
/*@end @*/

/* for Safari */
if (/WebKit/i.test(navigator.userAgent)) { // sniff
    var _timer = setInterval(function() {
        if (/loaded|complete/.test(document.readyState)) {
            init(); // call the onload handler
        }
    }, 10);
}

/* for other browsers */
window.onload = init;
function hideFeedDivs(){
  if (!document.getElementById) return false;
	document.getElementById("feed2").style.display = 'none';
	document.getElementById("feed3").style.display = 'none';
	document.getElementById("feed4").style.display = 'none';
	document.getElementById("feed5").style.display = 'none';
}
function resetTabs() {
	document.getElementById("feedLink1").parentNode.className = "firstTab";
	document.getElementById("feedLink2").parentNode.className = "";
	document.getElementById("feedLink3").parentNode.className = "";
	document.getElementById("feedLink4").parentNode.className = "";
	document.getElementById("feedLink5").parentNode.className = "";
}
function feedSwap(id) {
	document.getElementById("feed1").style.display = 'none';
	document.getElementById("feed2").style.display = 'none';
	document.getElementById("feed3").style.display = 'none';
	document.getElementById("feed4").style.display = 'none';
	document.getElementById("feed5").style.display = 'none';

	document.getElementById(id).style.display = 'block';

}

function feedOne(){
	var tab = document.getElementById("feedLink1");
	tab.onclick = function() {
	  resetTabs();
	  tab.parentNode.className = "firstSelected";
	  feedSwap("feed1");
	  return false;
	}
}
function feedTwo(){
	var tab = document.getElementById("feedLink2");
	tab.onclick = function() {
	  resetTabs();
	  tab.parentNode.className = "selected";
	  feedSwap("feed2");
	  return false;
	}
}
function feedThree(){
	var tab = document.getElementById("feedLink3");
	tab.onclick = function() {
	  resetTabs();
	  tab.parentNode.className = "selected";
	  feedSwap("feed3");
	  return false;
	}
}
function feedFour(){
	var tab = document.getElementById("feedLink4");
	tab.onclick = function() {
	  resetTabs();
	  tab.parentNode.className = "selected";
	  feedSwap("feed4");
	  return false;
	}
}
function feedFive(){
	var tab = document.getElementById("feedLink5");
	tab.onclick = function() {
	  resetTabs();
	  tab.parentNode.className = "selected";
	  feedSwap("feed5");
	  return false;
	}
}