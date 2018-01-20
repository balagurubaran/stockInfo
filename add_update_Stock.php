<?php	
	include("config.php"); 

$stockid=addslashes($_GET['stockid']); 
$companyname=addslashes($_GET['companyname']); 
$companydes=addslashes($_GET['companydes']); 
$targetprice=addslashes($_GET['targetprice']); 
$actualPrice=addslashes($_GET['actualPrice']);
$comments=addslashes($_GET['comments']); 

if(!$stockid || !$companyname || !$companydes || !$targetprice){
	return;
}
$count= 0;
$result = $mysqli->query("SELECT * FROM StockDetail Where stockid='$stockid'");


if($result){

	$row = mysqli_fetch_array($result,MYSQLI_NUM); 
	$count = mysqli_num_rows($result);
}
     

if($count == 1){
	$sql = "update StockDetail set targetprice='$targetprice', Comments='$comments' Where stockid='$stockid'";		

	$result = $mysqli->query($sql);
	if($result){		
		echo("Stock detail updated");
	}else{			
		echo("Error in update Record");	

	}	
}
else {
		$sql ="INSERT INTO StockDetail (stockid,stockName,companyDescription,targetprice,actualPrice,addedstockDate,Comments) 		VALUES('$stockid','$companyname','$companydes','$targetprice','$actualPrice',DATE(NOW()),'$comments')";
		
			
 			
 		
		$result = $mysqli->query($sql);
			
		if($result){		
			echo("Stock detail added");
			
		}else{			
			echo("Error in add Record");	
			
			}	
}

?>
