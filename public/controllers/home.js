(function () {
  'use strict';

  angular
    .module('MyApp')
    .controller('HomeCtrl', HomeCtrl);

  HomeCtrl.$inject = ['HomeService', 'toastr', '$uibModal'];
  function HomeCtrl(HomeService, toastr, $uibModal) {
    var vm = this;
    vm.tracks = [];
    vm.oldTrack;
    vm.editTrack;
    vm.totalItems = 0;
    vm.currentPage = 1;

    vm.genres = [];
    vm.musicType = [];

    vm.trackTitle = "";
    vm.trackRating = 0;
    vm.trackGenres = [];



    vm.initialise = initialise;
    vm.searchByTitle = searchByTitle;
    vm.pageChanged = pageChanged;
    vm.genrePageChanged = genrePageChanged;
    vm.createTrack = createTrack;
    vm.makeEditable = makeEditable;
    vm.cancelEdit = cancelEdit;
    vm.edit = edit;

    vm.createGenre = createGenre;
    vm.makeGenreEditable = makeGenreEditable;
    vm.saveGenre = saveGenre;
    vm.cancelGenreEdit = cancelGenreEdit;

    vm.searchSoundCloud = searchSoundCloud;

    /////////////////////////////

    function initialise() {
      console.log("inside home");
      vm.tracksLoading = true;
      vm.genresLoading = true;
      HomeService.listAllTracks("1")
        .then(function (response) {
          vm.tracks = response.data.results;
          vm.totalItems = response.data.count;
        })
        .catch(function (error) {
          toastr.error(error);
        })
        .finally(function () {
          vm.tracksLoading = false;
        })

      HomeService.listAllGenres("1")
        .then(function (response) {
          vm.genres = angular.copy(response.data.results);
          vm.genresForEdit = angular.copy(response.data.results);
          vm.musicType = angular.copy(response.data.results);
          vm.totalGenres = response.data.count;
        })
        .catch(function (error) {
          toastr.error(error);
        })
        .finally(function () {
          vm.genresLoading = false;
        })
    }

    //vm.initialise();

    function searchByTitle(title) {
      HomeService.searchByTitle(title)
        .then(function (response) {
          vm.tracks = response.data.results;
          vm.totalItems = response.data.count;
        })
    }

    function pageChanged() {
      vm.tracksLoading = true;
      HomeService.listAllTracks(vm.currentPage)
        .then(function (response) {
          vm.tracks = response.data.results;
          vm.totalItems = response.data.count;
        })
        .catch(function (error) {
          toastr.error(error);
        })
        .finally(function () {
          vm.tracksLoading = false;
        })

    }

    function genrePageChanged() {
      vm.genresLoading = true;
      HomeService.listAllGenres(vm.currentGenrePage)
        .then(function (response) {
          vm.musicType = response.data.results;
          vm.totalGenres = response.data.count;
        })
        .catch(function (error) {
          toastr.error(error);
        })
        .finally(function () {
          vm.genresLoading = false;
        })

    }

    function createTrack() {
      vm.trackGenresId = [];
      angular.forEach(vm.trackGenres, function (value, key) {
        vm.trackGenresId.push(value.id);
      });
      var req = {
        title: vm.trackTitle,
        rating: vm.trackRating,
        genres: vm.trackGenresId
      }
      HomeService.createTrack(req)
        .then(function (response) {
          response.data.color = true;
          vm.tracks.unshift(response.data);
          vm.addNewTrack = false;
          vm.trackTitle = "";
          vm.trackRating = 0;
          vm.trackGenres = [];
        })
    }

    function makeEditable(track, index) {
      vm.oldTrack = angular.copy(track);
      vm.editTrack = angular.copy(track);
      vm.editTrack.rating = parseFloat(track.rating);
      vm.tracks[index].editable = true;
    }

    function cancelEdit(index) {
      vm.tracks[index] = vm.oldTrack;
      vm.tracks[index].editable = false;
      vm.tracks[index].color = true;
    }

    // For editing track
    function edit(index) {
      var editGenres = [];
      angular.forEach(vm.editTrack.genres, function (value, key) {
        editGenres.push(value.id);
      });
      vm.editTrack.genres = editGenres;
      HomeService.editTrack(vm.editTrack)
        .then(function (response) {
          //console.log(response);
          vm.tracks[index] = response.data;
          vm.tracks[index].editable = false;
          vm.tracks[index].color = true;
        })
    }

    function createGenre() {
      var req = {
        name: vm.genreName
      }
      HomeService.createGenre(req)
        .then(function (response) {
          response.data.color = true;
          vm.musicType.unshift(response.data);
          vm.addNewGenre = false;
          vm.genreName = "";
        })
    }

    function makeGenreEditable(index, genre) {
      vm.musicType[index].editable = true;
      vm.oldGenreName = angular.copy(genre.name);
      vm.editedGenreName = genre.name;
    }

    function saveGenre(index, genre) {
      var req = {
        id: genre.id,
        name: vm.editedGenreName
      }
      HomeService.saveGenre(req)
        .then(function (response) {
          //console.log(response);
          vm.musicType[index] = response.data;
          vm.musicType[index].editable = false;
          vm.musicType[index].color = true;
          HomeService.listAllGenres("1")
            .then(function (response) {
              vm.genres = angular.copy(response.data.results);
              vm.genresForEdit = angular.copy(response.data.results);
              vm.totalGenres = response.data.count;
            })
            .catch(function (error) {
              toastr.error(error);
            })
        })
    }

    function cancelGenreEdit(index) {
      vm.musicType[index].name = vm.oldGenreName;
      vm.musicType[index].editable = false;
      vm.musicType[index].color = true;
    }

    //searchSoundCloud
    function searchSoundCloud(title){
      console.log(title);
      var req = {
        query: title
      }
      HomeService.searchSoundCloud(req)
        .then(function (response) {
          vm.tracks = response.data;
          vm.totalItems = response.data.count;
        })
    }

  }
})();
