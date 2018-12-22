(function () {

    angular.module(QuizUp).config(['$stateProvider','$urlRouterProvider', function ($stateProvider,$urlRouterProvider) {

        const homeState = {
            name: 'Home',
            url: '/',
            templateUrl: 'pages/home/index.html',
            isAuthenticationRequired : false,
            controller: 'HomeController as homeController'
        };

        const contactState = {
            name: 'Contact',
            url: '/Contact',
            templateUrl: 'pages/home/contact.html',
            isAuthenticationRequired : false,
            controller: 'ContactController as contact'
        };

        const aboutState = {
            name: 'About',
            url: '/About',
            templateUrl: 'pages/home/about.html',
            isAuthenticationRequired : false
        };

        const accountLoginState = {
            name: 'Login',
            url: 'account/login',
            templateUrl: 'pages/account/login.html',
            isAuthenticationRequired : false,
            controller: 'LoginController as vm'
        };

        const accountRegistrationState = {
            name: 'Registration',
            url: 'account/register',
            templateUrl: 'pages/account/register.html',
            isAuthenticationRequired : false,
            controller: 'RegistrationController as vm'
        };

        const accountProfile = {
            name: 'Profile',
            url: 'account/profile',
            templateUrl: 'pages/account/profile.html',
            isAuthenticationRequired: true,
            controller: 'ProfileController as vm'
        };
        //Prathamesh added
        const CoursesAdmin = {
            name: 'Courses',
            url: '/courses',
            templateUrl: 'pages/Admin/Courses.html',
            isAuthenticationRequired: true,
            controller: 'CoursesController as cc'};

        const SectionAdmin = {
            name: 'Sections',
            url: '/sections',
            templateUrl: 'pages/Admin/Sections.html',
            isAuthenticationRequired: true,
            controller: 'SectionsController as sc'
        };

        const QuestionAdmin = {
            name: 'Questions',
            url: '/questions',
            templateUrl: 'pages/Admin/Questions.html',
            isAuthenticationRequired: true,
            controller: 'QuestionsController as qc'
        };


        const QuestionViewer= {
            name: 'QuestionViewer',
            url: '/questions/viewer',
            templateUrl: 'pages/Admin/QuestionView.html',
            isAuthenticationRequired: true,
            controller: 'QuestionViewerController as questionView'
        };

        const userHome = {
            name: 'UserHome',
            url: '/quiz',
            templateUrl: 'pages/user/quiz.html',
            isAuthenticationRequired: false,
            controller: 'UserHomeController as vm'
        };


        const userSection = {
            name: 'Section',
            url: '/quiz/section',
            templateUrl: 'pages/user/section.html',
            isAuthenticationRequired: false,
            controller: 'UserSectionController as vm',
            params: {
                paramOne: "defaultValueOne" ,
                paramTwo: "defaultValueTwo"
            }
        };

        const userQuestions = {
            name: 'QuizQuestions',
            url: '/quiz/question',
            templateUrl: 'pages/user/question.html',
            isAuthenticationRequired: false,
            controller: 'QuizQuestionsController as vm',
            params: {
                paramOne: "defaultValueOne" ,
                paramTwo: "defaultValueTwo"
            }
        };


        $stateProvider.state(homeState);

        $stateProvider.state(aboutState);

        $stateProvider.state(accountRegistrationState);

        $stateProvider.state(accountLoginState);

        $stateProvider.state(accountProfile);

        $stateProvider.state(CoursesAdmin);

        $stateProvider.state(SectionAdmin);

        $stateProvider.state(QuestionAdmin);

        $stateProvider.state(contactState);

        $stateProvider.state(QuestionViewer);

        $stateProvider.state(userHome);

        $stateProvider.state(userSection);

        $stateProvider.state(userQuestions);
    }]);

})();