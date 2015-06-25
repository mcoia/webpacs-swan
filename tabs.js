$.extend({
  getUrlVars: function(){
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
      hash = hashes[i].split('=');
      vars.push(hash[0]);
      vars[hash[0]] = hash[1];
    }
    return vars;
  },
  getUrlVar: function(name){
    return $.getUrlVars()[name];
  }
});

function change_tab(tabId) {
	$(".searchtype").val(tabId);
	$("#tabList li").css("background-color", "#F1F4EB");
	$("#tabList #" + tabId).css("background-color", "#DFE6D4");
	$("#exampleText").load("/screens/" + tabId + ".inc");
	if (tabId == "X"){
	  $('.X.innerTabForm').show();
	  $('.otherIndexes.innerTabForm').hide();
	}else{
	  $('.otherIndexes.innerTabForm').show();
	  $('.X.innerTabForm').hide();
	}
	$
}

function front_tabs(){
	
  if ($.getUrlVar('searchindex')) {
	  var tabId = $.getUrlVar('searchindex');
	  change_tab(tabId);
  }
  $("#tabList li").click(function () {
	  var tabId = $(this).attr('id');
	  change_tab(tabId);
      });
  $("#otherSearches li").click(function () {
	  var tabId = $(this).attr('id');
	  change_tab(tabId);
      });
  $('.searchtype').change(function(){
	  var tabId = $(this).val()
	  change_tab(tabId);
      }); 

}

$(document).ready(function () {
    var tabId = $('.searchtype').val();
    $("#tabList #" + tabId).css("background-color", "#DFE6D4");
  if (tabId == "X"){
    $('.X.innerTabForm').show();
    $('.otherIndexes.innerTabForm').hide();
  }else{
    $('.otherIndexes.innerTabForm').show();
    $('.X.innerTabForm').hide();
  }
    front_tabs();
});