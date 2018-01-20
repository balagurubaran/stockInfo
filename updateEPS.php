<?php	
	include("config.php"); 

$stockid=addslashes($_GET['stockid']); 
$actulaEPS=addslashes($_GET['actulaEPS']);
$expectedEPS=addslashes($_GET['expectedEPS']);



if(!$stockid || !$actulaEPS || !$expectedEPS){
	echo('Must fill all field');
	return;
}

$sql = "update StockDetail set avgactualEPS='$actulaEPS', avgexpectedEPS='$expectedEPS' Where stockid='$stockid'";		
	$result = $mysqli->query($sql);
	if($result){		
		echo("Update EPS Success");
	}else{			
		echo("Error in update EPS Record");	

	}

?>
