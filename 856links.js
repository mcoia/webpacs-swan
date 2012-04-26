function hideLinks(){
    
    var stringsToHide = new Array ();
    stringsToHide[1] = new Array ("Crowder");
    stringsToHide[2] = new Array ("drury");
    stringsToHide[3] = new Array ("spivalib", "mssu");
    stringsToHide[4] = new Array ("my.otc");
    stringsToHide[5] = new Array ("sbuniv", "SBU");
    stringsToHide[6] = new Array ("missouristate"); 
    stringsToHide[9] = new Array ("gobbc");
    stringsToHide[12] = new Array ("online.forest");
    
    var scopeDropdown = $("#searchscope").val();
    
    var goodStrings = new Array ();
    goodStrings.push(stringsToHide[scopeDropdown]);
    
    delete stringsToHide[scopeDropdown];
    
    var hiddenLinks = new Array ();
	
	if ($("table").is('.bibLinks')){
	    for (var k in goodStrings) {
		for (var l in goodStrings[k]) {
		    if($(".bibLinks").html().indexOf(goodStrings[k]) > -1 ){
			var scopedLinks = true;
		    }
		}
	    }
	    for (var k in stringsToHide) {
		for (var l in stringsToHide[k]) {
		    $(".bibLinks a").each(function(index, element) {
			if($(element).parent().html().indexOf(stringsToHide[k][l]) > -1) {
			    $(element).parent().parent().hide()
			    hiddenLinks.push(element);
			}    
		    });
		}
	    }
	    if (scopedLinks != true && hiddenLinks.length > 0){
		$(".bibLinks").hide();
	    }
	}  
    }
    
    
    $(document).ready(function () {
	hideLinks();
});