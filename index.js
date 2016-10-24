var myModule = angular.module("MyApp", [])
	.controller('MyController', function(Utilities){

		var self = this;

		self.onactive = true;
		self.offactive = false;

		self.changeColorIcons = function(button) {
		    if (button === 'on') {
		        self.onactive = true;
		        self.offactive = false;
		    } else if ( button === 'off') {
		        self.onactive = false;
		        self.offactive = true;
		    }
	    };

	    // call service method
		Utilities.getData("data.json").then(function(data) {
		    // assign data after promise resolves
		    self.socialArr = data;
		});

		//tabs
		self.tab = 1;

		self.setTab = function(newTab){
	      	self.tab = newTab;
	    };

		self.isSet = function(tabNum){
	      	return self.tab === tabNum;
	    };
	
}).service('Utilities', function($http) {

	var self = this;

	self.getData = function(jsonData) {
	    // return the promise
	    return $http.get(jsonData).then(function(response) { 
	        return response.data;
	    }, function(response) {
	        //Second function handles error
	        console.log("Error loading JSON data");
	    });
	};

});

