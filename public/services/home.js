(function() {
'use strict';

  angular
      .module('MyApp')
      .factory('HomeService', HomeService);

  HomeService.$inject = ['$http'];
  function HomeService($http) {
    var baseUrl = 'http://104.197.128.152:8000/v1/';
    var soundCloudUrl = 'http://api.soundcloud.com/tracks?client_id=708abc176b8af0125b78392b9f132b4d';
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
      },
      searchSoundCloud: function(req){
        return $http.get(soundCloudUrl+'&q='+req.query);
      }
    };
  }
})();
