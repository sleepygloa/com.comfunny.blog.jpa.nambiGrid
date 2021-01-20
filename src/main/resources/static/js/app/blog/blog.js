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
					{id:'title',   	    title:'제목',width:"500px"},
					{id:'url',   	    title:'Github',width:"500px"}
				],
				viewContents : true,
				viewContentsRe : true,
				markdown : true,
				btn			: ['insert', 'update', 'save', 'delete', 'github']
			});

	  }

}();

$(document).ready(function(){
	blogJs.init();
})