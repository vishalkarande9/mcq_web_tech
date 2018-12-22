(function () {

    angular.module(QuizUp).controller('SectionsController', ['$scope','$api', '$http', '$userService','$filter', function ($scope, $api, $http, $userService,$filter) {

        var sc = this;
        $scope.arrsection=[];
        $scope.arrcourse=[];
        $http.get($api.base + $api.course.get).then(function (result) {
            if (result.status === 200) {
                $scope.arrcourse=result.data.data;
                sc.sectionFields[2].templateOptions.options=$scope.arrcourse;
                //$scope.sections.course_title = result.data[0]
            }else{
            }
        }, function (error) {

        });
        sc.alerts = [];
        sc.action = "create";
        $scope.get=function()
        {
            $http.get($api.base + $api.section.get).then(function (result) {
                if (result.status === 200) {
                    $scope.arrsection=result.data.data

                }else{
                }
            }, function (error) {

            });

        };


        $scope.get();

        sc.addAlert = function (message, type) {
            sc.alerts.push({message: message, type: type});
        };

        sc.closeAlert = function (index) {
            sc.alerts.splice(index, 1);
        };
        sc.create = function () {
            $scope.filteredArr = $filter('filter')($scope.arrcourse, {
                _id: $scope.sc.sections.course_title
            });

            sc.data={

                "section_title":sc.sections['section_title'],
                "section_description":sc.sections['section_description'],
                "course_details":{"course_id":sc.sections['course_title'],
                "course_title":$scope.filteredArr[0].course_title}
            };

            $http.put($api.base + $api.section.put, sc.data).then(function (result) {
                if (result.status === 200) {
                    sc.addAlert("Section added successfully","success");
                    sc.courses={};
                    $scope.get();
                    sc.sections=[]

                }
            }, function (error) {
                sc.addAlert("Course could not be added. Please Try Again!");
            });
            sc.options.resetModel();
        };

        sc.options = {
            formState: {
                awesomeIsForced: false
            }
        };

        $scope.delete = function(id) {

            if (confirm('Are you sure you want to delete this section?'))
            {

            //alert(JSON.stringify(cc.data))
                $http.delete($api.base + $api.section.del, {params: {_id: id}}).then(function (result) {
                    //alert(result.status);
                    if (result.status === 200) {
                        $scope.get();
                        sc.addAlert("Section deleted successfully", "success");

                    }
                }, function (error) {
                    sc.addAlert("Section could not be deleted. Please Try Again!");
                });
        }

        };
        sc.update=function(){
            $scope.filteredArr=[];
            $scope.filteredArr = $filter('filter')($scope.arrcourse, {
                _id: $scope.sc.sections.course_title
            });
            console.log($scope.filteredArr[0]._id);
            sc.data={

                "section_title":sc.sections['section_title'],
                "section_description":sc.sections['section_description'],
                "course_details":{"course_id":($scope.filteredArr[0]._id),
                    "course_title":$scope.filteredArr[0].course_title},
                "_id":sc.sections._id
            };
            $http.post($api.base + $api.section.post, sc.data).then(function (result) {
                if (result.status === 200) {
                    sc.addAlert("Section updated successfully","success");
                    $scope.get();
                    sc.sections=[]
                    sc.options.resetModel();
                    sc.action = "create";
                }
            }, function (error) {
                sc.addAlert("Section could not be updated. Please Try Again!");
            });
        }
        ;
        $scope.updateFromTable=function(stitle,descr,cid,sid){
            sc.sections.section_title=stitle;
            sc.sections.section_description=descr;
            sc.sections['course_title']=cid;
            sc.sections._id=sid;
            sc.action = "update";
        };

        sc.sectionFields = [
                             {
                        key: 'section_title',
                        type: 'input',
                        templateOptions: {
                            type: 'text',
                            label: 'Title',
                            // placeholder: 'Enter Your Username',
                            required: true
                        }
                    },
                    {
                        key: 'section_description',
                        type: 'input',
                        templateOptions: {
                            type: 'description',
                            label: 'Description',
                            //placeholder: 'Enter Your Password',
                            required: true
                        }
                    },
                    {
                        key: 'course_title',
                        type: 'select',
                        templateOptions: {
                            type: 'select',
                            label: 'Course Title',
                            valueProp:'_id',
                            labelProp: 'course_title',
                            placeholder: 'Select option',
                            options:[],
                            required: true,
                            visible:false,
                            "onChange": function () {
                                //console.log(this.options);
                            }
                        }
                    },
                ];
    }]);
})();