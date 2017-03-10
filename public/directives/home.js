(function () {
  angular
    .module('MyApp')
    .directive('homeDir', function ($http) {
      function link(scope){
        var clientid = '708abc176b8af0125b78392b9f132b4d';
        scope.$watch("track",function(newValue,oldValue) {
          console.log(newValue, oldValue);
          if(scope.song){
            scope.song.pause();
            scope.playing = !scope.playing;
          }
          if(newValue !== oldValue){
            $http({
              method: 'GET',
              url: 'http://api.soundcloud.com/tracks/'+scope.track+'.json?client_id='+clientid
            }).then(function(response){
              var data = response.data;
              scope.band = data.user.username;
              scope.bandUrl = data.user.permalink_url;
              scope.title = data.title;
              scope.trackUrl = data.permalink_url;
              //scope.albumArt = data.artwork_url.replace("large", "t500x500");
              scope.wave = data.waveform_url;
              scope.stream = data.stream_url + '?client_id=' + clientid;
              scope.song = new Audio();
            }).then(function(){
              scope.play();
            }).catch(function(error){
              console.log(error);
            });
          }
        });
        scope.playing = false;
        scope.play = function () {
            scope.playing = !scope.playing;
            if (!scope.playing) {
              scope.song.pause();
            }
          else
            {
              if (scope.song.src == '') {scope.song.src = scope.stream;}
              scope.song.play();
            }
        }
      }
      return {
        restrict: 'E',
        scope: {
            track: '@'
        },
        template: document.getElementById('template').innerHTML,
        link: link,
      }
    });

})();
