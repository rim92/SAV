angular.module('compteService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Compte', ['$http',function($http) {
		return {
			login : function(compteData) {
				return $http.post('http://192.168.1.7:8080/login',compteData);
    // handle success
    
			},
			create : function(compteData) {
				return $http.post('http://192.168.1.7:8080/register', compteData);
			}
		}
	}]);