function blogChileListToggle(count){
	var listCss = $('.blogSubject_'+count);
	if(listCss.is(":visible")){
		listCss.css('display', 'none');
	}else{
		listCss.css('display', 'block');
	}

}
var blogJs = function(){
	"use strict";

	var proCd = "";
	var proNm = "blog";

	var $grid = $('#blogGrid');

	return {
		init : function(){

			fnEvents();

			fnList();

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
					{id:'categoryA', 	title:'분류',width:"100px"},
					{id:'categoryB', 	title:'분류',width:"100px"},
					{id:'categoryC', 	title:'분류',width:"100px"},
					{id:'hashIndex', 	title:'분류',width:"100px"},
					{id:'subject',   	title:'제목',width:"500px"}
				],
				viewContents : true,
				viewContentsRe : true,
				btn			: ['insert', 'update', 'save', 'delete']
			});

	  }

}();

$(document).ready(function(){
	blogJs.init();
})