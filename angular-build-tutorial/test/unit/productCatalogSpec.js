
describe('Webshop Controllers', function(){
    
    beforeEach(module('myShop'));
    
    describe('Productcatalog controller', function(){
        var scope, ctrl;

        beforeEach(inject(function($rootScope, $controller) {
          scope = $rootScope.$new();
          ctrl = $controller('productCatalog', {$scope: scope});
        }));

        it('Er moet een catalogus met producten aanwezig zijn', function() {
            expect(scope.producten.length).toBe(3)      
        });
    });
});
        

