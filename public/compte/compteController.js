var app = angular.module('compteController', ['ngRoute']);

	// inject the Todo service factory into our controller
	app.controller('cpController', ['$scope','$http','Compte','$location','$rootScope', function($scope, $http, Compte,$location,$rootScope) {
		$scope.formData = {};
		$scope.loading = true;

		// GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos
//		Compte.get()
//			.success(function(data) {
//				$scope.compte = data;
//				$scope.loading = false;
//			});

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createCompte = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			
				
				
			if($scope.formData.username=="SONOM" && $scope.formData.password=="STORE2017"){
				// call the create function from our service (returns a promise object)
				Compte.create($scope.formData)

					// if successful creation, call our get function to get all the new todos
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.compte = data; // assign our new list of todos
					
					$sessionStorage.user = JSON.stringify(data);
					
					
      
					});
				
			$location.path("/fiche").replace();
			}
			
			
					
			else if($scope.formData.username=="SONOM" && $scope.formData.password=="SAHBI"){
				// call the create function from our service (returns a promise object)
				Compte.create($scope.formData)

					// if successful creation, call our get function to get all the new todos
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.compte = data; // assign our new list of todos
					
					$sessionStorage.user = JSON.stringify(data);
					
					
      
					});
				
			$location.path("/clients").replace();
			}
			else{
			$location.path("/login").replace();
				$scope.msgErreur="Erreur Login ou Mot de passe";
			}
   
			
		};

		// login ==================================================================
		
	
	}]);

