var app = angular.module('myShop', []);
app.controller('productCatalog' , function($scope) {
    
    $scope.producten = [
        { 
            code: "raspberry_pi_2b",
            omschrijving: "Raspberry Pi Model 2B",
            prijs: 36.00
        },
        { 
            code: "camera",
            omschrijving: "Camera voor bok de Pi", 
            prijs: 25.00
        },
        { 
            code: "tragedie",
            omschrijving: "Hecabe Euripedes", 
            prijs: 21.99
        }        
    ];
});
