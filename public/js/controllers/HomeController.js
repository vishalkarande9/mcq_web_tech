(function () {
    angular.module(QuizUp).controller('HomeController', ['$scope', '$rootScope', '$authenticationService', '$state', function ($scope, $rootScope, $authenticationService, $state) {

        let homeController = this;

        let authenticate = function () {
            if ($authenticationService.IsLoggedIn()) {
                homeController.user = $rootScope.currentUser.user;
            }
        };

        authenticate();

        $rootScope.$on('authenticated', authenticate);


        homeController.logout = function () {
            $authenticationService.ClearCredentials();
            homeController.user = null;
            $state.go("Home", {reload: true});
        }

    }]);
})();