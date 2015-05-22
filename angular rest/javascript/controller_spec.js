var demo = angular.module('demo', ['ngResource']);
	
demo.factory('SingleTest', function($resource){
		  return $resource('/angularcursus/rest/tests/test', {}, {query: {method:'GET'}});
		  
	});
demo.factory('ListTest', function($resource){
		 return $resource('/angularcursus/rest/tests/testList', {}
		 		, {query: {method:'GET' , isArray:true}});	  
	});

describe('SingleValue', function() { 

  describe('angular', function(){ 

        beforeEach(module('demo'));

	        var scope = undefined, $httpBackend;
	 
		    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller, $window) {
		      $httpBackend = _$httpBackend_;
		      $httpBackend.expectGET('/angularcursus/rest/tests/test').
		          respond([]);
		 
		      scope = $rootScope.$new();
		      ctrl = $controller(SingleValue, {$scope: scope});
		    }));
		
		// Specs
		    		    
			describe('test singlevalue',function() {
				it('should be straat',function(){
					 expect(scope.yourStreet).toBe('straat');
				});
				it('should be fill test',function(){
						 expect(scope.test).not.toBe(null);
				});		
				
			
	});
	
	
});
});

describe('ListValue', function() { 

	  describe('angular', function(){ 

	        beforeEach(module('demo'));

		        var scope = undefined, $httpBackend;
		 
			    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller, $window) {
			      $httpBackend = _$httpBackend_;
			      $httpBackend.expectGET('/angularcursus/rest/tests/testList').
			          respond([]);
			 
			      scope = $rootScope.$new();
			      ctrl = $controller(ListValue, {$scope: scope});
			    }));
			
			// Specs
			    		    
				describe('test listvalue',function() {

					it('should be fill test',function(){
							 expect(scope.listtest).not.toBe(null);
					});		
					
				
		});
		
		
	});
	});