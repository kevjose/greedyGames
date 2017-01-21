(function() {
  'use strict';

  angular
    .module('MyApp')
    .controller('HomeCtrl', HomeCtrl);

  HomeCtrl.$inject = ['HomeService'];
  function HomeCtrl(HomeService) {
    var vm = this;
    vm.isLoading = true;

    vm.initialise = initialise;

    /////////////////////////////

    function initialise() {
      console.log("Home controller");
    }

    vm.initialise();



  }
})();
