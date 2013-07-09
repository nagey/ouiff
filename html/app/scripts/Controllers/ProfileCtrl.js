/*global define, console */
define(['angular', 'jquery'], function () {
    'use strict';

    return function ProfileCtrl($scope, $location, $routeParams, user, media) {
        user.status(function(status){
          $scope.videos = [];

          if(status.loggedIn){
            console.log('ProfileCtrl user profile',status.profile);
            $scope.profile = status.profile;
            media.mediaByUser('dasmart', function(videos){
              console.log(videos);
              $scope.videos = videos;
            });
          }else{
            $location.path('/login');
          }
        });

        $scope.imgClick = function (item){
          $location.path('/watch/'+ item.id);
        };
    };
});