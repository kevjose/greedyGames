(function() {
'use strict';

  angular
      .module('MyApp')
      .factory('HomeService', HomeService);

  HomeService.$inject = ['$http'];
  function HomeService($http) {
    return {
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
