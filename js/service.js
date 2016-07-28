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
                    <li ng-click="ulClick(3)" ng-class="{0:\'\',1:\'\',2:\'\',3:\'active\',4:\'\'}[nav_active]"><a href="#/blogTemp">模板分享</a></li>\
                    <li ng-click="ulClick(4)" ng-class="{0:\'\',1:\'\',2:\'\',3:\'\',4:\'active\'}[nav_active]"><a href="#/noobfan">noobfan</a></li>\
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
            var len = 0;
            for(x in __data__){
                x>len?len=x:len;
            }
            for(;len>0;len--){
                var _data = {};
                if(__data__[len]){
                    _data.title = __data__[len].artName;
                    _data.editor = __data__[len].artUser;
                    _data.detail = __data__[len].artDetail.split('##');
                    _data.src = __data__[len].artSrc;
                    $scope.article.push(_data);
                }
            }
            $scope.$apply($scope.article);

        });

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

    app.controller('myTecCtrl',['$scope','Repo', function($scope,Repo){
        $scope.tec_Carousel = [];
        $scope.tec_articles = [];
        var setting = {
            time:5000,
            ulClass:'HXM-tec-lunBo-ul'
        };
        Repo.getRepoObj().read('master', 'dataFile/tec_carousel.json', function(err, data) {
            $scope.tec_Carousel=[];
            var __data__ = JSON.parse(data);
            for(x in __data__){
                var _data = {};
                _data.h2 = __data__[x].h2;
                _data.h3 = __data__[x].h3;
                _data.src = __data__[x].artSrc;
                $scope.tec_Carousel.push(_data);
            }
            $scope.$apply($scope.tec_Carousel);
            $('.HXM-tec-lunBo').Carousel(setting);
        });

        Repo.getRepoObj().read('master', 'dataFile/tec_articles.json', function(err, data) {
            $scope.tec_articles=[];
            var __data__ = JSON.parse(data);
            var _data;
            var len=0;
            for(x in __data__){
                x>len?len=x:len;
            }
            for(;len>0;len--){
                _data = {};
                if(__data__[len]){
                    _data.title = __data__[len].title;
                    _data.path = __data__[len].path;
                    _data.src = __data__[len].imgSrc;
                    _data.desc = __data__[len].desc;
                    $scope.tec_articles.push(_data);
                }
            }
            $scope.$apply($scope.tec_articles);
        });


        $scope.goTecDetail = function(path){
            location.href = '#/detail';
            sessionStorage.setItem('detailUrl',path);
        }
    }]);

    app.controller('myLifeCtrl',['$scope','Repo', function($scope,Repo){
        $scope.life_articles = [];
        Repo.getRepoObj().read('master','dataFile/life_articles.json', function(err, data) {
            var __data__ = JSON.parse(data);
            console.log(__data__);
            var _data;
            var len = 0;
            for(x in __data__){
                x>len?len=x:len;
            }
            for(;len>0;len--){
                _data = {};
                if(__data__[len]){
                    _data.src = __data__[len].img;
                    _data.desc = __data__[len].desc;
                    _data.time = __data__[len].time;
                    $scope.life_articles.push(_data);
                }
            }
            $scope.$apply($scope.life_articles);
        });
            console.log('life page');
    }]);

    app.controller('detailCtrl',['$scope','Repo', function($scope,Repo){
        $scope.detailInfo = {};
        $scope.detail = [];
        $scope.articleType = null;
        Repo.getRepoObj().read('master',sessionStorage.getItem('detailUrl'), function(err, data) {
            $scope.detailInfo={};
            var __data__ = JSON.parse(data);
            console.log(__data__);
            $scope.detailInfo.title = __data__.title;
            $scope.detailInfo.time = __data__.time;
            $scope.detailInfo.editor = __data__.editor;
            $scope.detailInfo.type = __data__.type;
            $scope.articleType = __data__.articleType;
            $scope.$apply($scope.detailInfo);
            Repo.getRepoObj().read('master',__data__.md, function(err, data) {
                $('#art-detail').html(markdown.toHTML(data));
            });

        });
        console.log('detail page');
        console.log(sessionStorage.getItem('detailUrl'));
    }]);

    app.controller('blogTempCtrl',['$scope','Repo', function($scope,Repo){
        $scope.blog_temps = [];
        $scope.downloadUrl = 'https://github.com/noobfan-kevin/noobfan-kevin.github.io/blob/master/';
        $('.temp-img').off('click').on('click',function(){
            $(this).parent().parent().addClass('img-active').siblings().removeClass('img-active');
        });

        Repo.getRepoObj().read('master','dataFile/temp-share.json', function(err, data) {
            var __data__ = JSON.parse(data);
            var _data;
            for(x in __data__){
                _data = {};
                _data.img = __data__[x].img;
                _data.src = __data__[x].src;
                _data.desc = __data__[x].desc;
                _data.title = __data__[x].title;
                _data.download = $scope.downloadUrl+__data__[x].src;
                $scope.blog_temps.push(_data);
            }
            $scope.$apply($scope.blog_temps);
        });
    }]);

    app.controller('noobfanCtrl',['$scope','Repo', function($scope,Repo){
        Repo.getRepoObj().read('master','dataFile/test.md', function(err, data) {
            console.log(data);
            var html = markdown.toHTML(data);
            $('#test').html(html);
        });
    }]);
    app.config(['$routeProvider', function($routeProvider){

        $routeProvider
            .when('/',{
                templateUrl:'./templates/index-temp.html'})
            .when('/tec',{
                templateUrl:'./templates/tec-temp.html'})
            .when('/life',{
                templateUrl:'./templates/life-temp.html'})
            .when('/detail',{
                templateUrl:'./templates/article-detail.html'
            })
            .when('/blogTemp',{
                templateUrl:'./templates/blog-temp.html'
            })
            .when('/noobfan',{
                templateUrl:'./templates/noobfan.html'
            })
            .otherwise({redirectTo:'/'});
    }]);

}();