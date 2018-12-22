(function () {


    angular.module(QuizUp).directive('hasAccess', ['$authenticationService', '$rootScope', 'removeElement', function ($authenticationService, $rootScope, removeElement) {


        let run = function (scope, element, attributes) {
            let hasAccess = false;
            const allowedAccess = attributes.hasAccess.split(" ");
            if ($rootScope.currentUser) {
                for (let i = 0; i < allowedAccess.length; i++) {
                    if ($rootScope.currentUser.user.roles.indexOf(allowedAccess[i]) !== -1) {
                        hasAccess = true;
                        break;
                    }
                }
            }
            if (!hasAccess) {
                angular.forEach(element.children(), function (child) {
                    removeElement(child);
                });
                removeElement(element);
            }else{
                angular.forEach(element.children(), function (child) {
                    $(child).removeClass("ng-hide");
                });
                $(element).removeClass("ng-hide");
            }
        };

        return {
            restrict: 'A',
            link: function (scope, element, attributes) {
                run(scope, element, attributes);
                $rootScope.$on('authenticated', function () {
                    run(scope, element, attributes);
                });
            }
        }
    }]).constant('removeElement', function (element) {
        element && element.addClass && element.addClass("ng-hide");
    });
})();