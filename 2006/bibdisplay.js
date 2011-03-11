/*2006 WebPAC Pro Version, set from 21 November, 2006*/

function contentDisplay(id) {

	document.getElementById("copySection").style.display = 'none';
	document.getElementById("moreSection").style.display = 'none';
	document.getElementById("similarSection").style.display = 'none';
	document.getElementById("fullSection").style.display = 'none';
	
	document.getElementById(id).style.display = 'block';

}

function bibTabChange(one,two,three,four,five,six) {
	identity=document.getElementById(one);
	identity.className='selected1';
	identity2=document.getElementById(two);
	identity2.className='selected2';
	identity3=document.getElementById(three);
	identity3.className='selected3';
	identity4=document.getElementById(four);
	identity4.className='selected4';
	identity5=document.getElementById(five);
	identity5.className='bibTabOn';
	identity6=document.getElementById(six);
	identity6.className='bibTabSelected';
}

function bibSimTabChange(one,two,three,four,five,six) {
	identity=document.getElementById(one);
	identity.className='selected1';
	identity2=document.getElementById(two);
	identity2.className='selected2';
	identity3=document.getElementById(three);
	identity3.className='selected3';
	identity4=document.getElementById(four);
	identity4.className='selected4';
	identity5=document.getElementById(five);
	identity5.className='bibSimTabOn';
	identity6=document.getElementById(six);
	identity6.className='bibSimTabSelected';
}

function bibTabswitcher() {
	document.getElementById("copyB1").className = 'option1';
	document.getElementById("copyB2").className = 'option2';
	document.getElementById("copyB3").className = 'option3';
	document.getElementById("copyB4").className = 'option4';
	document.getElementById("moreB1").className = 'option1';
	document.getElementById("moreB2").className = 'option2';
	document.getElementById("moreB3").className = 'option3';
	document.getElementById("moreB4").className = 'option4';
	document.getElementById("simItB1").className = 'option1';
	document.getElementById("simItB2").className = 'option2';
	document.getElementById("simItB3").className = 'option3';
	document.getElementById("simItB4").className = 'option4';
	document.getElementById("fullB1").className = 'option1';
	document.getElementById("fullB2").className = 'option2';
	document.getElementById("fullB3").className = 'option3';
	document.getElementById("fullB4").className = 'option4';


	document.getElementById("bibCopyStatus").className = 'bibTabOff';
	document.getElementById("bibMoreDetails").className = 'bibTabOff';
	document.getElementById("bibSimilarItems").className = 'bibSimTabOff';
	document.getElementById("bibFullRecord").className = 'bibTabOff';

	document.getElementById("copyContent").className = 'bibTabContent';
	document.getElementById("moreContent").className = 'bibTabContent';
	document.getElementById("simContent").className = 'bibSimTabContent';
	document.getElementById("fullContent").className = 'bibTabContent';
}

function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      oldonload();
      func();
    }
  }
}

function addPrintStyles(){
	if (!document.getElementsByTagName) return false;
	if (!document.getElementById("printcss")) return false;
	var oldStyles = document.getElementsByTagName("link")[1];
	oldStyles.setAttribute("title", "web");
	var linkElem = document.createElement("link");
	linkElem.setAttribute("type", "text/css" );
	linkElem.setAttribute("rel", "alternate stylesheet");
	linkElem.setAttribute("title", "printVer");
	linkElem.setAttribute("href", "/screens/printVer.css");
	linkElem = document.getElementsByTagName("head")[0].appendChild(linkElem);
}

function printVersionSelect(){
	if (!document.getElementById("printcss")) return false;
	var printSwitch = document.getElementById("printcss");
	printSwitch.onclick = function() {
 	  contentDisplay("fullSection");
      setActiveStyleSheet("printVer");
    }
}

function webReturn(){
	if (!document.getElementById("webcss")) return false;
	var webSwitch = document.getElementById("webcss");
	webSwitch.onclick = function() {
	  setActiveStyleSheet("web");
 	  contentDisplay("copySection");
	  bibTabswitcher();
	  bibTabChange('copyB1','copyB2','copyB3','copyB4','bibCopyStatus','copyContent');
    }
}

function setActiveStyleSheet(title) {
  var i, a, main;
  for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
    if(a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title")) {
      a.disabled = true;
      if(a.getAttribute("title") == title) a.disabled = false;
    }
  }
}

function initTabs(){
	if (!document.getElementById("printcss")) return false;
	fullSelect();
	simSelect();
	moreSelect();
	copySelect();
/*for IE caching problem */
	setActiveStyleSheet("web");
}

function fullSelect(){
	var tab = document.getElementById("fullSelect");
	tab.onclick = function() {
	  contentDisplay("fullSection");
	  bibTabswitcher();
	  bibTabChange('fullB1','fullB2','fullB3','fullB4','bibFullRecord','fullContent');
	}
}

function simSelect(){
	var tab = document.getElementById("simSelect");
	tab.onclick = function() {
	  contentDisplay("similarSection");
	  bibTabswitcher();
	  bibSimTabChange('simItB1','simItB2','simItB3','simItB4','bibSimilarItems','simContent');
	}
}
function moreSelect(){
	var tab = document.getElementById("moreSelect");
	tab.onclick = function() {
	  contentDisplay("moreSection");
	  bibTabswitcher();
	  bibTabChange('moreB1','moreB2','moreB3','moreB4','bibMoreDetails','moreContent');;
	}
}

function copySelect(){
	var tab = document.getElementById("copySelect");
	tab.onclick = function() {
	  contentDisplay("copySection");
	  bibTabswitcher();
	  bibTabChange('copyB1','copyB2','copyB3','copyB4','bibCopyStatus','copyContent');
	}
}

addLoadEvent(addPrintStyles);
addLoadEvent(printVersionSelect);
addLoadEvent(webReturn);
addLoadEvent(initTabs);