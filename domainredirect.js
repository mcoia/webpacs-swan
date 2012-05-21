var href = window.location.href
var edu = ".edu"
var domainLength = href.indexOf(edu) + edu.length
var notDomain = href.substring(domainLength)
var searchmobius = 'http://swan.searchmobius.org'

if (notDomain == "/") {
  var redirectUrl = searchmobius  + "/search~S0&redirected"  
}else {
  var r =  /\W$/
  if (r.test(notDomain) == true){
    notDomain = notDomain.slice(0,-1);
  }
  redirectUrl = searchmobius + notDomain + "&redirected"
}

if(href.indexOf("missouri.edu") != -1 ){
    var oldDomain = "swan.missouri.edu"
    window.location = redirectUrl
}else if(href.indexOf("umsystem.edu") != -1 ){
    var oldDomain = "swan.missouri.edu"
    window.location = redirectUrl; 
}else{}

var s = /searchscope=\d*/
var t = /~S\d*/
if (href.match(s)){
  var searchscope = href.match(s)
  var scope = searchscope[0].substring(12);
}else if (href.match(t)){
  var tilde = href.match(t)
  var scope = tilde[0].substring(2);
}else {
  var scope;
}

if (scope == undefined || scope == 0){
  var newURL = searchmobius
}else {
  var newURL = searchmobius + "/search~S" + scope
}

if (href.indexOf("&redirected") != -1 ) {
    
    var redirectMessage = "<p>You've been redirected from swan.mobius.umsystem.edu or swan.missouri.edu. Starting on May 26, 2012, those addresses will no longer work.</p><p>Please update your bookmarks to <a href='" + newURL + "'>" + newURL + "</a>.</p>"

    $(document).ready(function () {
        $('#alertMessage').html(redirectMessage);
    });  
}
