/*global define, console */
define(['angular', 'jquery'], function () {
  'use strict';

  var ProfileCtrl = function ($scope, $rootScope, $location, user, media, $routeParams) {

    var mediaCallback = function(videos){
      $scope.videos = videos;
      $scope.loading = false;
    },
    setSocial = function (profile){
      console.log('profile',profile);
      if(profile.socialLinks){
        $scope.hasInstagram = ('instagram' in profile.socialLinks);
        $scope.hasFacebook  = ('facebook'  in profile.socialLinks);
        $scope.hasTwitter   = ('twitter'   in profile.socialLinks);
      }
    };

    $scope.loading = true;
    $scope.videos = [];
    $scope.empty = "No films available";

    if ($routeParams.userId) {
      user.getProfile($routeParams.userId, function (profile) {
        $scope.profile = profile;
        setSocial(profile);

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
          $scope.activeUser = true;
          $scope.profileClass = "activeUser";
          $scope.profile = status.profile;
          setSocial(status.profile);
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

    $scope.authClick = function (service){
      if($scope.activeUser){
        $rootScope.$broadcast('connectService', service);
      }
    };

  };

  ProfileCtrl.$inject = ["$scope", "$rootScope", "$location", "user", "media", "$routeParams"];

  return ProfileCtrl;
});

