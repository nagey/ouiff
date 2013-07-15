/*global define, console */
define(['angular', 'jquery'], function () {
  'use strict';

  var ProfileCtrl = function ($scope, $location, user, media, $routeParams) {

    $scope.loading = true;
    $scope.videos = [];

    var mediaCallback = function(videos){
      $scope.videos = videos;
      $scope.loading = false;
    };
    console.log('ProfileCtrl',$routeParams.userId);

    if ($routeParams.userId) {
      user.getProfile($routeParams.userId, function (profile) {
        $scope.profile = profile;
        media.mediaByUser($scope.profile.username, mediaCallback);
      });
    }
    else {
      user.status(function(status){
        console.log('ProfileCtrl',status)
        if (status.loggedIn) {
          $scope.profile = status.profile;
        }
        else{
          $location.path('/login');
        }
        console.log('ProfileCtrl username', $scope.profile)
        media.mediaByUser($scope.profile.username, mediaCallback);
      });
    }

    $scope.imgClick = function (item){
      $location.prevPath = $location.path();
      $location.path('/watch/'+ item.id);
    };
    $scope.profileClick = function (item){
      //$location.prevPath = $location.path();
      $location.path('/profile/'+ item.user.username);
    };

  };

  ProfileCtrl.$inject = ["$scope", "$location", "user", "media", "$routeParams"];

  return ProfileCtrl;
});

