(function () {

    angular.module(QuizUp).controller('QuestionsController', ['$scope', '$api', '$http', '$userService', '$filter', function ($scope, $api, $http, $userService, $filter) {

        var qc = this;
        $scope.arrsection = [];

        $scope.arrcourse = [];
        qc.env = {
            angularVersion: angular.version.full,
            //formly: formlyVersion
        };

        //$scope.arrsection=[{"section_id":,"section_title":"Asian Continents"}]
        $http.get($api.base + $api.course.get).then(function (result) {
            if (result.status === 200) {
                $scope.arrcourse = result.data.data

                qc.questionFields[0].templateOptions.options = $scope.arrcourse;
                //$scope.sections.course_title = result.data[0]
            } else {
            }
        }, function (error) {

        });
        qc.alerts = [];

        qc.addAlert = function (message, type) {
            qc.alerts.push({message: message, type: type});
        };

        qc.closeAlert = function (index) {
            qc.alerts.splice(index, 1);
        };
        qc.create = function () {
            $scope.filteredArr = [];
            $scope.filteredArrSec = []
            $scope.filteredArr = $filter('filter')($scope.arrcourse, {
                _id: qc.questions.course_title
            });
            console.log("after course: ", $scope.filteredArr[0]._id)
            //console.log("Test ",qc.questions.section_title)
            $scope.filteredArrSec = $filter('filter')($scope.arrsection, {
                section_id: qc.questions.section_title
            });

            console.log(qc.questions);
            console.log(qc.questionFields);

            qc.data = {
                "section_details":
                    {
                        "section_id": qc.questions.section_id,
                        "section_title": $("option:selected", qc.questionFields[1].formControl.$$element).text()
                    },
                "course_details":
                    {
                        "course_id": qc.questions.course_id,
                        "course_title": $("option:selected", qc.questionFields[0].formControl.$$element).text()
                    },
                "question": qc.questions['question'],
                "option": [{
                    "option_number": 1,
                    "option_value": qc.questions['option_number_1'],
                    "answer": false
                },
                    {
                        "option_number": 2,
                        "option_value": qc.questions['option_number_2'],
                        "answer": false
                    },
                    {
                        "option_number": 3,
                        "option_value": qc.questions['option_number_3'],
                        "answer": false
                    },
                    {
                        "option_number": 4,
                        "option_value": qc.questions['option_number_4'],
                        "answer": false
                    }],
                "difficulty_level": qc.questions['difficulty_level']
            };
            qc.data.option[parseInt(qc.questions.name)].answer=true;
            console.log(qc.data);
            $http.put($api.base + $api.question.put, qc.data).then(function (result) {
                if (result.status === 200) {
                    qc.addAlert("Question added successfully", "success");
                    qc.questions = {}
                    //$scope.get()
                    qc.sections = []

                }
            }, function (error) {
                qc.addAlert("Question could not be added. Please Try Again!");
            });

        };

        qc.options = {
            formState: {
                awesomeIsForced: false
            }
        };

        $scope.delete = function (id) {


            //alert(JSON.stringify(cc.data))
            $http.delete($api.base + $api.section.del, {params: {_id: id}}).then(function (result) {
                //alert(result.status);
                if (result.status === 200) {
                    $scope.get();
                    qc.addAlert("Section deleted successfully", "success");

                }
            }, function (error) {
                qc.addAlert("Section could not be deleted. Please Try Again!");
            });

        };

        let getSections = function (courseId) {
            $http.get($api.base + $api.section.getByCourseId + "?id=" + courseId).then(function (data) {
                $scope.arrsection = data.data.data;
                qc.questionFields[1].templateOptions.options = $scope.arrsection;
            }, function (error) {

            })
        };

        qc.update = function () {
            $scope.filteredArr = []
            $scope.filteredArr = $filter('filter')($scope.arrcourse, {
                _id: $scope.sc.sections.course_title
            });
            console.log($scope.filteredArr[0]._id)
            qc.data = {

                "section_title": sc.sections['section_title'],
                "section_description": sc.sections['section_description'],
                "course_details": {
                    "course_id": ($scope.filteredArr[0]._id),
                    "course_title": $scope.filteredArr[0].course_title
                },
                "_id": sc.sections._id
            }
            $http.post($api.base + $api.section.post, sc.data).then(function (result) {
                if (result.status === 200) {
                    qc.addAlert("Section updated successfully", "success");
                    $scope.get()
                    qc.questions = []

                }
            }, function (error) {
                qc.addAlert("Section could not be updated. Please Try Again!");
            });
        }
        $scope.updateFromTable = function (stitle, descr, cid, sid) {
            //alert("hello")
            qc.sections.section_title = stitle;
            qc.sections.section_description = descr;
            qc.sections['course_title'] = cid;
            qc.sections._id = sid;
            console.log(id)
        };

        qc.questionFields = [
            {
                key: 'course_id',
                type: 'select',
                templateOptions: {
                    type: 'select',
                    label: 'Course Title',
                    valueProp: '_id',
                    labelProp: 'course_title',
                    placeholder: 'Select Section',
                    defaultOptions: 'Select Value',
                    options: [],
                    required: true,
                    visible: false,
                    "onChange": function($viewValue, $modelValue, $scope) {
                        console.log($viewValue, $modelValue, $scope);
                        getSections(qc.questions.course_id);
                        //console.log($scope.arrsection[0].section_title)
                        //console.log(this.options);
                    }
                }
            },
            {
                key: 'section_id',
                type: 'select',
                templateOptions: {
                    valueProp: '_id',
                    labelProp: 'section_title',
                    type: 'select',
                    label: 'Section Title',
                    options: [],
                    //placeholder: 'Enter Your Password',
                    required: true
                }
            },
            {
                key: 'question',
                type: 'textarea',
                templateOptions: {
                    theme: "custom",
                    type: 'textarea',
                    label: 'Question',
                    // valueProp:'_id',
                    // labelProp: 'course_title',
                    placeholder: 'Enter Question',
                    options: [],
                    required: true,
                },

            },

            {
                className: 'row',
                fieldGroup: [
                    // {
                    //     className: 'col-xs-1',
                    //     type: 'radio',
                    //     key: 'chkbox_1',
                    //     "defaultValue": false,
                    //
                    //     templateOptions: {
                    //         //label: 'A'
                    //     }
                    // },
                    {
                        className: 'col-xs-4',
                        type: 'textarea',
                        key: 'option_number_1',
                        templateOptions: {
                            placeholder: 'Enter answer 1'
                        }
                    },
                    // {
                    //     className: 'col-xs-1',
                    //     type: 'checkbox',
                    //     key: 'chkbox_2',
                    //     "defaultValue": false,
                    //     templateOptions: {
                    //         //label: 'A'
                    //     }
                    // },
                    {
                        className: 'col-xs-4',
                        type: 'textarea',
                        key: 'option_number_2',
                        templateOptions: {
                            placeholder: 'Enter answer 2'
                        },
                    }]
            },

            {
                className: 'row',
                fieldGroup: [
                    // {
                    //     className: 'col-xs-1',
                    //     type: 'checkbox',
                    //     key: 'chkbox_3',
                    //     "defaultValue": false,
                    //     templateOptions: {
                    //         //label: 'A'
                    //     }
                    // },
                    {
                        className: 'col-xs-4',
                        type: 'textarea',
                        key: 'option_number_3',
                        templateOptions: {
                            placeholder: 'Enter answer 3'
                        }
                    },
                    // {
                    //     className: 'col-xs-1',
                    //     type: 'checkbox',
                    //     "defaultValue": false,
                    //     key: 'chkbox_4',
                    //     templateOptions: {
                    //         //label: 'A'
                    //     }
                    // },
                    {
                        className: 'col-xs-4',
                        type: 'textarea',
                        key: 'option_number_4',
                        templateOptions: {
                            placeholder: 'Enter answer 4'
                        },
                    }]
            },
            {
                type: "radio",
                key: "name",
                templateOptions: {
                    label: "Select correct Option",
                    theme: "custom",
                    labelProp: "OptionNumber",
                    valueProp: "id",
                    options: [
                        {OptionNumber: "Option 1", id: 0},
                        {OptionNumber: "Option 2", id: 1},
                        {OptionNumber: "Option 3", id: 2},
                        {OptionNumber: "Option 4", id: 3},
                    ]
                }
            },
            {
                key: 'difficulty_level',
                type: 'select',
                templateOptions: {
                    type: 'select',
                    label: 'Difficulty Level',
                    //valueProp:'_id',
                    //labelProp: 'course_title',
                    placeholder: 'Select option',
                    options: [{
                        "name": "Easy",
                        "value": 0
                    },
                        {
                            "name": "Medium",
                            "value": 1
                        },
                        {
                            "name": "Difficult",
                            "value": 2
                        }],
                    required: true,
                    visible: false,
                    "onChange": function () {
                        //console.log(this.options);
                    }
                }
            }
        ];
    }]);
})();