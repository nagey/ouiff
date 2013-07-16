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

    if ($routeParams.userId) {
      user.getProfile($routeParams.userId, function (profile) {
        $scope.profile = profile;
        media.mediaByUser($scope.profile.username, mediaCallback);

        if(!$scope.profile.profilePicture){
          $scope.profile.profilePicture = "images/profile-default.png";
        }
        if(!$scope.profile.profileList){
          $scope.profile.profileList = ["instagram"];
        }

        console.log('ProfileCtrl profile:', $scope.profile);
      });
    }
    else {
      user.status(function(status){
        if (status.loggedIn) {
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
    $scope.profileClick = function (item){
      //$location.prevPath = $location.path();
      $location.path('/profile/'+ item.user.username);
    };

  };

  ProfileCtrl.$inject = ["$scope", "$location", "user", "media", "$routeParams"];

  return ProfileCtrl;
});

