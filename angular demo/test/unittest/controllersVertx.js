'use strict';

describe('CartController', function() {

  beforeEach(module('myApp'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

   describe('$scope.grade', function() {
    it('sets the strength to "strong" if the password length is >8 chars', function() {
      var $scope = {};
      var controller = $controller('CartController', { $scope: $scope });
      $scope.password = 'longerthaneightchars';
      $scope.grade();
      expect($scope.strength).toEqual('strong');
    });
  });
  
   describe('add and remove to card', function() {
    it('Add and remove an item to the Card', function() {
      var $scope = {};
      var controller = $controller('CartController', { $scope: $scope });
	  $scope.loggedIn = true;
	  $scope.items = [];
	  
	  $scope.album = {
	      _id: 1,
          artist: 'The Wurzels',
          genre: 'Scrumpy and Western',
          title: 'I Am A Cider Drinker',
          price: 0.99
      };
      $scope.addToCart($scope.album);
	    $scope.album = {
	      _id: 2,
          artist: 'The Man',
          genre: 'Western',
          title: 'Cool man',
          price: 0.39
      };
      $scope.addToCart($scope.album);
	  
	  expect($scope.items.length).toBeGreaterThan(1);
	  expect($scope.items.length).toBeLessThan(3);
	  
	  $scope.orderReady();
	  
	  $scope.item = {
        album: $scope.album,
        quantity: 1
      };
	  $scope.removeFromCart($scope.item);
	  
	   expect($scope.items.length).toBeGreaterThan(0);
	   expect($scope.items.length).toBeLessThan(2);
	   expect($scope.items[0].album.artist).toEqual('The Wurzels');
	   expect($scope.total()).toEqual(0.99);
	   
	   $scope.album = {
	      _id: 1,
          artist: 'The Wurzels',
          genre: 'Scrumpy and Western',
          title: 'I Am A Cider Drinker',
          price: 0.99
      };
	  $scope.addToCart($scope.album);
	  expect($scope.items[0].quantity).toEqual(2);
      expect($scope.total()).toEqual(1.98);	  
	   
    });
  });
  
  
});
