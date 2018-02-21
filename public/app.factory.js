(function() {

  angular.module('app')
    .factory('cFactory', cFactory);

  cFactory.$inject = ['$window', '$http', '$state', '$rootScope'];

  function cFactory($window, $http, $state, $rootScope) {
    return {

      cookbook: null,

      getRecipe: function(yummlyId) {
        return $http.get('/api/v1/recipe/' + yummlyId)
      },

      recipeSave: function(recipe) {
        var parsedRecipe = {
          name: recipe.recipeName,
          yummlyId: recipe.id,
          imageURL: recipe.imageUrlsBySize['90'],
          rating: recipe.rating,
          prepTime: recipe.totalTimeInSeconds
        };
        $http.post(
          '/api/v1/cookbooks/' + $window.localStorage['nToken'] + '/recipes',
          { recipe: parsedRecipe }
        )
          .then(function(response) {
            this.cookbook.recipes = response.recipes;
            console.log(this.cookbook.recipes);
          })
          .catch(function(error) {
            console.log(error.data);
          });
      },

      recipeDelete: function(recipeId) {
        console.log(recipeId)
        $http.delete(
          '/api/v1/cookbooks/' + $window.localStorage['nToken'] 
          + '/recipes/' + recipeId
        )
          .then(function(response) {
            this.cookbook.recipes = response.data.recipes;
            console.log(response.data);
          })
          .catch(function(error) {
            console.log(error.data);
          });
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