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

if (href.indexOf("&redirected") != -1 ) {
    var redirectMessage = "<p>You've been redirected from swan.mobius.umsystem.edu or swan.missouri.edu. Starting in June of 2012, those addresses will no longer work.</p><p>Please update your bookmarks to <a href='http://swan.searchmobius.org'>http://swan.searchmobius.org</a>.</p>"

    $(document).ready(function () {
        $('#redirectMessage').html(redirectMessage);
    });  
}

