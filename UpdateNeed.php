<?php	
	include("config.php"); 

$stockid=addslashes($_GET['stockid']); 
$category=addslashes($_GET['category']);


if(!$stockid){
	echo('Must fill all field');
	return;
}

$count= 0;

$result = $mysqli->query("SELECT * FROM stockCurrentPrice Where stockid='$stockid' and category='$category'");


if($result){
	while ($obj = mysqli_fetch_object($result)) {
		$timeStamp = new DateTime($obj->lastPriceUpdated);
		$diff  = date_diff($timeStamp, date_create());
		if($diff->i > 15 && $obj->category == 'live'){
			echo 'true';
			return;
		}else if(($diff->h > 5) && $obj->category == 'day'){
			echo 'true';
			return;
		}else if(($diff->d > 5) && $obj->category == 'week'){
			echo 'true';
			return;
		}else{
			echo 'false';
		}
	}
 	        
}

?>
