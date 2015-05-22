var demo = angular.module('demo', ['demodirectives'])
	

.controller('Controller', ['$scope', function($scope) {
	  $scope.customer = {
	    name: 'Naomi',
	    address: '1600 Amphitheatre'
	  };
}]
);
