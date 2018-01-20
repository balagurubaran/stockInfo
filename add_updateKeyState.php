<?php	
	include("config.php"); 

$stockid=addslashes($_GET['stockid']); 
$weeklow_52=addslashes($_GET['weeklow_52']); 


if(!$stockid || !$weeklow_52 ){
	echo('Must fill all field');
	return;
}

$sql = "update StockDetail set weeklow52='$weeklow_52' Where stockid='$stockid'";		
	$result = $mysqli->query($sql);
	if($result){		
		echo("Updated Key State");
	}else{			
		echo("Error in Key State");	

	}	

?>
