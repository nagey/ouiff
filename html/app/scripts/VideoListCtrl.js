/*global define */
define(['angular', 'jquery'], function (angular, $) {
    'use strict';

    return function VideoListCtrl($location, $scope) {
      console.log("loaded bestof");

      $scope.bestOfList = [
      	{user: 'Alex', desc: "Alex Retro sustainable McSweeney's meggings #15sFest", imgUrl: 'images/suki.jpeg'},
      	{user: 'Stefan', desc: "Stefan Retro sustainable McSweeney's meggings #15sFest", imgUrl: 'images/suki.jpeg'},
      	{user: 'Robel', desc: "Robel Retro sustainable McSweeney's meggings #15sFest", imgUrl: 'images/suki.jpeg'},
      	{user: 'Mark', desc: "Mark Retro sustainable McSweeney's meggings #15sFest", imgUrl: 'images/suki.jpeg'}
      ];

      $scope.featuredList = [
        {user: 'Eduardo', desc: "Eduardo Retro sustainable McSweeney's meggings #15sFest", imgUrl: 'images/suki.jpeg'},
        {user: 'Zeee', desc: "Zeee Retro sustainable McSweeney's meggings #15sFest", imgUrl: 'images/suki.jpeg'}
      ];

      $scope.latestList = [
        {user: 'Paul', desc: "Paul Retro sustainable McSweeney's meggings #15sFest", imgUrl: 'images/suki.jpeg'},
        {user: 'Becca', desc: "Becca Retro sustainable McSweeney's meggings #15sFest", imgUrl: 'images/suki.jpeg'}
      ];

    };
});