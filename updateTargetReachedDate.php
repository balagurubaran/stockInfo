
<?php	
	include("config.php"); 


$sql = "update StockDetail set lastdivdate=DATE(NOW()), Where stockid='$stockid'";		
	$result = $mysqli->query($sql);
	if($result){		
		echo("Update Success");
	}else{			
		echo("Error in update Record");	

	}	

?>

