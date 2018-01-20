<?php	
	include("config.php"); 

$stockid=addslashes($_GET['stockid']); 
$low=addslashes($_GET['low']); 
$high=addslashes($_GET['high']); 
$price=addslashes($_GET['price']); 
$category=addslashes($_GET['category']);
$open=addslashes($_GET['open']); 

if(!$stockid || !$low || !$high || !$price){
	echo('Must fill all field');
	return;
}

$count= 0;

$result = $mysqli->query("SELECT * FROM stockCurrentPrice Where stockid='$stockid' and category='$category'");


if($result){

	$row = mysqli_fetch_array($result,MYSQLI_NUM); 
	$count = mysqli_num_rows($result);
}
     

if($count == 1){
	$sql = "update stockCurrentPrice set stockid='$stockid',low='$low',high='$high',price='$price',open='$open',lastPriceUpdated=now() Where stockid='$stockid' and category='$category'";		
	$result = $mysqli->query($sql);
	if($result){		
		echo("Update Success");
	}else{			
		echo("Error in update Record");	

	}	
}
else 
{ 	
 		$sql ="INSERT INTO stockCurrentPrice (stockid,low,high,price,category,open,lastPriceUpdated) VALUES('$stockid','$low','$high','$price','$category','$open',now())";	
 		
		$result = $mysqli->query($sql);
			
		if($result){		
			echo("Stock detail added");
			
		}else{			
			echo("Error in add Record");	
			
			}	
}

?>
