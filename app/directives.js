/// <reference path="node_modules/angular/angular.js" />
/// <reference path="App.js" />
app.directive('repository', function () {
    return {
        restrict: 'E',
        template: '<span>{{repos.name}} - <a ng-href="{{repos.url}}">{{repos.url}}</a></span>',
        scope: { repos: "=repos" }
    };
});