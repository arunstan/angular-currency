angular.module('currencyApp', [])
	.controller('MainCtrl', [function() {

		this.currencyOneValue = 1;
		this.currencyOneCode = 'GBP';
		this.currencyTwoCode = 'USD';

		
		this.currencies = {
			'USD':1,
			'GBP':1.61,
			'INR':0.016
		};

		this.currencyTwoValue = (this.currencyOneValue * this.currencies[this.currencyOneCode]).toFixed(2);

		this.updateCurrency2 = function() {
			this.currencyTwoValue = (this.currencyOneValue * this.currencies[this.currencyOneCode] / this.currencies[this.currencyTwoCode]).toFixed(2);
		}

		this.updateCurrency1 = function() {
			this.currencyOneValue = (this.currencyTwoValue * this.currencies[this.currencyTwoCode] / this.currencies[this.currencyOneCode]).toFixed(2);
		}
		

	}]);