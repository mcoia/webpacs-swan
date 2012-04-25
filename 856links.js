var scopeStrings = new Array ();
scopeStrings["crowder"] = "Crowder"
scopeStrings["drury"] = "drury"
scopeStrings["drury2"] = "Drury"
scopeStrings["forest"] = "forest"
scopeStrings["forest2"] = "fipp"
scopeStrings["mssu"] = "spivalib"
scopeStrings["mssu2"] = "MSSU"
scopeStrings["msu"] = "missouristate"
scopeStrings["msu2"] = "Missouri State"
scopeStrings["otc"] = "otc"
scopeStrings["otc2"] = "OTC"
scopeStrings["sbu"] = "sbuniv"
scopeStrings["sbu2"] = "SBU"


function hideLinks(){

    
    if ($("table").is('.bibLinks')){
        $(".bibLinks a").each(function(index, element) {
	    for (var key in scopeStrings) {
		if($(element).parent().html().indexOf(scopeStrings[key]) > -1) {
		  $(element).parent().parent().hide()
		}
	    }    
        });
    }  
}


$(document).ready(function () {
    hideLinks();
});