(function() {

  angular.module('app')
    .factory('cFactory', cFactory);

  cFactory.$inject = ['$window', '$http', '$state'];

  function cFactory($window, $http, $state) {
    return {

      getCookbook: function(token) {
        return $http.get('/api/v1/cookbooks/' + token)
          .then(function(response) {
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

      login: function(props) {
        var self = this;
        return $http.post('/api/v1/cookbooks/login', props)
          .then(function(response) {
            self.save(response.data.token);
            $state.go('dashboard');
            return;
          })
          .catch(function(error) {
            return error.data;
          });
      },

      signup: function(props) {
        var self = this;
        return $http.post('/api/v1/cookbooks/register', props)
          .then(function(response) {
            self.save(response.data.token);
            $state.go('dashboard');
            return;
          })
          .catch(function(error) {
            return error.data;
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
        $state.go('home');
      }
    };
  }

}());