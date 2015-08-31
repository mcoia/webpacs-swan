function updateinnReachButton() {
	    searchType = $("#searchtype option:selected").val();
	    searchArg = $("#searcharg").val();

	    if(searchType.match(/t|a|d/)) {
	        innReachArg = searchType + ":(" + searchArg + ")";
	    } 
	    else { 
	            innReachArg = searchArg; 
	    }

	    $("#innReachLink").attr("href", innReachUrl + innReachArg)
	}

    innReachUrl = "http://searchmobius.org/iii/encore/search/C__S";


	$(document).ready(function () {
		$("span:contains(WebPAC PRO)").hide(); //Hide the iii footer

		$('#searchtype').change(function(){
	    	$("#exampleText").load("/screens/" + this.value + ".inc");
		});
		//Changes the search examples
		
		//var selectAny = $('#b option[value=""]')
		//$('#b option:not([value^="z"])').detach(); 
		//selectAny.prependTo("#b")
		//Hides the out-of-scope locations
		innReachButton = "<a id='innReachLink' href=''><span class='button'><img src='/screens/ico_mobius.png' alt=''><span class='buttonText'>Search MOBIUS</span></span></a>";
	        
	    if($(".browseScreen")[0]) {

	        $(".navigationRow a .modifySearch").parent().parent().after(innReachButton); // drop a button that doesn't go anywhere

	        updateinnReachButton(); // Just set the href initially
	            
	        // update the link href if the user changes search types (even if they don't actually submit it)
	        $("#searcharg").change(function() {
	                updateinnReachButton();
	        });
	        $("#searchtype").change(function() {
	                updateinnReachButton();
	        });
	    } else if ($(".bibSearch")[0]) {
	        $("span.moreLike").parent().parent().after(innReachButton); 
	        title = $(".bibInfoLabel:contains('Title')").next().text();
	        // keep stuff before the slash, drop non-alphanumeric
	        tidyTitle = title.split("/", 1).join().replace(/^[.\X]*$/gmi, " ").replace(/\s+/g, " ").trim(); 

	        $("#innReachLink").attr("href", innReachUrl + tidyTitle);
	        }


});