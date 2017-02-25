(function() {
'use strict';

  angular
      .module('MyApp')
      .factory('HomeService', HomeService);

  HomeService.$inject = ['$http'];
  function HomeService($http) {
    var baseUrl = 'http://104.197.128.152:8000/v1/'
    return {
      //List all tracks
      listAllTracks: function(page){
        return $http.get(baseUrl+'tracks?page='+page);
      },
      searchByTitle: function(title){
        return $http.get(baseUrl+'tracks?title='+title);
      },
      createTrack: function(req){
        return $http.post(baseUrl+'tracks',req);
      },
      editTrack: function(req){
        return $http.post(baseUrl+'tracks/'+req.id, req)
      },
      listAllGenres: function(page){
        return $http.get(baseUrl+'genres?page='+page);
      },
      createGenre: function(req){
        return $http.post(baseUrl+'genres',req);
      },
      saveGenre: function(req){
        return $http.post(baseUrl+'genres/'+req.id, req)
      }
      // getProfile: function() {
      //   return $http.get('/api/me');
      // },
      // getUsers: function() {
      //   return $http.get('/api/user/all');
      // },
      // updateRole: function(data){
      //   return $http.put('/api/user', data);
      // },
      // updateLoginCount: function(data){
      //   return $http.put('/api/user/count', data);
      // }
    };
  }
})();
