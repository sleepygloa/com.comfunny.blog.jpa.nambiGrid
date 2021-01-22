
var blogJs = function(){
	"use strict";

	var proCd = "";
	var proNm = "blog";

	var $grid = $('#blogGrid');

	return {
		init : function(){

			fnEvents();

			fnList();

			fnCategoryA();


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
    		}
        })
	}

}();

$(document).ready(function(){
	blogJs.init();
})