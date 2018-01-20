<?php   
    include("config.php"); 

    $allStockEntryAlone=addslashes($_GET['allStockEntryAlone']);
    if(!$allStockEntryAlone){
        $stockID=addslashes($_GET['stockid']);
        $issub=addslashes($_GET['issub']);
        $iswatchList=addslashes($_GET['iswatchList']);
    }
    $stockResult = '';
    if(!empty($stockID)){
        $stockResult = $mysqli->query("SELECT * FROM StockDetail where stockid = '$stockID'");
    }else{
        $stockResult = $mysqli->query('SELECT * FROM StockDetail ORDER BY ID DESC LIMIT 50');
    }
    
    
     $result = [];
    

    if($stockResult){
         while ($obj = mysqli_fetch_object($stockResult)) {
            $data = [];
                $isBoolean = true;
            if($allStockEntryAlone == 'false'){
                $data = getStockPriceDetail($obj->stockid,$mysqli);
                if(count($data) < 3){
                    $isBoolean = false;
                }
                
                $data['targetprice'] = $obj->targetprice;
                if($data['live']){
                    $data['targetprecentage'] = (($obj->targetprice-$data['live']['price'])/$data['live']['price'])*100;
                }
                $data['lastdivdate'] = $obj->lastdivdate;
                $data['lastDivamount'] = $obj->lastdivprice;

                $data['avgExpectedEPS'] = $obj->avgexpectedEPS;
                $data['avgActualEPS'] = $obj->avgactualEPS;
                $data['weeklow_52'] = $obj-> weeklow52;
                $data['comments'] = $obj->Comments;
		$data['actualPrice'] = $obj->actualPrice;
 		$data['addedstockDate'] = $obj->addedstockDate;
 		
 		if($obj->targetreacheddate == '0001-01-01'){
 			$data['isTargetReached'] = false;
 		}else{
 			$data['isTargetReached'] = true;
 		}
 		

 		if($data['live']['price']  >$data['targetprice'] ){
 			$sql = "update StockDetail set targetreacheddate=DATE(NOW()) Where stockid = '$obj->stockid'";		
			$SQLresult = $mysqli->query($sql);
			if($SQLresult){		
			  $data['isTargetReached'] = true;
			}
			
 		}
            }
            $data['stockid'] = $obj->stockid;
            $data['stockname'] = $obj->stockName;
            $data['companyDescription'] = $obj->companyDescription;
	    

            if($isBoolean){

                if($allStockEntryAlone == 'false' && $issub == 'false' && $iswatchList == 'false'){
                     if($data['targetprecentage'] < 15.0){
                	array_push($result,$data);
                     }
                }else{
                	array_push($result,$data);
                }
            }
        } 
             echo json_encode($result);

    }else{
        echo 'failed';
    }

    function getStockPriceDetail($stockid,$mysqli){
        $array = ['day','week','month','live'];
        $eachpriceCategory = [];
        foreach($array as $category) {
            $currentResult = $mysqli->query("SELECT * FROM stockCurrentPrice where category = '$category' and stockid = '$stockid'");

            if($currentResult){
             while ($obj = mysqli_fetch_assoc($currentResult)) {
                unset($obj['stockid']);
                unset($obj['category']);
                $eachpriceCategory[$category] = $obj ;
             }
    
            }
        }
        return $eachpriceCategory;
    }
    
    


?>
