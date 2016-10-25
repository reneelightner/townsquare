var myModule = angular.module("MyApp", [])
	.controller('MyController', function(UseHttp){

		// store reference of "this"
		var self = this;

	    // call service method for http request
		UseHttp.request("data.json").then(function(data) {
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

	    //toggle buttons for colored/bw social icons
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


	    //callback for successful URL check that it exists, used in self.checkValid
	    var callback = function(workingURL, index){
	    	//assign the working url to the array of social media info
	    	self.socialArr[index].fullURL = workingURL;
	    };

	    //method to check if Social URL is valid
	    self.checkValid = function(index, enteredText){
	    	var protocol = 'http://';
	    	var socialSite = self.socialArr[index].url;
	    	var fullURLtoCheck = (self.socialArr[index].label === "Tumblr") ? protocol+enteredText+socialSite : protocol+socialSite+enteredText;
		    UseHttp.urlExists(fullURLtoCheck, callback, index);
	    }
	
	}).service('UseHttp', function($http) {

		var self = this;

		self.request = function(url) {
		    // return the promise
		    return $http.get(url).then(function(response) { 
		    	return response.data;
		    }, function(response) {
		        //Second function handles error
		        console.log("Error loading data");
		    });
		};

		self.urlExists = function(url, callback, index){
			$.ajax({
			    type: 'HEAD',
			    url: url,
			    success: function(){
			      console.log("URL exists: "+url);
			      callback(url, index);
			    },
			    error: function() {
			      console.log("URL doesn't exist: "+url);
			    }
			});
		};


	});

