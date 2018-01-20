var app = angular.module("epsstock", ['ui.router']);
app.controller("EPSController", function($scope,pizzaServices) {
    pizzaServices.allStockEntry().then(
                function(data) {                    
                    for (var eachStock in data) {
                        let eachStock1 = data[eachStock];
                        for (var key in eachStock1) {
                            if (key === 'stockid') {
                                let stockID = eachStock1[key];
                                pizzaServices.updateEPS(stockID);
                            }
                        }

                    }
                },
                function() {
                    console.log('failed weekly_monthly');
                }
            );
})