$(document).ready(function(){
    
    var all_links = [];
    $(".bibDisplayUrls").find("a").each(function(){
        all_links.push($(this).html + "_!!!!_" + $(this).prop("href"));
    });
    
    all_links.sort(function (a, b) {
        return a.toLowerCase().localeCompare(b.toLowerCase());
    });
    
    var sorted_table = "<tbody><tr><th>Connect to</th></tr>";
    var i;
    for (i = 0; i < all_links.length; i++) {
        var splits = all_links[i].split("_!!!!_");
        sorted_table+="<tr align=\"center\">\n<td><a href=\"" + splits[1] + "\">" + splits[0] + "<\a><br></td></tr>\n";
    } 
    sorted_table+="<\tbody>\n";
    
    $(".bibDisplayUrls table").html(sorted_table);


});