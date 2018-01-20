<?php   
    include("config.php"); 

    $stockResult = '';
    $stockResult = $mysqli->query('SELECT * FROM portfolio ORDER BY ID');
    $result = [];
    

    if($stockResult){
        while ($obj = mysqli_fetch_object($stockResult)) {
            $data = [];
            $data['stockid'] = $obj->stockid;
            $data['targetPrice'] = $obj->targetPrice;
            $data['boughtPrice'] = $obj->boughtPrice;
            $data['purchaseDate'] = $obj->purchaseDate;
            $data['price'] = $obj->price;
            $data['count'] = $obj->count;
            array_push($result,$data);
        }
       echo json_encode($result);

    }else{
        echo 'failed';
    }
?>
