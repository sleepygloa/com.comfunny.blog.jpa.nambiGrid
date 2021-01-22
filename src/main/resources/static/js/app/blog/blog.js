
var blogJs = function(){
	"use strict";

	var proCd = "";
	var proNm = "blog";

	var $grid = $('#blogGrid');

	return {
		init : function(){

			fnEvents();

			fnList();

			//fnCategoryA();


		}
	}

	function fnEvents(){
	}

    function fnList(){
         $grid.fnList({
             programId 	: 'blog',
             programNm 	: '블로그',
             editable 	: false,
             colOption	: [
                 {id:'idx', 		    title:'순번', width:"50px"},
                 {id:'title',   	    title:'제목',width:"500px"},
                 {id:'url',   	    title:'Github',width:"500px"}
             ],
             viewContents : true,
             viewContentsRe : true,
             markdown : true,
             btn			: ['insert', 'update', 'save', 'delete', 'github']
         });

   }

	function fnCategoryA(){
    	$.ajax({
    	    type        : "GET",
    		url         : "/i/blog/listCategory",
    		dataType    : "json",
    		contentType : "application/json; charset=utf-8",
    		success     : function(result){
    		    console.log(result);

    		    //카테고리A
    		    var categoryA = new Array();
    		    //카테고리C
                var categoryB = new Array();
    		    //카테고리C
                var categoryC = new Array();

                for(var i = 0; i < result.length; i++){
                    categoryA.push(result[i].categoryA);
                    categoryB.push(result[i].categoryB);
                    categoryC.push(result[i].categoryC);
                }


    		    categoryA = categoryA.reduce(function(a,b){if(a.indexOf(b)<0)a.push(b);return a;},[]);
    		    categoryB = categoryB.reduce(function(a,b){if(a.indexOf(b)<0)a.push(b);return a;},[]);
    		    categoryC = categoryC.reduce(function(a,b){if(a.indexOf(b)<0)a.push(b);return a;},[]);

    		    //카테고리A
    		    for(var i = 0; i < categoryA.length; i++){
    		        $('#blogCategoryAList').append($('<option value="'+categoryA[i]+'">'));
    		    }
    		    //카테고리B
    		    for(var i = 0; i < categoryB.length; i++){
    		        $('#blogCategoryBList').append($('<option value="'+categoryB[i]+'">'));
    		    }
    		    //카테고리C
    		    for(var i = 0; i < categoryC.length; i++){
    		        $('#blogCategoryCList').append($('<option value="'+categoryC[i]+'">'));
    		    }
    		}
        })
	}

}();

$(document).ready(function(){
	blogJs.init();
})