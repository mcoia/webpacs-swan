//Created 11/1/2011 by Josh Welker at Southwest Baptist University

//The following code will get book information from Google Books and display it in the 
//webpac in an item record based on the ISBN of the book. 
//Requires jquery.
//Requires a Google account and a unique API key (see https://code.google.com/apis/console)


//main function that is executed on page load
$(document).ready(function(){
	var ISBN = getISBN();//get book isbn
	
	if(ISBN!="" && ISBN) //proceed if there is an ISBN that is not an empty string
	{
		var jsonURI = makeURI(ISBN);//make google books api URI based on book isbn
		getJSON(jsonURI);//get JSON data, parse, and insert into document
	}
	else //load a "no information" message if ISBN is not found.
	{
		parsetohtml(0,0)
	}
	
});


//get ISBN of book based on OPAC display
function getISBN(isbnType)
{
	//the following code will convert between ISBN 10 and 13 based on the isbnType parameter.
	//If no param is specified, it will give whatever is listed in the bib record.
	if(isbnType==10)
	{
		var ISBN = $(".bibInfoLabel:contains('ISBN')").siblings(".bibInfoData").text();
		//remove non-numerical characters
		ISBN = ISBN.replace(/[^0123456789]/g,"")
		
		if(ISBN.length==10)
		{
			return ISBN;
		}
		else if(ISBN.length==13)
		{
			var isbnDigits = new Array();
			isbnDigits = (ISBN.substr(3,9).split(""));
			
			//convert the digits from strings to integer types
			for(var i=0;i<isbnDigits.length;i++)
			{
				isbnDigits[i] = parseInt(isbnDigits[i]);
			}
			
			//find the check digit based on formula
			var checkDigitSum = 0;
			var counter;
			for(var i=0;i<isbnDigits.length;i++)
			{
				counter = 10-i;
				checkDigitSum += isbnDigits[i]*counter;
			}
			var checkDigit = 11-(checkDigitSum%11);
			if(checkDigit==10)
			{
				checkDigit = "x";
			}

			
			var convertedISBN = isbnDigits.join("");
			convertedISBN += checkDigit;
			return convertedISBN;
		}
	}
	else if(isbnType==13)
	{
		var ISBN = $(".bibInfoLabel:contains('ISBN')").siblings(".bibInfoData").text();
		//remove non-numerical characters
		ISBN = ISBN.replace(/[^0123456789]/g,"")

		if(ISBN.length==10)
		{	
			var isbnDigits = new Array();
			isbnDigits = ISBN.split("");
			//convert the digits from strings to integer types
			for(var i=0;i<isbnDigits.length;i++)
			{
				isbnDigits[i] = parseInt(isbnDigits[i]);
			}
			//find the check digit based on formula
			var checkDigitSum = 0;
			for(var i=0;i<isbnDigits.length;i++)
			{
				if(i%2==1)
				{
					checkDigitSum += isbnDigits[i]*1;
				}
				else if(i%2==0)
				{
					checkDigitSum += isbnDigits[i]*3;
				}
			}
			var checkDigit = 10-(checkDigitSum%10);
			var convertedISBN = isbnDigits.join("");
			convertedISBN += checkDigit;
			return convertedISBN;
		}
		else if(ISBN.length==13)
		{
			return ISBN;
		}
	}
	else
	{
		var ISBN = $(".bibInfoLabel:contains('ISBN')").siblings(".bibInfoData").text();
		//remove non-numerical characters
		ISBN = ISBN.replace(/[^0123456789]/g,"")
		return ISBN;
	}
	
}


function makeURI(ISBN)
{
	//get API key from https://code.google.com/apis/console/. Log in and use the API Access
	//page.
	var APIKey = "AIzaSyCR9pmfAiXkg7Ww93rJztDxyB55V1V09Ms";
	var baseURI = "https://www.googleapis.com/books/v1/volumes?q=isbn:";
	
	//put it all together
	var jsonURI = baseURI + ISBN + "&key=" + APIKey + "&callback=?";

	return jsonURI;
}
		
function getJSON(jsonURI)
{
	
	$.ajax({
	url:jsonURI, 
	dataType:"jsonp",
	success:function(json){
		
		var bookData = new Array();
		if(json.items != undefined)
		{
		//Try getting the following data items from the json file. If not available,
		//pass an empty string or 0 based on what is required.
			try{bookData.push(json.items[0].volumeInfo.title)}
				catch(jsonempty){bookData.push("")};
			try{bookData.push(json.items[0].volumeInfo.authors)}
				catch(jsonempty){bookData.push("")};
			try{bookData.push(json.items[0].volumeInfo.publishedDate)}
				catch(jsonempty){bookData.push("")};
			try{bookData.push(json.items[0].volumeInfo.averageRating)}
				catch(jsonempty){bookData.push("")};
			try{bookData.push(json.items[0].volumeInfo.ratingsCount)}
				catch(jsonempty){bookData.push(0)};
			try{bookData.push(json.items[0].volumeInfo.imageLinks.smallThumbnail)}
				catch(jsonempty){bookData.push("")};
			try{bookData.push(json.items[0].volumeInfo.imageLinks.thumbnail)}
				catch(jsonempty){bookData.push("")};
			try{bookData.push(json.items[0].volumeInfo.previewLink)}
				catch(jsonempty){bookData.push("")};
			try{bookData.push(json.items[0].volumeInfo.infoLink)}
				catch(jsonempty){bookData.push("")};
			try{bookData.push(json.items[0].volumeInfo.description)}
				catch(jsonempty){bookData.push("")};
			try{bookData.push(json.items[0].id)}
				catch(jsonempty){bookData.push("")};
				
			
			parsetohtml(bookData,1);
		}
		
		else
		{
			parsetohtml(0,0)
		}
		
		},
	error:function(){
		
		parsetohtml(0,0)
	}
});
}

