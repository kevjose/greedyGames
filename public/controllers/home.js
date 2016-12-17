angular.module('MyApp')
  .controller('HomeCtrl', function($scope, $http) {
    $scope.isLoading = true;
    $http
      .get('https://hackerearth.0x10.info/api/nitro_deals?type=json&query=list_deals')
      .success(function(data) {
        if (data) {
          console.log(data.deals);
          $scope.deals = data.deals;
        }
      })
      .error(function(err){
        console.log(err)
      })
      .finally(function(){
        $scope.isLoading = false;
      });
  });
