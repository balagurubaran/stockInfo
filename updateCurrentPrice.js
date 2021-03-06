var app = angular.module("stock", ['ui.router']);
app.controller("StockController", function($scope,pizzaServices) {
    pizzaServices.allStockEntry().then(
                function(data) {                    
                    for (var eachStock in data) {
                        let eachStock1 = data[eachStock];
                        for (var key in eachStock1) {
                            if (key === 'stockid') {
                                let stockID = eachStock1[key];
                                pizzaServices.getCurrentPrice(stockID,'quote');
                            }
                        }

                    }
                },
                function() {
                    console.log('failed intraday');
                }
            );
});