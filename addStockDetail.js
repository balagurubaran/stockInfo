var app = angular.module("addStock", ['ui.router'])
.controller("AddStockController", function($scope,$q,$http,pizzaServices) {
    this.stockID1 = '';
    this.price = '';
    this.companyDes = '';
    this.companyName = '';
    $scope.status = '';
    
    this.login = function(stockid){

        var url = "https://api.iextrading.com/1.0/stock/"+ this.stockID1 + "/price";

        $http.get(url).then(
            function(response) {
                if(response.data !== undefined){
	            var id = document.getElementById("stockID").value;
                    addStock(response.data,id);
                }
            },
            function(response) {
                console.log('Erroer getSpecificStockDetailFromAPI_Current');
                        //walkthroughFactory.setSpecificStockDetailFromAPI({});
                        //defered.reject('error');
                        return [];
            });
    } 
    function addStock(actualPrice,stockIDTemp){
    	
        var url = "https://api.iextrading.com/1.0/stock/"+ stockIDTemp + "/company";

        $http.get(url).then(
            function(response) {
                  if(response.data !== undefined){
                        var companyName = response.data['companyName'];
                        var companydes = response.data['description'];
                        var comments = document.getElementById("comments").value;

                        console.log(comments);
                        var targetPrice = document.getElementById("price").value;

                        var url = "add_update_Stock.php?stockid="+ stockIDTemp  + "&companyname=" +companyName + "&companydes="+companydes+"&targetprice="+targetPrice + "&actualPrice=" + actualPrice + "&comments=" +comments;
                      
                        var defered = $q.defer();
                        $http.get(url).
                            then(
                            function(response) {
				$scope.status = response.data;
                                pizzaServices.getCurrentPrice(stockIDTemp,'quote');
                                pizzaServices.getdividends3M(stockIDTemp);
                                pizzaServices.getSpecificStockDetailFromAPI_Current(stockIDTemp,['TIME_SERIES_DAILY','TIME_SERIES_WEEKLY']);
                                pizzaServices.updateEPS(stockIDTemp)
                            },
                            function(response) {
				$scope.status = "Error in Add record";
                            });
                  }
            },
            function(response) {
                console.log('Erroer getSpecificStockDetailFromAPI_Current');
                        //walkthroughFactory.setSpecificStockDetailFromAPI({});
                        //defered.reject('error');
                        return [];
            });
    }
});