/**
 * Created by kevin on 16-7-11.
 */
!function(){

    var app = angular.module('myApp', []);
    app.controller('myCtrl', function($scope) {
        $scope.article = [];
        $scope.clock_num = '';
        var git = new Github({username:"526371075@qq.com",password:"q2670187",auth:"basic"});
        var repo = git.getRepo("noobfan-kevin","noobfan-kevin.github.io");
        var options = {
            author: {name: 'kevin', email: 'author@example.com'},
            committer: {name: 'kevin', email: 'committer@example.com'},
            encode: true // Whether to base64 encode the file. (default: true)
        };
        var _data = [
            {
                value: 10,
                color:"#F1A325"
            },
            {
                value : 10,
                color : "#F1A325"
            },
            {
                value : 10,
                color : "#F1A325"
            },
            {
                value : 10,
                color : "#F1A325"
            },
            {
                value : 10,
                color : "#F1A325"
            },
            {
                value: 10,
                color:"#F1A325"
            },
            {
                value : 10,
                color : "#F1A325"
            },
            {
                value : 10,
                color : "#F1A325"
            },
            {
                value : 10,
                color : "#F1A325"
            },
            {
                value : 10,
                color : "#F1A325"
            },
            {
                value : 10,
                color : "#F1A325"
            },
            {
                value : 10,
                color : "#F1A325"
            }

        ];
        var _data_ = [
            {
                value: 1,
                color:"#38B03F"
            },
            {
                value : 1,
                color : "#353535"
            }
        ];
        var _option = {
            percentageInnerCutout: 95
        };
        var one = document.getElementById("myChartOne").getContext("2d");
        var Hours = new Chart(one).Pie(_data,{});
        var two = document.getElementById("myChartTwo").getContext("2d");
        var Mins = new Chart(two).Doughnut(_data_,_option);
         new Promise(function(resolve,reject){
             repo.read('master', 'dataFile/indexData.json', function(err, data) {
                 var __data__ = JSON.parse(data);
                 resolve(__data__);

             });
         }).then(function(info){
             for(x in info){
                 var data = {};
                 data.title = info[x].artName;
                 data.editor = info[x].artUser;
                 data.detail = info[x].artDetail.split('##');
                 data.src = info[x].artSrc;
                 $scope.article.push(data);
             }
             $scope.$apply($scope.article);
         }).catch(function(err){
             console.log(err);
         });

        var _date = new Date();
        var hours = (_date.getHours()>12?_date.getHours()-12:_date.getHours()); //获取当前小时数(0-23)
        var minutes = _date.getMinutes(); //获取当前分钟数(0-59)
        var seconds = _date.getSeconds(); //获取当前秒数(0-59)
        console.log(Hours.segments);
        Hours.segments[hours].fillColor = '#EA644A';
        Mins.segments[0].value = minutes;
        Mins.segments[1].value = 60-minutes;
        Hours.update();
        Mins.update();
        $('.seconds').css({"height":4*seconds});
        setInterval(function(){
            var new_sec = new Date().getSeconds();
            $('.seconds').css({"height":4*new_sec});
            if(new_sec==0){
                Mins.segments[0].value +=1;
                Mins.segments[1].value -= 1;
                if(Mins.segments[0].value==60){
                    Mins.segments[0].value = 0;
                    Mins.segments[1].value = 60;
                    Hours.segments[hours].fillColor = '#F1A325';
                    hours+=1;
                    Hours.segments[hours].fillColor = '#EA644A';
                    Hours.update();

                }
                Mins.update();

            }
            $('#clock-num').html((hours>10?hours:'0'+hours)+
            ':'+(Mins.segments[0].value>10?Mins.segments[0].value:'0'+Mins.segments[0].value)+
            ':'+(new_sec>10?new_sec:'0'+new_sec));
        },1000);
    });
}();