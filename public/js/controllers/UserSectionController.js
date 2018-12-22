(function () {
    angular.module(QuizUp).controller('UserSectionController', ['$scope', '$api', '$http', '$userService', '$state', '$stateParams', function ($scope, $api, $http, $userService, $state, $stateParams) {

        let vm = this;
        /*

        vm.populateCards = function () {

            vm.cards=[{
                course_title:"maths",
                course_description:"description 1"
            },{
                course_title:"science",
                course_description:"description 2"
            },{
                course_title:"history",
                course_description:"description 3"
            },{
                course_title:"physics",
                course_description:"description 4"
            },{
                course_title:"geog",
                course_description:"description 5"
            },{
                course_title:"civics",
                course_description:"description 6"
            }];
            //  console.log(vm.cards.length)
        }

        vm.populateCards()
        */


        $scope.paramOne = $stateParams.paramOne;
        $scope.paramTwo = $stateParams.paramTwo;

        vm.course_title= $scope.paramOne;
        vm.sectionCards = $scope.paramTwo;


        vm.getQuestions = function (section_title,difficulty_level,course_id,section_id) {
           // let emailId = localStorage.getItem('emailId');
           // console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%",emailId);
            //get question

            $http.get("http://localhost:3000/api/question/getByCourseSectionDifficulty",{params: {course_id: course_id,section_id:section_id,difficulty_level:difficulty_level}}).then(function (result) {
                if (result.status === 200) {
                    vm.question=result.data.data;
                    $state.go("QuizQuestions",{
                        user_id: 1,
                        paramOne: section_title ,
                        paramTwo: vm.question
                    });


                }else{
                    alert(result.data.message);
                }
            }, function (error) {
                //cc.addAlert("Registration Failed. Please Try Again!");
            });

        }



        /*

        vm.alerts = [];

        vm.addAlert = function (message, type) {
            vm.alerts.push({message: message, type: type});
        };

        vm.closeAlert = function (index) {
            vm.alerts.splice(index, 1);
        };

        vm.register = function () {
            $http.post($api.base + $api.account.register, vm.registration).then(function (result) {
                if (result.status === 201) {
                    vm.addAlert("Registration Successful","success");
                    $state.go("Login");
                }else{
                    vm.addAlert("\"Registration Failed. Please Try Again!\"","danger");
                }
            }, function (error) {
                vm.addAlert("Registration Failed. Please Try Again!");
            });
        };

        vm.registration = {};

        vm.registrationFields = [
            {
                key: 'username',
                type: 'input',
                templateOptions: {
                    type: 'text',
                    label: 'Username',
                    placeholder: 'Enter Your Username',
                    required: true
                }
            },
            {
                key: 'profile.first_name',
                type: 'input',
                templateOptions: {
                    type: 'text',
                    label: 'First Name',
                    placeholder: 'Enter Your First Name',
                    required: true
                }
            },
            {
                key: 'profile.last_name',
                type: 'input',
                templateOptions: {
                    type: 'text',
                    label: 'Last Name',
                    placeholder: 'Enter Your Last Name',
                    required: true
                }
            },
            {
                key: 'password',
                type: 'input',
                templateOptions: {
                    type: 'password',
                    label: 'Password',
                    placeholder: 'Enter Your Password',
                    required: true
                }
            },
            {
                key: 'confirm_password',
                type: 'input',
                optionsTypes: [
                    "matchField"
                ],
                model: {},
                templateOptions: {
                    type: 'password',
                    label: 'Confirm Password',
                    placeholder: 'Enter Your Password Again',
                    required: true
                },
                data: {
                    fieldToMatch: "password",
                    modelToMatch: vm.registration
                }
            },
            {
                key: 'email',
                type: 'input',
                templateOptions: {
                    type: 'email',
                    label: 'Email',
                    placeholder: 'Enter Your Email Address',
                    required: true
                }
            },
        ];
        */
    }]);
})();