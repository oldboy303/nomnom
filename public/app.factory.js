(function() {

  angular.module('app')
    .factory('cFactory', cFactory);

  cFactory.$inject = ['$window', '$http', '$state'];

  function cFactory($window, $http, $state) {
    return {

      getCookbook: function(token) {
        return $http.get('/api/v1/cookbooks/' + token)
          .then(function(response) {
            console.log(response.data)
            return response.data.cookbook;
          })
          .catch(function(error) {
            return error.data.error;
          });
      },

      getRecipe: function(yummlyId) {
        return $http.get('/api/v1/recipe/' + yummlyId)
          .then(function(response) {
            return response.data
          })
          .catch(function(error) {
            return error.data
          })
      },

      recipeSave: function(recipe) {
        var parsedRecipe = {
          name: recipe.recipeName,
          yummlyId: recipe.id,
          imageURL: recipe.imageUrlsBySize['90'],
          rating: recipe.rating,
          prepTime: recipe.totalTimeInSeconds
        };
        return $http.post(
          '/api/v1/cookbooks/' + $window.localStorage['nToken'] + '/recipes',
          { recipe: parsedRecipe }
        )
          .then(function(response) {
            return response.data.cookbook;
          })
          .catch(function(error) {
            return error.data.error;
          });
      },

      recipeDelete: function(recipeId) {
        return $http.delete(
          '/api/v1/cookbooks/' + $window.localStorage['nToken'] 
          + '/recipes/' + recipeId
        )
          .then(function(response) {
            return response.data.cookbook;
          })
          .catch(function(error) {
            return error.data.error;
          });
      },

      save: function(token) {
        $window.localStorage['nToken'] = token;
      },

      fetch: function() {
        return $window.localStorage['nToken'];
      },

      destroy: function() {
        $window.localStorage.removeItem('nToken');
        this.cookbook = null;
        $state.go('home');
      }
    };
  }

}());