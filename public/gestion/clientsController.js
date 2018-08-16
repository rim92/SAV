var app = angular.module('clientsController', ['ngRoute','ui.bootstrap','ngResource']);

	// inject the Todo service factory into our controller
	app.controller('clientsCtrl', ['$scope','$http','ClientFactory','$timeout','$location','$rootScope','$modal', '$log','$resource', function($scope, $http, ClientFactory,$location,$timeout,$rootScope ,$modal, $log,$resource) {
		$scope.formData = {};
		$scope.loading = true;

		// GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos
		ClientFactory.get()
			.success(function(data) {
				$scope.fiches = data;
		
			
			
			});
		
		
		
		ClientFactory.getPiecesIndspo()
			.success(function(data) {
			console.log("this dataa");
			$scope.piecesIndispo=data;
			
			console.log($scope.piecesIndispo);
			
			});
		
		
		 $scope.sendEmailToSalma=function(p){
	 
		 console.log(p);	
			 
						  ClientFactory.getEmailToSalma(p.designation_piece,p.reference_piece,p.qte_piece).success(function(data) {
		
			console.log("sent!");
			
			});	 
			 
			 
	 
	 }
		
		
     $scope.exportToExcel=function(tableId){ // ex: '#my-table'
            var exportHref=ClientFactory.tableToExcel(tableId,'sheet name');
            //$timeout(function(){location.href=exportHref;},100); // trigger download
		 location.href=exportHref;
		 
        }
		
	 
	
		
		$scope.logout = function () {
	ClientFactory.logout().success(function() {
        $rootScope.currentUser = null;
		
               $location.path("/login").replace();
      });
		
	}
		

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createFiche = function() {

			// call the create function from our service (returns a promise object)
				ClientFactory.create($scope.fiche)
					// if successful creation, call our get function to get all the new todos
					.success(function(data) {
					console.log($scope.fiche);
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
					
					});
				
         $location.path("/fiches").replace();
			// $location.path('/fiches').replace();
				

		};

var tab={};	
$scope.changeSwitch=function(id){
		
	console.log($scope.toggleValue[id]);
					
//	if(	$scope.toggleValue==true){
//	
//		$scope.toggleValue=false;
//		console.log($scope.toggleValue);
//	}
//		else{
//$scope.toggleValue=true;
//				console.log($scope.toggleValue);
//		}
		//$scope.toggleValue[id]	=true;
	
	
	
	}
	


	
		 $scope.showArchiveForm = function (id) {
            $scope.id=id;
			 
			 
			 ClientFactory.getById(id)
			.success(function(data) {
						console.log(data);
			$scope.fichediag=data;
			 
            var modalInstance = $modal.open({
                templateUrl: '/templates/historique.html',
                controller: ArchiveCtrl,
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
	
		
		
		 $scope.showForm = function (id) {
            $scope.id=id;
			 
			 
			 ClientFactory.getById(id)
			.success(function(data) {
						console.log(data);
			$scope.fichediag=data;
			 
            var modalInstance = $modal.open({
                templateUrl: '/templates/modal-form-ajout.html',
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
		
		
		 $scope.showDevis= function (id) {
            $scope.id=id;
			 
			 
			 ClientFactory.getById(id)
			.success(function(data) {
						console.log(data);
			$scope.fichediag=data;
			 
            var modalInstance = $modal.open({
                templateUrl: '/templates/devis-form.html',
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
		
		
		
		
		
		
		 $scope.showFormModif = function (id) {
            $scope.id=id;
			 
			 
			 ClientFactory.getById(id)
			.success(function(data) {
						console.log(data);
			$scope.fichediag=data;
			 
            var modalInstance = $modal.open({
                templateUrl: '/templates/modal-form-modif.html',
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
		
		
		
			
		 $scope.showPieces = function () {
           // $scope.id=id;
			 console.log("ook");

//			 ClientFactory.getById(id)
//			.success(function(data) {
//						console.log(data);
//			$scope.fichediag=data;
			 
            var modalInstance = $modal.open({
                templateUrl: '/templates/pieces.html',
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
				 
//				 
//			 });
         
        };
		
		
		
				
		 $scope.showCalendarEntree = function (id) {
			 $scope.id = id;
			 console.log( $scope.id);
            var calendarInstance = $modal.open({
                templateUrl: '/templates/calendar-entree.html',
                controller: CalendarCtrl,
                scope: $scope,
                resolve: {
                    userForm: function () {
                        return $scope.userForm;
                    }
                }
            });

            calendarInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
		
		
		
						
		 $scope.showCalendarSortie = function (id) {
		 $scope.id = id;
			 
			 	 ClientFactory.getById(id)
			.success(function(data) {
						console.log(data);
			$scope.fichediag=data;
			 
            var calendarInstance = $modal.open({
                templateUrl: '/templates/calendar-sortie.html',
                controller: CalendarCtrl,
                scope: $scope,
                resolve: {
                    userForm: function () {
                        return $scope.userForm;
                    }
                }
            });

			   calendarInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });	 
				 
				 
			 });
			 
			 
			 
			 
			 
			 
			 
        };
		
				

		
	
	}]);



var CalendarCtrl = function ($scope, $modalInstance, ClientFactory,userForm) {
    $scope.form = {}

    $scope.updateDateEntree = function (id) {
        console.log(id);
          if ($scope.form.userForm.$valid) {
            console.log("userform in dcope"+$scope.form.userForm.date_diagnostic.$viewValue);
			  
       
		ClientFactory.updateDateEntree(id,$scope.form.userForm.date_diagnostic.$viewValue)
			.success(function(data) {
			console.log(data);
			console.log("updated!");
				
			});
			  
	
            $modalInstance.close('closed');
			  
        } else {
            console.log('userform is not in scope');
        }
			
    
    };
	
	
	
	
	    $scope.updateDateSortie = function (id) {
        console.log("iidd"+id);
			 ClientFactory.getById(id)
			.success(function(data) {
						console.log(data);
			
				  ClientFactory.sendEmail(data.designation,data.panne_signaler,data.diagnostic,data.prix_reparation).success(function(data) {
		
			console.log("sent!");
			
			});
				 
			 });
			
          if ($scope.form.userForm.$valid) {
            console.log("userform in dcope"+$scope.form.userForm.date_sortie.$viewValue);
			  
			  
			  
       
		ClientFactory.updateDateSortie(id,$scope.form.userForm.date_sortie.$viewValue)
			.success(function(data) {
			console.log(data);
			console.log("updated!");
			
			});
			  
	
            $modalInstance.close('closed');
        } else {
            console.log('userform is not in scope');
        }
			
    
    };
	
	
	

	
};


var ArchiveCtrl = function ($scope, $modalInstance, ClientFactory,userForm, $q) {

console.log("test");
}


var ModalInstanceCtrl = function ($scope, $modalInstance, ClientFactory,userForm, $q) {
    $scope.form = {}
$scope.count=0;
	$scope.nbr=100;
	console.log($scope.count);
    $scope.isClicked = false;
	$scope.names = ["disponible", "Indisponible"];
	$scope.clickedButton=false;
	$scope.currentcount=[];
	$scope.nbrnewpieces=[];
	$scope.totalcounts=[];
	$scope.Answers = {};
	$scope.indices=[];
	$scope.nbrclicks = [];
	$scope.show=function(count,id){	
	$scope.isClicked = true;
    $scope.currentcount.push(count);
    $scope.totalcounts.push({"count":count});
	$scope.indices.push("designation_piece_"+count);
	
		for (var i=0;i<$scope.currentcount.length;i++){
		  $scope.nbrclicks = [
    {
       
        "nbr": i,
       }
    ];

		
		}
		console.log($scope.nbrclicks[0].nbr);
		
	}
	
	
	
	$scope.showNbrPieces=function(nbr,id){
			$scope.isClicked = true;
		$scope.nbrnewpieces.push(nbr);	
		
	
	}
	
	
	$scope.remove=function($index,id){
	console.log(id);
	$scope.pieces.splice( $index, 1 );	
		ClientFactory.deletePiece(id).success(function(data) {
					console.log("deleted!");
					
					});	
		

	}
	
    $scope.data = {
    singleSelect: null,
    multipleSelect: [],
    option1: 'dispo'
   };
	
	
		$scope.change=function(){
		console.log( $scope.data.singleSelect);
	
		if($scope.data.singleSelect=="dispo")
				$scope.clickedButton=true;
		else
				$scope.clickedButton=false;
			
	}
		
			$scope.changeCount=function(count){
				  
		//console.log( $scope.form.userForm["choix["+count+"]"]);
	
		if($scope.form.userForm["choix["+count+"]"].$viewValue=="dispo")
				$scope.clickedButton=true;
		else
				$scope.clickedButton=false;
			
	}
			
			
				
			$scope.changeCountPiece=function(nbr){
				  
		//console.log( $scope.form.userForm["choix["+count+"]"]);
	console.log(nbr);
//		if($scope.form.userForm["choix["+nbr+"]"].$viewValue=="dispo")
//				$scope.clickedButton=true;
//		else
//				$scope.clickedButton=false;
			
	}
	
			
	
			//get pieces byID
			
			
	ClientFactory.getPiecesById($scope.id)
			.success(function(data) {
				$scope.pieces = data;
		$scope.nbrpieces=data.length;
		console.log("nbr"+data.length);
			
				console.log(data);
			});
			
			
          
		$scope.submitForm = function (id) {
	
			
		 var tab=[];
//			tab.push({designation_piece:$scope.form.userForm.designation_piece.$viewValue,reference_piece:$scope.form.userForm.reference_piece.$viewValue,qte_piece:$scope.form.userForm.qte_piece.$viewValue,choix:$scope.data.singleSelect,prix_piece:$scope.form.userForm.prix_piece.$viewValue,id_article:id});
		
			for(var i=1;i<=$scope.currentcount.length;i++){
tab.push({designation_piece:$scope.form.userForm["designationpiece["+i+"]"].$viewValue,reference_piece:$scope.form.userForm["referencepiece["+i+"]"].$viewValue,qte_piece:$scope.form.userForm["qtepiece["+i+"]"].$viewValue,choix:$scope.form.userForm["choix["+i+"]"].$viewValue,prix_piece:$scope.form.userForm["prixpiece["+i+"]"].$viewValue,id_article:id});
				
			}
			ClientFactory.createTest(tab).success(function(data) {
					console.log(data);
					
					 $modalInstance.close('closed');
				
					});	
				
			if($scope.form.userForm.num_serie.$viewValue==''){
			console.log("ookk");
			$scope.form.userForm.num_serie.$viewValue=null;
				console.log($scope.form.userForm.num_serie.$viewValue);
			}
			
		if($scope.form.userForm.panne_signaler.$viewValue==''){
			console.log("ookk");
			$scope.form.userForm.panne_signaler.$viewValue=null;
				
			}
		
			if($scope.form.userForm.diagnostic.$viewValue==''){
			console.log("ookk");
			$scope.form.userForm.diagnostic.$viewValue=null;
				
			}
		
//			if($scope.form.userForm.reference_piece.$viewValue==''){
//			console.log("ookk");
//			$scope.form.userForm.reference_piece.$viewValue=null;
//				
//			}
//		
//			if($scope.form.userForm.prix_piece.$viewValue==''){
//			console.log("ookk");
//			$scope.form.userForm.prix_piece.$viewValue=null;
//				
//			}
		
			if($scope.form.userForm.prix_reparation.$viewValue==''){
			console.log("ookk");
			$scope.form.userForm.prix_reparation.$viewValue=null;
				
			}
		
			if($scope.form.userForm.observation.$viewValue==''){
			console.log("ookk");
			$scope.form.userForm.observation.$viewValue=null;
				
			}
				
			ClientFactory.updateFicheTechnique(id,$scope.form.userForm.num_serie.$viewValue,$scope.form.userForm.panne_signaler.$viewValue,$scope.form.userForm.diagnostic.$viewValue,$scope.form.userForm.prix_reparation.$viewValue,$scope.form.userForm.observation.$viewValue).success(function(data) {
			console.log("update!");		
			console.log(data);
					 	
				
					})

	}
		
		
		//submit form update
		
		
		$scope.submitUpdateForm = function (id) {
	
		 var tab=[];
//			tab.push({designation_piece:$scope.form.userForm.designation_piece.$viewValue,reference_piece:$scope.form.userForm.reference_piece.$viewValue,qte_piece:$scope.form.userForm.qte_piece.$viewValue,choix:$scope.data.singleSelect,prix_piece:$scope.form.userForm.prix_piece.$viewValue,num_serie_article:id});
		
			console.log($scope.nbrnewpieces);
			
			for(var i=100;i<$scope.nbrnewpieces;i++){
				console.log("fjodjio");
tab.push({designation_piece:$scope.form.userForm["designationpiece["+i+"]"].$viewValue,reference_piece:$scope.form.userForm["referencepiece["+i+"]"].$viewValue,qte_piece:$scope.form.userForm["qtepiece["+i+"]"].$viewValue,prix_piece:$scope.form.userForm["prixpiece["+i+"]"].$viewValue,id_article:id});
				
			}
			ClientFactory.createTest(tab).success(function(data) {
				console.log("tesst");	
				console.log(data);
					
					});	
			
			
			
			
			//update 
			
		console.log("num serie"+$scope.form.userForm.num_serie.$viewValue);	ClientFactory.updateFicheTechnique(id,$scope.form.userForm.num_serie.$viewValue,$scope.form.userForm.panne_signaler.$viewValue,$scope.form.userForm.diagnostic.$viewValue,$scope.form.userForm.prix_reparation.$viewValue,$scope.form.userForm.observation.$viewValue).success(function(data) {
			console.log("update!");		
			console.log(data);
					 	
				
					});	
			
		$modalInstance.close('closed');
				
//			if($scope.form.userForm.num_serie.$viewValue==''){
//			console.log("ookk");
//			$scope.form.userForm.num_serie.$viewValue=null;
//				console.log($scope.form.userForm.num_serie.$viewValue);
//			}
//			
//		if($scope.form.userForm.panne_signaler.$viewValue==''){
//			console.log("ookk");
//			$scope.form.userForm.panne_signaler.$viewValue=null;
//				
//			}
//		
//			if($scope.form.userForm.diagnostic.$viewValue==''){
//			console.log("ookk");
//			$scope.form.userForm.diagnostic.$viewValue=null;
//				
//			}
//		
//			if($scope.form.userForm.reference_piece.$viewValue==''){
//			console.log("ookk");
//			$scope.form.userForm.reference_piece.$viewValue=null;
//				
//			}
//		
//			if($scope.form.userForm.prix_piece.$viewValue==''){
//			console.log("ookk");
//			$scope.form.userForm.prix_piece.$viewValue=null;
//				
//			}
//		
//			if($scope.form.userForm.prix_reparation.$viewValue==''){
//			console.log("ookk");
//			$scope.form.userForm.prix_reparation.$viewValue=null;
//				
//			}
//		
//			if($scope.form.userForm.observation.$viewValue==''){
//			console.log("ookk");
//			$scope.form.userForm.observation.$viewValue=null;
//				
//			}
//				

	}
		
		
		
		
		
		
		
		
		 $scope.updateDateEntree = function (id) {
         console.log(id);
          if ($scope.form.userForm.$valid) {
            console.log("userform in dcope"+$scope.form.userForm.date_diagnostic.$viewValue);
			  
       
		ClientFactory.updateDateEntree(id,$scope.form.userForm.date_diagnostic.$viewValue)
			.success(function(data) {
			console.log(data);
			console.log("updated!");
				
			});
			  
	
            $modalInstance.close('closed');
			  
        } else {
            console.log('userform is not in scope');
        }
			
    
    };
		
	
     }


	 
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

	
	
	
	
	