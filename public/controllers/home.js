(function() {
  'use strict';

  angular
    .module('MyApp')
    .controller('HomeCtrl', HomeCtrl);

  HomeCtrl.$inject = ['HomeService','toastr'];
  function HomeCtrl(HomeService, toastr) {
    var vm = this;
    vm.articles;

    vm.initialise = initialise;

    /////////////////////////////

    function initialise() {

      if(!localStorage.getItem('articles')){
        HomeService
        .getArticles()
        .then(function(response){
          vm.articles = response.data;
          vm.articles.shift();
          localStorage.clear();
          localStorage.setItem('articles',JSON.stringify(vm.articles))
          toastr.success('Request made from remote when locastorage article is not present', 'Information');
        })
        .catch(function(error){
          console.log(error);
        })
      }else{
        vm.articles = JSON.parse(localStorage.getItem('articles'));
        toastr.success('Request made from web storage when article is present in localStorage', 'Information');
      }
    }

    vm.initialise();



  }
})();
