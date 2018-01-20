
<?php
    header("Access-Control-Allow-Origin: *");
?>
<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, shrink-to-fit=no, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
</head>

<body  ng-app="stock" data-ng-controller="StockController as mainCtrl">

   
  
    <!-- angualr JA -->
    <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.3.14/angular.min.js"></script>
    <!-- <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.3.14/angular-route.js"></script> -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.3.2/angular-ui-router.min.js"></script>



    <!-- ProjectJS files -->
        <script src="weekly_monthly.js"></script>
        <script src="js/Services/PizzaServices.js"></script>
</body>

</html>
