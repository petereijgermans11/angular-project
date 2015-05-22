var demo = angular.module('demo', ['ngResource', 'drag', 'filters']);
	
demo.factory('order', function($resource){
	  return $resource('http://localhost\\:8081//cursus/rest/orders/order', {}, {query: {method:'GET'}, 
		  save : {method:'PUT',isArray:false,
          headers:{'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}}});
	  
});
demo.factory('orderList', function($resource){
	 return $resource('http://localhost\\:8081//cursus/rest/orders/list', {}
	 		, {query: {method:'GET' , isArray:true}});	  
});

demo.factory('random', function() {
	return Math.random();
});

function EerstController($scope, $log, order){
	$scope.order = order.query();
	
	$scope.opslaan = function() {
		order.save($scope.order);
		$log.info("Opgeslagen");
	};
}







