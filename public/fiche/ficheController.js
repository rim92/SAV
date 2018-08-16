var app = angular.module('ficheController', ['ngRoute','datatables','ui.bootstrap']);

	// inject the Todo service factory into our controller
	app.controller('ficheCtrl', ['$scope','$http','FicheFactory','ClientFactory','$location','$modal','$log','$rootScope','DTOptionsBuilder', 'DTColumnDefBuilder', function($scope, $http, FicheFactory,ClientFactory,$location,$modal,$log,$rootScope,DTOptionsBuilder, DTColumnBuilder) {
		$scope.formData = {};
		$scope.loading = true;
		
		$scope.vm = {};
		$scope.repare=false;
		$scope.vm.dtOptions = DTOptionsBuilder.newOptions()
		  .withOption('order', [0, 'asc']);
		
//		
//		$scope.dtInstance = {};
//			$scope.dtInstance.DataTable.destroy();
		
		
		// GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos
		FicheFactory.get()
			.success(function(data) {
				$scope.fiches = data;
				$scope.loading = false;
		console.log(data);
			for(var i=0;i<data.length;i++){
		
			$scope.repare=true;
			
				
			}
		});
		
		
		
		//get devis
		
		FicheFactory.getDevis()
			.success(function(data) {
				$scope.devis = data;
				$scope.loading = false;
		console.log(data);
			for(var i=0;i<data.length;i++){
		
			$scope.repare=true;
			
				
			}
		});
		
$scope.change=function(){

	if( $scope.selected==true){
	console.log("c bon!!");
	}
	
}
		
		
		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createFiche = function() {
  console.log("rerepare"+$scope.fiche.rerepare);
	
			// call the create function from our service (returns a promise object)
				FicheFactory.create({"nom":$scope.fiche.nom,"prenom":$scope.fiche.prenom,"adresse":$scope.fiche.adresse,"tel":$scope.fiche.tel,"designation":$scope.fiche.designation,"date_achat":$scope.fiche.date_achat,"panne":$scope.fiche.panne,"reparation":$scope.fiche.reparation,"frais_diagnostic":$scope.fiche.frais_diagnostic,"rerepare":$scope.fiche.rerepare,"num_serie":null,"panne_signaler":$scope.fiche.panne,"diagnostic":null,"reference_piece":null,"prix_piece":null,"prix_reparation":null,"date_diagnostic":null,"date_sortie":null,"observation":null,"etat":"non"})
					// if successful creation, call our get function to get all the new todos
					.success(function(data) {
					console.log($scope.fiche);
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
					
					
					console.log("idd"+data[0]._id);
				console.log("rerepp"+$scope.fiche.rerepare);
					if($scope.fiche.rerepare==true){
					
						
					FicheFactory.updateFiche(data[0]._id,$scope.fiche.derniere_reparation).success(function(){
					
				console.log("c bon updated!");	
					});	
						
					
					}
					
					// ajouter ds historique id de la fiche 
					
					});
				
         $location.path("/fiches").replace();
			// $location.path('/fiches').replace();
				

		};

		// login ==================================================================
	
		$scope.update_prix=function(id){
			console.log("oooook");
//		$scope.id=id;
//		console.log("p"+p);
//		
		console.log($scope.prix_final);			
		}
	
			
		
		 $scope.showForm = function (id) {
            $scope.id=id;
			 console.log(id);
			 
			 		ClientFactory.getById(id)
			.success(function(data) {
						//console.log(data);
			$scope.fichediag=data;
		
			
			    var modalInstance = $modal.open({
                templateUrl: '/templates/fiche-form.html',
                controller: ModalInstanceCtrl,
                scope: $scope,
                resolve: {
                    userForm: function () {
                        return $scope.userForm;
                    }
                }
            });
			
			
            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });			
						
			});
	
		
			 
        
        };
		
	
	}]);

var ModalInstanceCtrl = function ($scope, $modalInstance, ClientFactory,userForm) {
    $scope.form = {}
		console.log("tessst");	
	
		$scope.update_prix=function(id){
			console.log("oooook");
//		$scope.id=id;
//		console.log("p"+p);
//		
//			console.log($scope.prix_final);			
		}
		


	
	  $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
	
	
//	
//	$scope.checkStuff = function () {
//        $scope.isClicked = !$scope.isClicked;
//		console.log($scope.isClicked );
//    }
//	

  
};

