
var blogJs = function(){
	"use strict";

	var proCd = "";
	var proNm = "blog";

	var $grid = $('#blogGrid');
	return {
		init : function(){

            leftMenu(7);

			fnEvents();

			blogJs.fnList();

		},
        fnList : function(url){
             $grid.fnList({
                 programId 	: 'blog',
                 programNm 	: '블로그',
                 editable 	: false,
                 viewContents : true, //board, markdown, form
                 viewContentsRe : true,
                 markdown : true,
                 url     : url, //undefined, menuUrl
                 colOption	: [
                     {id:'idx', 		    title:'순번', width:"50px"},
                     {id:'title',   	    title:'제목',width:"500px"}
                 ],

                 btn			: ['insert', 'update', 'save', 'delete', 'github', 'imgUpload']
             });
        }
	}

	function fnEvents(){
	}




}();

$(document).ready(function(){
	blogJs.init();
})