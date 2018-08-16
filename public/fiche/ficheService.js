angular.module('ficheService', [])

	// super simple service
	// each function returns a promise object 
	.factory('FicheFactory', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/fiches');
    // handle success
    
			},
			getDevis : function() {
				return $http.get('/devis');
    // handle success
    
			},
			create : function(ficheData) {
				return $http.post('/fiche', ficheData);
			},
			delete : function(id) {
				return $http.delete('/register' + id);
			},
			
			createArchive:function(data){
			
			return $http.post('/archive',data);
			},
			updateFiche:function(id,derniere_reparation){
			
			return $http.put('/fiche/'+id+'/'+derniere_reparation);
			}
			
			
		}
	}]);