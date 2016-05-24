'use strict';

juke.controller('SongChooseCtrl', function ($scope, SongFactory) {

  $scope.songs = [];

  SongFactory.fetchAll()
  .then(function (songs) {
    $scope.songs = songs;
  });

  $scope.reset = function () {
    $scope.toAdd = null;
  };

  $scope.addIt = function () {
    $scope.addSong($scope.toAdd)
    .then(function () {
      $scope.reset();
    });
  };

});

juke.directive('songList', function(PlayerFactory) {
  return {
    restrict: 'EA',
    templateUrl: 'js/song/song-template.html',
    scope: {
      songs: '='
    },
    link: function(scope, element, attr) {

      scope.isPlaying = function (song) {
        return (PlayerFactory.isPlaying() && (song === PlayerFactory.getCurrentSong()))
      };

      scope.getCurrentSong = function () {
        return PlayerFactory.getCurrentSong();
      };

      scope.toggle = function (song) {
        if (!PlayerFactory.isPlaying()) PlayerFactory.start(song, scope.songs);
          else if ( PlayerFactory.isPlaying() ) PlayerFactory.pause();
          else PlayerFactory.resume();
      };

      scope.getPercent = function () {
        return PlayerFactory.getProgress() * 100;
      }
      console.log("heeeeeey", scope);
    }
  }
})
