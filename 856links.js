function hideLinks(){
    
var scopeStrings = new Array ();
scopeStrings[1] = new Array ("Crowder");
scopeStrings[2] = new Array ("drury");
scopeStrings[3] = new Array ("spivalib", "mssu");
scopeStrings[4] = new Array ("my.otc");
scopeStrings[5] = new Array ("sbuniv", "SBU");
scopeStrings[6] = new Array ("missouristate"); 
scopeStrings[9] = new Array ("gobbc");
scopeStrings[12] = new Array ("online.forest");
    
var scopeDropdown = $("#searchscope").val();

delete scopeStrings[scopeDropdown];
    
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