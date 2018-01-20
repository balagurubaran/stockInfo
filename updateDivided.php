<?php	
	include("config.php"); 

$stockid=addslashes($_GET['stockid']); 
$date=addslashes($_GET['date']); 
$amount=addslashes($_GET['amount']); 



if(!$stockid || !$date || !$amount){
	echo('Must fill all field');
	return;
}

$sql = "update StockDetail set lastdivdate='$date',lastdivprice='$amount' Where stockid='$stockid'";		
	$result = $mysqli->query($sql);
	if($result){		
		echo("Update Success");
	}else{			
		echo("Error in update Record");	

	}	

?>
