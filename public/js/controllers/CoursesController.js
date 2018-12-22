(function () {
    angular.module(QuizUp).controller('CoursesController', ['$scope', '$api', '$http', 'formlyVersion', function ($scope, $api, $http, formlyVersion) {
        const cc = this;
        cc.test = [];
        cc.env = {
            angularVersion: angular.version.full,
            formlyVersion: formlyVersion
        };
        cc.action = 'create';
        console.log(cc.action);
        $scope.get = function () {
            $http.get($api.base + $api.course.get).then(function (result) {
                if (result.status === 200) {
                    $scope.test = result.data.data
                } else {
                }
            }, function (error) {
                //cc.addAlert("Registration Failed. Please Try Again!");
            });

        };
        $scope.get();

        cc.alerts = [];
        cc.addAlert = function (message, type) {
            cc.alerts.push({message: message, type: type});
        };

        cc.closeAlert = function (index) {
            cc.alerts.splice(index, 1);
        };

        cc.create = function () {

            $http.put($api.base + $api.course.put, cc.courses).then(function (result) {
                if (result.status === 200) {
                    cc.addAlert("Course added successfully", "success");
                    cc.courses = {};
                    $scope.get()

                }
            }, function () {
                cc.addAlert("Course could not be added. Please Try Again!");
            });

        };

        cc.options = {
            formState: {
                awesomeIsForced: false
            }
        };


        $scope.delete = function (id) {
            if (confirm('Are you sure you want to delete this course?')) {

                cc.data = {
                    "_id": id
                };
                //cc.data =JSON.stringify(cc.data);

                //alert(JSON.stringify(cc.data))
                $http.delete($api.base + $api.course.del, {params: {_id: id}}).then(function (result) {
                    //alert(result.status);
                    if (result.status === 200) {
                        $scope.get();
                        cc.addAlert("Course deleted successfully", "success");

                    }
                }, function () {
                    cc.addAlert("Course could not be deleted. Please Try Again!");
                });
            }

        };

        //$scope.CourseList=[];
        cc.update = function () {
            $http.post($api.base + $api.course.post, cc.courses).then(function (result) {
                if (result.status === 200) {
                    cc.addAlert("Course updated successfully", "success");
                    $scope.get();
                    cc.options.resetModel();
                    cc.action = 'create';
                }
            }, function () {
                cc.addAlert("Course could not be updated. Please Try Again!");
            });
        };

        $scope.updateFromTable = function (title, descr, code, id) {
            cc.action = 'update';
            cc.courses.course_title = title;
            cc.courses.course_description = descr;
            cc.courses.course_code = code;
            cc.courses._id = id;
        };

        cc.courses = {};
        cc.coursesFields = [
            {
                key: 'course_title',
                type: 'input',
                templateOptions: {
                    type: 'text',
                    label: 'Title',
                    placeholder: 'Enter Course Title',
                    required: true
                }
            },
            {
                key: 'course_description',
                type: 'input',
                templateOptions: {
                    type: 'description',
                    label: 'Description',
                    //placeholder: 'Enter Course Description',
                    required: true
                }
            },
            {
                key: 'course_code',
                type: 'input',
                templateOptions: {
                    type: 'input',
                    label: 'Code',
                    placeholder: 'Enter Course Code',
                    required: true
                }
            },
        ];
    }]);
})();