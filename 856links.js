var scopeStrings = new Array ();
scopeStrings[9] = new Array ("bbc", "BBC");
scopeStrings[1] = new Array ("Crowder");
scopeStrings[2] = new Array ("drury", "Drury");
scopeStrings[12] = new Array ("forest", "fipp");
scopeStrings[3] = new Array ("spivalib", "MSSU");
scopeStrings[6] = new Array ("missouristate", "Missouri State"); 
scopeStrings[4] = new Array ("otc", "OTC");  
scopeStrings[5] = new Array ("sbu", "SBU");

delete scopeStrings[scope];

function hideLinks(){

    
    if ($("table").is('.bibLinks')){
        $(".bibLinks a").each(function(index, element) {
	    for (var k in scopeStrings) {
		for (var l in scopeStrings[k]) {
		    if($(element).parent().html().indexOf(scopeStrings[k][l]) > -1) {
		      $(element).parent().parent().hide()
		    }
		}
	    }    
        });
    }  
}


$(document).ready(function () {
    hideLinks();
});