<?PHP

//Function to go out and grab the html of a specified URL
//You must have curl enabled on your server for this to work
function get_url_contents($url){
	$crl = curl_init();
	$timeout = 30;
	curl_setopt ($crl, CURLOPT_URL,$url);
	curl_setopt ($crl, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt ($crl, CURLOPT_CONNECTTIMEOUT, $timeout);
	$ret = curl_exec($crl);
	curl_close($crl);
	return $ret;
}

//form variables
$phoneNumber 	= trim($_GET['number']);
$provider 		= trim($_GET['provider']);
$bib 			= trim($_GET['bib']);

$item 			= $_GET['item']; //parse the item
$itemArray 		= explode("|", $item);
$location 		= trim($itemArray[0]);

//strip strange characters not handled by Safari from location
$location 		= preg_replace('/[^A-Za-z0-9\-_\.\s]/', "", $location);
$location 		= trim($location);

$callNumber 	= trim($itemArray[1]);
$item 			= "\nLoc: ".$location."\nCall: ".$callNumber;
//echo "document.write('Debug: ".$location." ".$callNumber."');";

//Change this url to your own catalog
$url = "http://swan.searchmobius.org/record=".$bib;

//Use the bib number to get the title information for the item from the catalog
$catalogItemPage = get_url_contents($url);
preg_match('/fieldtag=t(.*)fieldtag=p/s', $catalogItemPage, $matches); //get the right secton of code
preg_match('/<strong>([^:]*).*<\/strong>/s', $matches[1], $matches2); //grab the title text before the colon
$title = trim($matches2[1]);

//verify that the call number and location are listed on the page for extra security
if(!strstr($catalogItemPage, $callNumber) || !strstr($catalogItemPage, $location)){
	echo "alert('There was a problem. Message not sent!');";
	exit;
}

//defined variables. Set the from address and subject as desired
$fromAddress 	= 'NoReply@swan.searchmobius.org';

$providers = array(	'cingular' 	=> '@mobile.mycingular.com',
             		'tmobile' 	=> '@tmomail.net',
             		'virgin' 	=> '@vmobl.com',
             		'sprint' 	=> '@messaging.sprintpcs.com',
             		'nextel' 	=> '@messaging.nextel.com',
             		'verizon'	=> '@vtext.com',
			'northwest'     => '@mynwmcell.com',
			'cricket'	=> '@mms.mycricket.com',
			'qwest'		=> '@qwestmp.com',
			'uscellular'    => '@email.uscc.net');

//remove any non-numeric characters from the phone number
$number = preg_replace('/[^\d]/', '', $phoneNumber);

if(strlen($phoneNumber) == 10) { //does the phone have 10 digits

	if($providers[$provider]){ //is the provider valid


		
		//Format the email.
		$toAddress = $number.$providers[$provider];
		$body = "$item \nTitle: $title";

		//send the email
		mail($toAddress, $subject, $body, "From: $fromAddress");
		
		echo "alert('Message sent!');";
		echo "clearsms();";
		exit;
	}
}

echo "alert('Problem found. Message not sent!');";

?>
