/// <reference path="node_modules/angular/angular.js" />
/// <reference path="App.js" />
app.controller('gitHubController', function ($scope, gitHubService) {

    var userName = $scope.userName; // User being searched
    var errorMessage = ""; // if an error occurs, it will be stored here

    // function to get user's repositories
    $scope.get = function (UserName) {
        $scope.errorMessage = ""; // reset the error message
        $scope.repos = []; // create container for user's repositories

        if (!UserName) {
            $scope.errorMessage = "Please enter a user name.";
        }
        else {
            var promiseGetUser = gitHubService.get(UserName);
            promiseGetUser.then(function (pl) {
                if (pl.data.length >= 1) // if the user has at least one repository
                {

                     for (var i = 0; i < pl.data.length; i++) // loop through all the repositories
                     {
                         $scope.repos.push({ name: pl.data[i].name, url: pl.data[i].html_url }); // push repositories to array
                     }
                }
                else // the user has no repositories
                {
                    $scope.errorMessage = "User has no repositories"; // update error message
                }
            },
            function (errorPl) // an error has occured
            {
                // check whether api is not responding or the user doesn't exist
                if (errorPl.status == 404) // 404 indicates that user doesn't exist
                {
                    $scope.errorMessage = "The user does not exist."; // update error message
                }
                else if (errorPl.status == 444) // 444 indicates that the api is not responding 
                {
                    $scope.errorMessage = "Api is not responding."; //update error message
                }
                else  //something else has gone wrong
                {
                    $scope.errorMessage = "An unexpected error has occured."; //update error message
                }

            })
        }
    }
});