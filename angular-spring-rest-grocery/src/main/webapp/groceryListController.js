angular.module('groceryListApp', [ 'services' ])

.controller(
		'groceryListController',
		[ '$log', '$scope', 'GroceryListService',
				function($log, $scope, GroceryListService) {
			$scope.groceries = [ {
				name : 'oranges',
				quantity : 2,
				remarks : 'two bags'
				}, 
				
			$scope.add = function() {
					$scope.groceries.push({});
				},
				
			GroceryListService.get().then(
						function(data) {
						$scope.groceries = data;
						}, function(errorMessage) {
						$log.debug("error");},
						
			$scope.save = function(index) {
						GroceryListService.save($scope.groceries[index]).then(
						function(data) {
						 $scope.groceries[index] = data;
						}, function(errorMessage) {
						 $log.debug("error");
						});
						},
						
			
			$scope.remove = function(index) {
							GroceryListService.remove($scope.groceries[index]).then(
							function(data) {
							 $scope.groceries[index] = data;
							}, function(errorMessage) {
							 $log.debug("error");
							});
							})	
				
				];

					
				} ]);