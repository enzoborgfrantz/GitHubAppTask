/// <reference path="node_modules/angular/angular.js" />
/// <reference path="App.js" />
app.service('gitHubService', function ($http) {

    this.get = function (UserName) {
        var url = "https://api.github.com/users/" + UserName + "/repos";
        return $http.get(url);
    }
});