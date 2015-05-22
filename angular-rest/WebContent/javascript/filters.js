angular.module('filters', []).
  filter('reverse', function() {
    return function(input, uppercase) {
      var out = "";      if (input){
      for (var i = 0; i < input.length; i++) {
        out = input.charAt(i) + out;
      }
      // conditional based on optional argument
      if (uppercase) {
        out = out.toUpperCase();
      }
    }
      return out;
    };
  });