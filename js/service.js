/**
 * Created by kevin on 16-7-11.
 */
!function(){

        angular.module('myApp', ['ngRoute'])
        .controller('myCtrl', [ '$scope', function($scope) {
            $scope.nav_active = 0;
            $scope.ulClick = function(num){
                $scope.nav_active = num;
            }
    }])
        .config(['$routeProvider', function($routeProvider){
        $routeProvider
            .when('/',{
                templateUrl:'./templates/index-temp.html'})
            .when('/tec',{
                templateUrl:'./templates/tec-temp.html'})
            .when('/life',{
                templateUrl:'./templates/life-temp.html'})
            .otherwise({redirectTo:'/'});
    }])
            .directive("mynav", function() {
            return {
                restrict: 'E',
                template : '<ul class="nav navbar-nav nav-list">\
                    <li ng-click="ulClick(0)" ng-class="{0:\'active\',1:\'\',2:\'\',3:\'\'}[nav_active]"><a href="#/">主页 <span class="sr-only">(current)</span></a></li>\
                    <li ng-click="ulClick(1)" ng-class="{0:\'\',1:\'active\',2:\'\',3:\'\'}[nav_active]"><a href="#/life">生活博客</a></li>\
                    <li ng-click="ulClick(2)" ng-class="{0:\'\',1:\'\',2:\'active\',3:\'\'}[nav_active]"><a href="#/tec">技术积累</a></li>\
                    <li ng-click="ulClick(3)" ng-class="{0:\'\',1:\'\',2:\'\',3:\'active\'}[nav_active]"><a href="#/moves">影评</a></li>\
                    </ul>',
                replace: true
            };
        })
        .controller('myIndexCtrl', [ '$scope', function($scope) {
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
        console.log(Hours.segments[hours],'fillcolor.sdasasd',hours);
        if(hours == 12){
            Hours.segments[0].fillColor = '#EA644A';
        }else{
            Hours.segments[hours].fillColor = '#EA644A';
        }
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
                    hours>=12? hours = 0:hours;
                    Hours.segments[hours].fillColor = '#F1A325';
                    console.log(hours,'1111');
                    hours+=1;
                    console.log(hours,'2222');
                    hours>=12? hours = 0:hours;
                    console.log(hours,'3333');
                    Hours.segments[hours].fillColor = '#EA644A';
                    Hours.update();

                }
                Mins.update();

            }
            $('#clock-num').html((hours>9?hours:'0'+hours)+
                ':'+(Mins.segments[0].value>9?Mins.segments[0].value:'0'+Mins.segments[0].value)+
                ':'+(new_sec>9?new_sec:'0'+new_sec));
        },1000);
    }])
            .controller('myTecCtrl',['$scope', function($scope){
                console.log('tec page');
            }])
            .controller('myLifeCtrl',['$scope', function($scope){
            console.log('life page');
            }]);

}();