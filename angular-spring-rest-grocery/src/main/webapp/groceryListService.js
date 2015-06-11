angular.module('services', []).service('GroceryListService',
		[ '$log', '$http', '$q', function($log, $http, $q) {
			return {
			get : function() {
				var deferred = $q.defer();
				$http.get('resources/grocery/').then(function(response) {
					if (response.status == 200) {
						deferred.resolve(response.data);
					} else {
						deferred.reject('Error getting groceries');
					}
				});

				return deferred.promise;

			},
			
			save : function(grocery) {
				if (grocery.id) {
					$log.debug("update");
					$log.debug(grocery);
					var deferred = $q.defer();
					$http.put('resources/grocery/', grocery).then(function(response) {
						if (response.status == 200 || response.status == 204) {
							deferred.resolve(response.data);
						} else {
							deferred.reject('Error updating groceries');
						}
					});
				} else {
					$log.debug("save");
					$log.debug(grocery);
					var deferred = $q.defer();
					$http.post('resources/grocery/', grocery).then(function(response) {
						if (response.status == 200 || response.status == 204) {
							deferred.resolve(response.data);
						} else {
							deferred.reject('Error saving groceries');
						}
					});
				}
				

				return deferred.promise;

			},

			remove : function(grocery) {
				$log.debug("remove");
				$log.debug(grocery);
				var deferred = $q.defer();
				$http.delete('resources/grocery/' + grocery.id).then(function(response) {
					if (response.status == 200 || response.status == 204) {
						deferred.resolve(response.data);
					} else {
						deferred.reject('Error REMOVING groceries');
					}
				});

				return deferred.promise;
			}
			}
		} ]);