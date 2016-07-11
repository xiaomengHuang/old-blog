/**
 * Created by kevin on 16-7-11.
 */
!function(){

    var app = angular.module('myApp', []);
    app.controller('myCtrl', function($scope) {
        $scope.article = [];
        var git = new Github({username:"526371075@qq.com",password:"q2670187",auth:"basic"});
        var repo = git.getRepo("noobfan-kevin","noobfan-kevin.github.io");
        var options = {
            author: {name: 'kevin', email: 'author@example.com'},
            committer: {name: 'kevin', email: 'committer@example.com'},
            encode: true // Whether to base64 encode the file. (default: true)
        };

         new Promise(function(resolve,reject){
             repo.read('master', 'dataFile/indexData.json', function(err, data) {
                 var __data__ = JSON.parse(data);
                 resolve(__data__);

             });
         }).then(function(info){
             for(x in info){
                 var data = {};
                 data.title = info[x].artName;
                 data.detail = info[x].artDetail.split('##');
                 data.src = info[x].artSrc;
                 $scope.article.push(data);
             }
             $scope.$apply($scope.article);
         }).catch(function(err){
             console.log(err);
         });


    });
}();