(function () {
    angular.module(QuizUp).controller('QuestionViewerController', ['$scope','$http', '$api', function ($scope, $http, $api) {
        let questionView = this;

        questionView.questions = [];
        questionView.courses = [];
        questionView.sections = [];

        questionView.getQuestions = function () {
            $http.get($api.base + $api.question.get).then(function (result) {
                questionView.questions = result.data.data;
            }, function (error) {
                console.log(error);
            })
        };

        questionView.getCourses = function () {
            $http.get($api.base + $api.course.get).then(function (result) {
                questionView.courses = result.data.data;
            }, function (error) {
                console.log(error);
            })
        };

        questionView.getSection = function () {
            $http.get($api.base + $api.section.getByCourseId + "?id=" + questionView.courseId).then(function (result) {
                questionView.sections = result.data.data;
            }, function (error) {
                console.log(error);
            })
        };

        questionView.getCourses();
        questionView.getQuestions();


    }])
})();