function parsetohtml(bookData,isbnExists)
{
	if(isbnExists==1)
	{
		var Title = bookData[0];
		if(Title == undefined)
			{Title="Untitled"}
		var Author = bookData[1].join(", ");
		if(Author == undefined)
			{Author="Unknown author"}
		var PublishedDate = bookData[2].substr(0,4);
		if(PublishedDate == undefined)
			{PublishedDate="Publish date unknown"}
		var AverageRating = bookData[3];
		if(AverageRating == undefined)
			{AverageRating=0}
		var RatingsCount = bookData[4];
		if(RatingsCount == undefined)
			{RatingsCount=0}
		var SmallThumb = bookData[5];
		var Thumb = bookData[6];
		if(Thumb=="" || !Thumb)
			{Thumb="/screens/no-image.gif"}
		var PreviewLink = bookData[7];
		var InfoLink = bookData[8];
		var Description = bookData[9];
		if(Description == undefined || Description == "")
			{Description="none"}
		var ID = bookData[10];
		var amazonLink = "http://www.amazon.com/o/ASIN/"+getISBN(10);
		
		var ratingSpriteLocationY = parseInt(AverageRating) * 42;
		
		var bookinfoHTML = 
			'<div id="google-books">' +
				'<div id="float-box">' +
					'<div class="thumb"><a href="http://books.google.com/books?id='+ID+'"><img src="' + Thumb + '" alt=""/></a></div>' +
					'<div class="averageRating" title="Average Rating: '+AverageRating+' of 5"><a style="background-position:0px -'+ratingSpriteLocationY+'px;" href="http://books.google.com/books?id='+ID+'&sitesec=reviews"></a></div>' +
					'<div class="ratingsCount"><a href="http://books.google.com/books?id='+ID+'&sitesec=reviews">' + RatingsCount + ' Ratings</a></div>' +
				'</div>' + 
				'<div id="infobox">' +
					'<div class="title">' + Title + '</div>' +
					'<div class="author">' + Author + '</div>' +
					'<div class="publishedDate">' + PublishedDate + '</div>' +
					'<div class="description"><b>Description</b>: ' + Description + '</div>' +
					'<div class="infoLink">' +
						'<div><a target="_blank" href="' + InfoLink + '">View on Google Books</a></div>' +
						'<div><a target="_blank" href="' + amazonLink + '">View on Amazon</a></div>' +
					'</div>' +
					'<div class="previewLink"><a href="'+PreviewLink+'"><img src="/screens/google-preview.gif" alt="Google Preview" /></a></div>' +
				'</div>' +
			'</div>';
	
		inserthtml(bookinfoHTML);
	}
	else
	{
	
		var title = getTitle();
		var author = getAuthor();
		var googleBooksURL = "https://www.google.com/search?q="+title+"+inauthor:"+author+"&btnG=Search+Books&tbm=bks&tbo=1";
		var amazonURL = "http://www.amazon.com/s?url=search-alias%3Daps&field-keywords="+title+"+"+author;

		
		var noinfoHTML = 
			'<div id="google-books">' +
				'<div id="float-box">' +
					'<div class="thumb"><img src="/screens/no-image.gif" /></div>' +
				'</div>' + 
				'<div id="infobox">' +
					'<div class="message">' +
						'No information is available for this item.' +
					'</div>' +
					'<div class="infoLink">' +
						'<div id="search-google-books"><a target="_blank" href="'+googleBooksURL+'">Search Google Books</a></div>' +
						'<div id="search-amazon"><a target="_blank" href="'+amazonURL+'">Search Amazon</a></div>' +
					'</div>' +
				'</div>' +
			'</div>';
			
		inserthtml(noinfoHTML);
			
	}
}

function inserthtml(htmlstring)
{

	$(".bibDetail:last").css("width","60%");
	$(".bibDetail:last").before(htmlstring);
}

function getTitle()
{
	var title = $(".bibInfoLabel:contains('Title')").siblings(".bibInfoData").text();
	
	if(title.indexOf("/") != -1)
	{
	title = title.substr(0,title.indexOf("/"));
	}
	
	if(title.indexOf("[") != -1)
	{
	title = title.substr(0,title.indexOf("["));
	}

	title = encodeURIComponent(title);
	
	return title;
}

function getAuthor()
{
	var author = $(".bibInfoLabel:contains('Title')").siblings(".bibInfoData").text();
	if(author.indexOf("/") != -1)
	{
		author = author.substr(author.indexOf("/")+1);
		if(author.charAt(0)==" ")
		{
			author=author.substr(1);
		}
		author = encodeURIComponent(author)

		return author;
	}
	else
	{
		return "";
	}
}

function searchAmazon()
{
	var title = getTitle();
	var author = getAuthor();
	var amazonURL = "http://www.amazon.com/s?url=search-alias%3Daps&field-keywords="+title+"+"+author;

	window.open(amazonURL);
}

function searchGoogleBooks()
{
	var title = getTitle();
	var author = getAuthor();
	var googleBooksURL = "https://www.google.com/search?q="+title+"+inauthor:"+author+"&btnG=Search+Books&tbm=bks&tbo=1";

	window.open(googleBooksURL);
}
