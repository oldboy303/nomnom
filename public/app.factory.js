(function() {

  angular.module('app')
    .factory('cFactory', cFactory);

  cFactory.$inject = ['$window'];

  function cFactory($window) {
    return {

      cookbook: null,

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
      }
    };
  }

}());