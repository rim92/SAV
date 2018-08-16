'use strict';
var routeApp=angular.module('scotchTodo', [
	'todoController',
	'compteController',
	'compteService',
	'todoService',
	'ficheController',
	'ficheService',
	'clientsController',
	'clientsService',
	'ngRoute',
	'ui.toggle',
'ngResource','AuthServices'])
 routeApp.config(['$routeProvider', function($routeProvider) {
        $routeProvider
  
                        .when('/todos',{
                templateUrl:'compte/compte.html',
                controller: 'cpController'
            })
		         .when('/fiche',{
                templateUrl:'fiche/fiche.html',
                controller: 'ficheCtrl',
			requiresAuthentication: true
            })
		
		  .when('/pieces',{
                templateUrl:'gestion/pieces.html',
                controller: 'clientsCtrl',
			requiresAuthentication: true
            })
		
		
		
		.when('/devis_rep',{
                templateUrl:'gestion/devis_reparation.html',
                controller: 'clientsCtrl',
			requiresAuthentication: true
            })
		
		 .when('/devis',{
                templateUrl:'fiche/ajout_devis.html',
                controller: 'ficheCtrl',
			requiresAuthentication: true
            })
		
		
		 .when('/liste_devis',{
                templateUrl:'fiche/liste_devis.html',
                controller: 'ficheCtrl',
			requiresAuthentication: true
            })
		
		
		   .when('/modifier',{
                templateUrl:'gestion/modifier_diagnostic.html',
                controller: 'clientsCtrl',
			requiresAuthentication: true
            })
		
		.when('/fiches',{
                templateUrl:'fiche/liste_reparation.html',
                controller: 'ficheCtrl',
			requiresAuthentication: true
            })
        
        
		.when('/clients',{
                templateUrl:'gestion/clients.html',
                controller: 'clientsCtrl',
			requiresAuthentication: true
            })
                .when('/login',{
                templateUrl:'compte/compte.html',
                controller: 'cpController'
            })
        
            .otherwise({redirectTo: '/todos'});
    }])
