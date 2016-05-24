'use strict';

juke.directive('myPlayer', function(PlayerFactory){
	return {
		restrict: 'EA',
		templateUrl: 'js/player/player-template.html',
		link: function(scope, element, attr){
			angular.extend(scope, PlayerFactory); // copy props from param2 to param1

			scope.toggle = function () {
				if ( PlayerFactory.isPlaying() ) PlayerFactory.pause();
				else PlayerFactory.resume();
			};

			scope.getPercent = function () {
				return PlayerFactory.getProgress() * 100;
			}
		}
	}
})