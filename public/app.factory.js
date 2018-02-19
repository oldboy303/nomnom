(function() {

  angular.module('app')
    .factory('cFactory', cFactory);

  cFactory.$inject = ['$window', '$http', '$state'];

  function cFactory($window, $http, $state) {
    return {

      cookbook: null,

      getRecipe: function(yummlyId) {
        return $http.get('/api/v1/recipe/' + yummlyId)
      },

      save: function(token) {
        $window.localStorage['nToken'] = token;
      },

      fetch: function() {
        return {
          token: $window.localStorage['nToken']
        };
      },

      destroy: function() {
        $window.localStorage.removeItem('nToken');
        this.cookbook = null;
        $state.go('home');
      }
    };
  }

}());