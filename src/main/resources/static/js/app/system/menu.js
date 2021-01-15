var menuJs = function(){
	
	var $grid = $('#menuGrid');
	
	return {
		init : function(){
			
			fnList();
			
//			getEvents();
		}
	}
	
	function fnList(){
		$grid.fnList({
			programId 	: 'menu',
			programNm 	: '메뉴', 
			editable 	: true,
			viewContents : false,
			viewContentsRe : false,
			colOption	: [
				{id:'menuSeq', 		    title:'번호', 			type:"text", width:"50px"},
				{id:'menuParentSeq', 	title:'부모번호',		type:"select", width:"50px"},
//				{id:'proCd', 			title:'프로그램코드',	    type:"text", width:"100px"},
				{id:'menuNm', 			title:'메뉴명', 		    type:"text", width:"150px"},
				{id:'menuUrl',			title:'URL', 			type:"text", width:"150px"},
				{id:'menuIcon', 		title:'아이콘경로',		type:"text", width:"250px"},
				{id:'menuOrder', 		title:'순번',			type:"text", width:"50px"},
				{id:'useYn', 			title:'사용여부', 		type:"select",  width:"50px"},
				{id:'blogYn', 			title:'블로그여부', 		type:"select", width:"50px"},
			],
			btn			: ['addRow', 'delRow', 'saveRow']
		});
	}
	
    function fnComboPIdx(){

    }
	
}();


$(document).ready(function(){
	menuJs.init();
})