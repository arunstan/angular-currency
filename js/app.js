	
	var app = angular.module('currencyApp', []);


	function CurrencyService ($http,$q) {

		var currencies = {
			'USD':1,
			'GBP':1.61,
			'INR':0.016
		};

		var apiURL = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.xchange%20where%20pair%20in%20(%22GBPUSD%22%2C%22INRUSD%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback='

		this.getCurrencies = function () {
		
			var deferredCall = $q.defer();

			$http.get(apiURL).success( function(response){

				var rates = response.query.results.rate;
					angular.forEach(rates, function(rate,i){
					  currencies[rate.id.substr(0,3)] = rate.Rate;
				});

				deferredCall.resolve(currencies);	

			}).error(function(e) {
				console.log('Error while fetching currency rates ' +e);
				deferredCall.reject(currencies); //Settle with default values
			});

			return deferredCall.promise;
		}
		
	}


	app.service('CurrencyService',['$http','$q',CurrencyService]);
	
	app.controller('MainCtrl', ['CurrencyService',function(CurrencyService) {

		this.currencyOneValue = 1;
		this.currencyOneCode = 'GBP';
		this.currencyTwoCode = 'USD';
		this.currencies = null;
		this.currencyLastUpdated = null;
		var self = this;

		this.loadCurrencies = function() {

			CurrencyService.getCurrencies().then(function(currencies) {
				self.currencies = currencies;
				self.currencyTwoValue = (self.currencyOneValue * self.currencies[self.currencyOneCode]).toFixed(2);
				self.currencyLastUpdated = new Date();
			}, 
			function(fallbackCurrencies){
				self.currencies = fallbackCurrencies;
				self.currencyLastUpdated = new Date();
			});

		}
		
		this.updateCurrency2 = function() {
			this.currencyTwoValue = (this.currencyOneValue * this.currencies[this.currencyOneCode] / this.currencies[this.currencyTwoCode]).toFixed(2);
		}

		this.updateCurrency1 = function() {
			this.currencyOneValue = (this.currencyTwoValue * this.currencies[this.currencyTwoCode] / this.currencies[this.currencyOneCode]).toFixed(2);
		}

		this.loadCurrencies();
		
	}]);

