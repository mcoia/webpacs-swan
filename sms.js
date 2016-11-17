// JavaScript Document

// set this to be the URL for the SMS script
var smsurl = "https://dropbox.mobiusconsortium.org/sms/sms-email-gateway.php?scope=swan";

function showsms() {

  /*   This function shows the SMS layer and creates the form   */

  try {

    var title = '';                    // we'll save the title here
    var debug = 0;                    // enable this to show alerts
    var f = document.getElementById('bib_detail');

    try {                          // we use try/catch blocks to hide errors
      var tr = document.getElementsByTagName('TR');    // we have to iterate through every TR b/c we can't get to the title otherwise
      for(i = 0; i < tr.length; i++) {          // for every TR in the document
        var x=tr[i].getElementsByTagName('TD');      // get all of the Columns
        if (x.length == 2 && x[0].innerHTML == "Title") {  // if the row has 2 columns and the first one has the text of Title
          title = x[1].innerHTML.replace(/(<([^>]+)>)/ig,""); // strip out all of the HTML so we just have text
          if (debug > 0) alert('found title: ' + title);    // just a debug notice
        }
      }
    } catch (e) {}

    var sms = document.getElementById('sms');        // this is the DIV that we're going to put the text into
    // we'll load the 'out' variable with all the html and then put it into the sms div
    var out = "<h3>Send the title, location, and call number of this item to your cell phone.</h3><form name='sms_form' method=post><p><b>Title</b>: "+ title +"</p>";

    out += '<input type=hidden name=title value=\"'+title+'\">';  //dump the title into a hidden form variable
    out += '<p><b>Enter your cell phone #</b>: <input name=phone type=text></p>';  // input for the phone #
    out += "<p class=eg>(use the full 10 digits of your phone #, no spaces, no dashes eg. 6105265000)</p>";
    out += "<p><b>Select your provider:</b><select name=provider>";  // pull-down for each of phone carriers the values will be parsed by the perl script
    out += "<option value=att>AT&amp;T</option>";
    out += "<option value=cricket>Cricket</option>";
    out += "<option value=nextel>Nextel</option>";
    out += "<option value=northwest>Northwest Cellular</option>";
	out += "<option value=projectfi>Project Fi</option>";
    out += "<option value=qwest>Qwest</option>";
    out += "<option value=sprint>Sprint</option>";
    out += "<option value=tmobile>T-Mobile</option>";
    out += "<option value=uscellular>US Cellular</option>";
    out += "<option value=verizon>Verizon</option>";
    out += "<option value=virgin>Virgin</option>";
    out += "</select></p>";
    out += "<p><b>Choose the item you need:</b><ol>";

    var itms = document.getElementById('bib_items');    // get the ITEM table
    var tr = itms.getElementsByTagName('TR');  // get each row
    for(i = 1; i < tr.length; i++) {
      var x=tr[i].getElementsByTagName('TD');      // get each cell
      if (x.length == 4) {                // if there's only 3 cells (like our ITEM table)
      var loc = x[0].innerHTML.replace(/(<([^>]+)>|&nbsp;)/ig,"");    // get the location (remove tags)
      var call = x[1].innerHTML.replace(/(<([^>]+)>|&nbsp;)/ig,"");  // get the call number + copies if any (remove tags)
      var status = x[3].innerHTML.replace(/(<([^>]+)>|&nbsp;)/ig,"");  // get the status (remove tags)

      var chck = '';
      if (i == 1) chck = ' checked ';                  // if we're on the first row, check it
      // append the input
      out += '<li><input '+chck+' type=radio name=loc value=\"'+loc+'|'+call+'\">'+ loc + ": "+call+" ("+status+")</li>";
      // debug statement
      if (debug > 0) alert('found item: ' + loc + '|' + call + ' | ' + status );
    }
  }
  // close the list and add note
  out += "</ol></p>";
  out += "<p><strong>NOTE:</strong> Carrier charges may apply if your cell phone service plan does not include free text messaging.</p>";
  // add buttons at bottom.  note the return false which stops the forms from actually doing anything
  out += "<p><a href='#here' id='sendmessage' onClick='sendSMS();return false;'><img src='/screens/smssend.gif' border=0></a> <a href='#here' id='clearmessage' onClick='clearsms();return false;'><img src='/screens/smsclear.gif' border=0></a></p>";

  // we use the innerHTML property to actually set the HTML into the page
  sms.innerHTML = out+"</form>";

  // now we make the div visible
  sms.style.visibility = 'visible';
  sms.style.display = 'block';
  // some fancy positioning
  findPos(document.getElementById('smsbutton'),sms,0,-320);
} catch (e) {
  // doesn't work?  hide the SMS buttons
  document.getElementById('smsfeatures').style.visibility='hidden';
}
return false;
}


function sendSMS(location) {
  var frm = document.sms_form;      // get the SMS form
  var phone = frm.phone.value;      // get the phone #
  phone = phone.replace(/[^\d]/ig,"");  // remove all non-digit characters
  if (phone.length == 10) {        // if 10 chars, we're good
  var url = smsurl;            // start creating the URL
  url += "&number="+encodeURIComponent(frm.phone.value);  // html escape #
  url += "&provider="+encodeURIComponent(frm.provider.options[frm.provider.selectedIndex].value);  // html escpae provider
  for (i=0;i<frm.loc.length;i++) {    // for each item, get the checked one
    //    alert(i+" "+frm.loc[i].checked);
    if (frm.loc[i].checked == true) {  // if checked, add it to the URL
      url += "&item="+encodeURIComponent(frm.loc[i].value);
    }
  }
  if (frm.loc.length == undefined) {    // if just one, should not come to this
    url += "&item="+encodeURIComponent(frm.loc.value);
  }

  var bodyRef = document.getElementsByTagName("body")[0]; //get the bib number out of the <body>, add it to the url
  var bodyText = bodyRef.innerHTML;
  var bibNum = bodyText.match(/b[\d]{7}/m);
  url += "&bib="+bibNum;

  var head = document.getElementsByTagName("head")[0];    // now we create a <SCRIPT> tag in the <HEAD> to get the response
  var script = document.createElement('script');
  script.setAttribute('type','text/javascript');
  script.setAttribute('src',url);              // the script is actually the PERL script
  head.appendChild(script);                  // append the script
} else {    // invalid phone #, send message
  alert('please enter a valid phone #');
}
}

// clear/hide the SMS DIV
function clearsms() {
  var sms = document.getElementById('sms');
  sms.style.visibility = 'hidden';
  sms.style.display = 'none';
}



// get the position of an item, good for putting the SMS form in a useful place
function findPos(obj,obj2,lofset,tofset) {
  var curleft = curtop = 0;
  if (obj.offsetParent) {
    curleft = obj.offsetLeft
    curtop = obj.offsetTop
    while (obj = obj.offsetParent) {
      curleft += obj.offsetLeft
      curtop += obj.offsetTop
    }
  }
  obj2.style.left = curleft+lofset;
  obj2.style.top = curtop+tofset;
  //  return [curleft,curtop];
}

// Grab the bib number of the item
function getbib() {
  var buttonBlock = document.getElementById('navigationRow').innerHTML;
  sms.style.visibility = 'hidden';
  sms.style.display = 'none';
}
