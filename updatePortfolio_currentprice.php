<?php	
	include("config.php"); 

$stockid=addslashes($_GET['stockid']); 
$amount=addslashes($_GET['amount']); 



if(!$stockid || !$amount){
	echo('Must fill all field');
	return;
}

$sql = "update portfolio set price='$amount' Where stockid='$stockid'";		
	$result = $mysqli->query($sql);
	if($result){		
		echo("Update Success");
	}else{			
		echo("Error in update Record");	

	}	

?>
