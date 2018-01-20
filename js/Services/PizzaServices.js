app.service('pizzaServices', function($q, $http) {

    this.getCurrentPrice = function(stockid,timePeriod){
        updatedNeeded(stockid,'live').then(
            function(response) {
               var url = "https://api.iextrading.com/1.0/stock/"+ stockid + "/" + timePeriod;
        
                    $http.get(url).then(
                    function(response) {
                    if(response.data['latestPrice']){
                        add_update_current_price(stockid,response.data['open'],response.data['low'], response.data['high'], response.data['latestPrice'], 'live');
                    }
                },
                    function(response) {
                        console.log('Error UpdateCurrent price')
                        //walkthroughFactory.setSpecificStockDetailFromAPI({});
                        //defered.reject('error');
                    }
                );
            },
            function(response) {
            }
        );
    },


     this.getdividends3M = function(stockid){
     		updatedNeeded(stockid,'day').then(
            	function(response) {
               	
                },
                    function(response) {
                        console.log('getdividends3M is uptodate');
                        return;
                    }
                );
        var url = "https://api.iextrading.com/1.0/stock/"+ stockid + "/dividends/3M";

        $http.get(url).then(
            function(response) {
                  if(response.data[0] !== undefined  && response.data[0]['exDate']){
                        var date = response.data[0]['exDate'];
                        var amount = response.data[0]['amount'];
                        var url = "updateDivided.php?stockid="+stockid + "&date=" + date + "&amount=" + amount; 
                        var defered = $q.defer();
                        $http.get(url).
                            then(
                            function(response) {
                                console.log('success updateDivided');
                            },
                            function(response) {
                                console.log('Error updateDivided');
                            });
                  }
            },
            function(response) {
                console.log('Erroer getdividends3M');
                        //walkthroughFactory.setSpecificStockDetailFromAPI({});
                        //defered.reject('error');
                        return [];
            });
    },
    
    this.getEarnings = function(stockid){
    		updatedNeeded(stockid,'day').then(
            	function(response) {
               	
                },
                    function(response) {
                        console.log('week52low is uptodate');
                        return;
                    }
                );
                
        var url = "https://api.iextrading.com/1.0/stock/"+ stockid + "/stats";

        $http.get(url).then(
            function(response) {
                  if(response.data['week52low']){
                        add_update_keystate(stockid,response.data['week52low']);
                  }
            },
            function(response) {
                console.log('Error getEarnings');
                        //walkthroughFactory.setSpecificStockDetailFromAPI({});
                        //defered.reject('error');
                }
            );
    },
    
    this.updateDayOpenClose = function(stockid){

        var url = "https://api.iextrading.com/1.0/stock/" + stockid + "/open-close";
        $http.get(url).then(
            function(response) {
                openDic = response.data['open'];
                closeDic = response.data['close'];
                add_update_current_price(stockid,openDic['price'],response.data['low'], response.data['high'], closeDic['price'], 'day');
        },
        function(response) {
            console.log('Erroer updateDayOpenClose');
        }
        );
    },


    this.getSpecificStockDetailFromAPI_Current = function(stockid,timeFrameArray) {
            //var defered = $q.defer();
            //var timeFrameArray = ['TIME_SERIES_INTRADAY', 'TIME_SERIES_WEEKLY', 'TIME_SERIES_MONTHLY'];
              updatedNeeded(stockid,timeFrameArray).then(
            	function(response) {
               	    for (let index in timeFrameArray) {
            
                var url = "https://www.alphavantage.co/query?function=" + timeFrameArray[index] + "&symbol=" + stockid + "&apikey=N7153D7N23Z8J6GV";

                if(timeFrameArray[index] === 'TIME_SERIES_INTRADAY'){
                    url = "https://www.alphavantage.co/query?function=" + timeFrameArray[index] + "&symbol=" + stockid + "&interval=1min&apikey=N7153D7N23Z8J6GV&outputsize=compact";
                }


                $http.get(url).then(
                    function(response) {
                        // walkthroughFactory.setSpecificStockDetailFromAPI(response.data);
                        for (var key in response.data) {
                            if (key === 'Time Series (1min)' || key === 'Weekly Time Series' || key === 'Monthly Time Series' || key === 'Time Series (Daily)') {
                                let min = response.data[key];
                                if (Object.values(min)[0] !== null && Object.values(min)[0] !== undefined) {
                                    let x = Object.values(min)[0]
                                    let stockArray = Object.values(x)

                                    var category = 'live';
                                    if (timeFrameArray[index] === 'TIME_SERIES_WEEKLY') {
                                        category = 'week';
                                    } else if (timeFrameArray[index] === 'TIME_SERIES_MONTHLY') {
                                        category = 'month';
                                    }else if(timeFrameArray[index] === 'TIME_SERIES_DAILY'){
                                        category = 'day';
                                    }
                                    add_update_current_price(stockid,stockArray[0],stockArray[2], stockArray[1], stockArray[3], category);

                                }
                            }
                        }
                    },
                    function(response) {
                        console.log('Error getSpecificStockDetailFromAPI_Current');
                        //defered.reject('error');
                    }
                );
            }
                },
                function(response) {
                    console.log('uptodate');
                    return;
                }
            );
        },

        this.allStockEntry = function() {
            var url = "getStockDetail.php?allStockEntryAlone=true";

            var defered = $q.defer();
            $http.get(url).
            then(
                function(response) {
                    defered.resolve(response.data);
                },
                function(response) {
                    defered.reject('error');
                }
            );
            return defered.promise;
        },

        this.updateEPS = function(stockid){
        var url = "https://api.iextrading.com/1.0/stock/"+ stockid + "/earnings";

        $http.get(url).then(
            function(response) {
                var actulaEPS = 0.0;
                var expectedEPS = 0.0; 
                var count = 0;
                if(response.data['earnings'] !== undefined && stockid !== undefined){
                    response.data['earnings'].forEach(function(element) {
                    	actulaEPS = actulaEPS + element['actualEPS'];
                    	expectedEPS = expectedEPS + element['estimatedEPS'];
                    	count = count+1;
                    });
                    if(count > 2){
                    	actulaEPS = actulaEPS / count;
                    }
                    if(count > 2){
                    	expectedEPS = expectedEPS / count;
                    }
                   var url = "updateEPS.php?stockid="+ stockid + "&expectedEPS="+ expectedEPS + "&actulaEPS=" + actulaEPS;
                        var defered = $q.defer();
                        $http.get(url).
                            then(
                            function(response) {
                                console.log('success updateEPS');
                            },
                            function(response) {
                                console.log('Error updateDivided');
                            });
               }

            },
            function(response) {
                console.log('Error get EPS iextrading');
            });
    }
       

   function updateCurrentPrice_Portfolio(stockid,amount){
        var url = "updatePortfolio_currentprice.php";
        url = url + "?stockid=" + stockid + "&amount=" + amount;
    
        var defered = $q.defer();
        $http.get(url).
        then(
            function(response) {
                console.log('success updateCurrentPrice_Portfolio');
                defered.resolve('success updateCurrentPrice_Portfolio');

            },
            function(response) {
                console.log('error updateCurrentPrice_Portfolio');
                defered.reject('error updateCurrentPrice_Portfolio');
            }
        );
        return defered.promise;
    }
    
    function add_update_keystate(stockid,weeklow_52){
         //console.log(stockid, low, high, price,category);
        //var url = "http://itunes.apple.com/lookup?id="+appleID;
        var url = "add_updateKeyState.php";
        url = url + "?stockid=" + stockid + "&weeklow_52=" + weeklow_52;

    
        var defered = $q.defer();
        $http.get(url).
        then(
            function(response) {
                console.log('success keyState');
                defered.resolve('success keyState');

            },
            function(response) {
                console.log('error keyState');
                defered.reject('error keyState');
            }
        );
        return defered.promise;
    }

    function add_update_current_price(stockid,open, low, high, price, category) {
    
    updatedNeeded(stockid,category).then(
            function(response) {

        //console.log(stockid, low, high, price,category);
        //var url = "http://itunes.apple.com/lookup?id="+appleID;
        var url = "add_updateCurrentPrice.php";
        url = url + "?stockid=" + stockid + "&low=" + low + "&open=" + open + "&high=" + high + "&price=" + price + "&category=" + category;

    
        var defered = $q.defer();
        $http.get(url).
        then(
            function(response) {
                console.log(stockid + ' success '+ category +' add_update_current_price');
                defered.resolve('success add_update_current_price');

            },
            function(response) {
                console.log(stockid + ' failed '+ category +' add_update_current_price');
                defered.reject('error add_update_current_price');
            }
        );
        return defered.promise;
        },
            function(response) {
                console.log(category +' UPTODATE');
                
            }
        );
    }

   function updatedNeeded(stockid,category){
        var url = "UpdateNeed.php";
        url = url + "?stockid=" + stockid + "&category=" + category;
    
        var defered = $q.defer();
        $http.get(url).
        then(
            function(response) {
                
                if(response.data.includes('true')){
                    defered.resolve('success');
                }else{
                    defered.reject('failed');
                }
            },
            function(response) {
                defered.reject('failed');
            }
        );
        return defered.promise;
    }
}); 