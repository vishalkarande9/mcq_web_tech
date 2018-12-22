(function () {
    angular.module(QuizUp).controller('QuizQuestionsController', ['$scope', '$api', '$http', '$userService', '$state', '$stateParams', function ($scope, $api, $http, $userService, $state, $stateParams) {

        let vm = this;
        window.history.pushState(null, "", window.location.href);
        window.onpopstate = function() {
            window.history.pushState(null, "", window.location.href);
        };

        vm.OnSubmitAnswer = function (questionArr) {

            let finalArr=[];
            $(document).ready(function(){

                    var check = true;
                    $("input:radio").each(function(){
                        var name = $(this).attr("name");
                        if($("input:radio[name="+name+"]:checked").length == 0){
                            check = false;
                        }
                    });

                    if(check){
                      //  alert('One radio in each group is checked.');

                        for(let i=0;i<questionArr.length;i++){
                            let value;
                            let optionName = questionArr[i]._id;
                          //  console.log(optionName);
                            value = $('input[name='+optionName+']:checked').val();
                            finalArr.push({
                                question_id:questionArr[i]._id,
                                option_number:parseInt(value),
                                course_id:questionArr[i].course_details.course_id,
                                section_id:questionArr[i].section_details.section_id,
                                difficulty_level:questionArr[i].difficulty_level
                            })
                        }

                        $http.post("http://localhost:3000/api/exam/submit", finalArr).then(function (result) {
                            if (result.status === 200) {
                                alert("Your score is " + result.data.data.final_score);
                                $state.go("Profile");

                            }
                        }, function (error) {
                            console.log("inside error");
                        });



                      //  console.log("finalArr :",finalArr);

                    }else{
                        alert('Please select one option in each question.');
                    }

            });

        }




        $scope.paramOne = $stateParams.paramOne;
        $scope.paramTwo = $stateParams.paramTwo;

        vm.section_title= $scope.paramOne;
        vm.question = $scope.paramTwo;







    }]);
})();