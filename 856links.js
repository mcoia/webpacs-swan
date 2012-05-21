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
    
    delete stringsToHide[scopeDropdown];
	
    if ($("table").is('.bibLinks')){
	for (var k in stringsToHide) {
	    for (var l in stringsToHide[k]) {
		$(".bibLinks a").each(function(index, element) {
		    if($(element).parent().html().indexOf(stringsToHide[k][l]) > -1) {
			$(element).parent().parent().hide()
		    }    
		});
	    }
	}
	if ($(".bibLinks tr[style*=none]").length < $(".bibLinks a").length){
	    $(".bibLinks").show();       
	}
    }  
}
    
    
    $(document).ready(function () {
	hideLinks();
});