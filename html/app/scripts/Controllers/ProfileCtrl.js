/*global define, console */
define(['angular', 'jquery'], function () {
  'use strict';

  var ProfileCtrl = function ($scope, $location, user, media, $routeParams) {

    $scope.loading = true;
    $scope.videos = [];

    var mediaCallback = function(videos){
      console.log(videos);
      $scope.videos = videos;
      $scope.loading = false;
    };

    if ($routeParams.userId) {
      user.getProfile($routeParams.userId, function (profile) {
        $scope.profile = profile;
        media.mediaByUser($scope.profile.username, mediaCallback);
      });
    }
    else {
      user.status(function(status){
        if (status.loggedId) {
          console.log('ProfileCtrl user profile',status.profile);
          $scope.profile = status.profile;
        }
        else{
          $location.path('/login');
        }
        media.mediaByUser($scope.profile.username, mediaCallback);
      });
    }

    $scope.imgClick = function (item){
      $location.prevPath = $location.path();
      $location.path('/watch/'+ item.id);
    };

  };

  ProfileCtrl.$inject = ["$scope", "$location", "user", "media", "$routeParams"];

  return ProfileCtrl;
});

