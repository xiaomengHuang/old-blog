/**
 * Created by kevin on 16-7-11.
 */
!function(){

    var app = angular.module('myApp', ['ngRoute']);
    app.controller('myCtrl', [ '$scope', function($scope) {
            $scope.nav_active = sessionStorage.getItem('nav_active')||0;
            $scope.ulClick = function(num){
                $scope.nav_active = num;
                sessionStorage.setItem('nav_active',num);
            }
    }]);

    app.provider('Repo',function(){
        this.$get = function() {
            return {
                getRepoObj : function(){
                    var git = new Github({username:"526371075@qq.com",password:"q2670187",auth:"basic"});
                    return git.getRepo("noobfan-kevin","noobfan-kevin.github.io");
                }
            }
        };
    });

    //app.factory('a',function(){
    //    return {
    //        getInfo : function(fileName){
    //            var git = new Github({username:"526371075@qq.com",password:"q2670187",auth:"basic"});
    //            var repo = git.getRepo("noobfan-kevin","noobfan-kevin.github.io");
    //        }
    //    }
    //});

    app.directive("mynav", function() {
            return {
                restrict: 'E',
                template : '<ul class="nav navbar-nav nav-list">\
                    <li ng-click="ulClick(0)" ng-class="{0:\'active\',1:\'\',2:\'\',3:\'\',4:\'\'}[nav_active]"><a href="#/">主页 <span class="sr-only">(current)</span></a></li>\
                    <li ng-click="ulClick(1)" ng-class="{0:\'\',1:\'active\',2:\'\',3:\'\',4:\'\'}[nav_active]"><a href="#/life">生活小记</a></li>\
                    <li ng-click="ulClick(2)" ng-class="{0:\'\',1:\'\',2:\'active\',3:\'\',4:\'\'}[nav_active]"><a href="#/tec">技术积累</a></li>\
                    <li ng-click="ulClick(3)" ng-class="{0:\'\',1:\'\',2:\'\',3:\'active\',4:\'\'}[nav_active]"><a href="#/moves">影评</a></li>\
                    <li ng-click="ulClick(4)" ng-class="{0:\'\',1:\'\',2:\'\',3:\'\',4:\'active\'}[nav_active]"><a href="#/blogTemp">博客模板</a></li>\
                    </ul>',
                replace: true
            };
        });

    app.controller('myIndexCtrl', [ '$scope','Repo', function($scope,Repo) {
        $scope.article = [];
        $scope.clock_num = '';
        //var options = {
        //    author: {name: 'kevin', email: 'author@example.com'},
        //    committer: {name: 'kevin', email: 'committer@example.com'},
        //    encode: true // Whether to base64 encode the file. (default: true)
        //};
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
        Repo.getRepoObj().read('master', 'dataFile/indexData.json', function(err, data) {
            var __data__ = JSON.parse(data);
            for(x in __data__){
                var _data = {};
                _data.title = __data__[x].artName;
                _data.editor = __data__[x].artUser;
                _data.detail = __data__[x].artDetail.split('##');
                _data.src = __data__[x].artSrc;
                $scope.article.push(_data);
            }
            $scope.$apply($scope.article);

        });
        //TODO cause IE not support Promise，so ...IE is shit
        //new Promise(function(resolve,reject){
        //    Repo.getRepoObj().read('master', 'dataFile/indexData.json', function(err, data) {
        //        var __data__ = JSON.parse(data);
        //        resolve(__data__);
        //
        //    });
        //}).then(function(info){
        //    for(x in info){
        //        var data = {};
        //        data.title = info[x].artName;
        //        data.editor = info[x].artUser;
        //        data.detail = info[x].artDetail.split('##');
        //        data.src = info[x].artSrc;
        //        $scope.article.push(data);
        //    }
        //    $scope.$apply($scope.article);
        //}).catch(function(err){
        //    console.log(err);
        //});

        var _date = new Date();
        var hours = (_date.getHours()>12?_date.getHours()-12:_date.getHours()); //获取当前小时数(0-23)
        var minutes = _date.getMinutes(); //获取当前分钟数(0-59)
        var seconds = _date.getSeconds(); //获取当前秒数(0-59)
        //console.log(Hours.segments[hours],'fillcolor.sdasasd',hours);
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
                    hours+=1;
                    hours>=12? hours = 0:hours;
                    Hours.segments[hours].fillColor = '#EA644A';
                    Hours.update();

                }
                Mins.update();

            }
            $('#clock-num').html((hours>9?hours:'0'+hours)+
                ':'+(Mins.segments[0].value>9?Mins.segments[0].value:'0'+Mins.segments[0].value)+
                ':'+(new_sec>9?new_sec:'0'+new_sec));
        },1000);
    }]);

    app.controller('myTecCtrl',['$scope', function($scope){
        $scope.tec_Carousel = [];
        var setting = {
            time:5000,
            ulClass:'HXM-tec-lunBo-ul'
        };
        $('.HXM-tec-lunBo').Carousel(setting);
    }]);

    app.controller('myLifeCtrl',['$scope', function($scope){
            console.log('life page');
            }]);

    app.config(['$routeProvider', function($routeProvider){

        $routeProvider
            .when('/',{
                templateUrl:'./templates/index-temp.html'})
            .when('/tec',{
                templateUrl:'./templates/tec-temp.html'})
            .when('/life',{
                templateUrl:'./templates/life-temp.html'})
            .otherwise({redirectTo:'/'});
    }]);

}();