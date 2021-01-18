
var trCnt = -1;


var initData = '';
var blogData = '';
var s_userId = null;

function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type:mimeString});
}

//콤보박스 만들기
function fnMakeCombo(targetStr, data){
    $.ajax({
        url      : "/ctrl/settings/code/listCodeCombo",
        data     : {
        	codeGroupCd:data
    	},
        type     : "POST",
        dataType : "json",
        async	 : false,
        success  : function(result) {
        	
        	var targetEl = $('#'+targetStr);
        	targetEl.empty();
        	var str = '';
    		for ( var i = 0; i < result.length ; i++){
    			str += '<option value="'+result[i].NAME+'">'+result[i].VALUE+'</option>'
    		}
    		targetEl.append(str);
        }
    });
}
var clickCnt = -1; //클릭시 행번호
var rowId = -1;
var rowColNm = "";
var contentLength = 0;
var focusIdx = -1;
function fnSaveIdx(i){
	focusIdx = i;
}
function fnSaveReIdx(el){
	console.log(el)
}




(function(window, $, undefined){


    var tableInitData = {}
    //그리드 초기화
    $.fn.fnList = function(data){

        data["uProgramId"] = data["programId"].charAt(0).toUpperCase() + data["programId"].slice(1);
        tableInitData = data;

        /**********************
        * 기본 div 세팅
        ***********************/
        var container = $('#'+tableInitData.programId+'Container');
        if(tableInitData.viewContents){
            if($('#'+tableInitData.programId+'View').length == 0) container.append($('<div id="blogView" class="viewContainer col-xs-w100" style="margin-bottom:20px;" />'));
            if($('#'+tableInitData.programId+'ViewHidden').length == 0) container.append($('<div id="blogView" style="width:0px;height:0px; z-index=0;" />'));
        }

        if(tableInitData.markdown){
            if($('#'+tableInitData.programId+'Md').length == 0) container.append($('<div id="'+tableInitData.programId+'Md" />'));

            getViewMarkdownForm();
        }
        if(tableInitData.viewContentsRe){
            if($('#'+tableInitData.programId+'Re').length == 0) container.append($('<div id="blogRe" class="col-xs-w100"  />'));
        }


        //그리드 스트링.
    	var grid = '';

    	var colName = new Array();
    	var colRow = new Array();
    	var colOption = data.colOption;

    	/**********************
    	* 데이터 세팅
    	**********************/
    	var btn = data.btn;

    	var $element = '';
    	var navi = '';

    	var editable = false;
    	if(data.editable) editable = data.editable;
    	tableInitData.editableFlag = false;

    	//그리드 상단 그룹 버튼
    	var gridDivContainer = $('<div class="col-xs-w100" style="margin-bottom:50px;"/>');
    	
            //페이지 타이틀
            var divPageTitle = $('<div class="col-xs-w100" />');
            var divPageTitleH = $('<h5 class="card-title mb-4">'+data.programNm + '관리'+'</h5>');

            divPageTitle.append(divPageTitleH);
            gridDivContainer.append(divPageTitle);
    	
    	//그리드 버튼 그룹
    	var divBtnGroup = $('<div class="col-xs-w100" />');

    	var gridBtnGrpList = $('<div class="col-xs-w100" />');
	    	if(data.btn != undefined){
	    		for(var i = data.btn.length - 1; i >= 0; i--){
	        		var btnName = data.btn[i];
	        		if(btnName == 'search'){
                        gridBtnGrpList.append($('<a href="#" id="'+data.programId+'SearchBtn" class="btn btn-save btn-sm pull-right" >검색</a>'));
	        		}else if(btnName == 'insert'){
	        		    rowId = 0;
	        		    var insert = $('<a href="#"  class="btn btn-save btn-sm pull-right" >글 추가</a>');
	        		    insert.on('click', function(){
                            getView('INSERT', 0);
	        		    })
                        gridBtnGrpList.append(insert);
	        		}else if(btnName == 'update'){
	        		    var update = $('<a href="#"  class="btn btn-update btn-sm pull-right" >글 수정</a>');
	        		    update.on('click', function(){
                            getView('UPDATE', parseInt($('.td_row_s_'+rowId+'_idx').text()));
	        		    })
                        gridBtnGrpList.append(update);
	        		}else if(btnName == 'delete'){
	        		    var del = $('<a href="#" id="'+data.programId+'DeleteBtn" class="btn btn-delete btn-sm pull-right" >글 삭제</a>');
                        del.on('click', function(){
                            if(confirm("삭제 하시겠습니까?")){
                                blogDelete(parseInt($('.td_row_s_'+rowId+'_idx').text()));
                            }
                        })

	        		    gridBtnGrpList.append(del);
	        		}else if(btnName == 'save'){
	        		    var save = $('<a href="#" id="'+data.programId+'SaveBtn" class="btn btn-save btn-sm pull-right" >글 저장</a>');
                        save.on('click', function(){
                            if(confirm("저장 하시겠습니까?")){
                                if(tableInitData.viewContents){
                                    blogSave(parseInt($('.td_row_s_'+rowId+'_idx').text()));
                                }else if(tableInitData.markdown){
                                    blogSaveMd(parseInt($('.td_row_s_'+rowId+'_idx').text()));
                                }
                            }
                        })

	        		    gridBtnGrpList.append(save);
	        		}else if(btnName == 'addRow'){
	        		    var addRow = $('<a href="#" id="'+data.programId+'AddRowBtn" class="btn btn-add btn-sm pull-right" >행 추가</a>');
                        addRow.on('click', function(){
                            blogAddRow();
                        })

	        		    gridBtnGrpList.append(addRow);
	        		}else if(btnName == 'delRow'){
	        		    gridBtnGrpList.append($('<a href="#" id="'+data.programId+'DelRowBtn" class="btn btn-delete btn-sm pull-right" >행삭제</a>'));
	        		}else if(btnName == 'saveRow'){
	        		    var save = $('<a href="#" id="'+data.programId+'SaveRowBtn" class="btn btn-save btn-sm pull-right" >행 저장</a>');
                        save.on('click', function(){
                            if(confirm("저장 하시겠습니까?")){
                                blogSaveRow(parseInt($('.td_row_s_'+rowId+'_idx').text()));
                            }
                        })

	        		    gridBtnGrpList.append(save);
	        		}
	        	}
	    	}
    	divBtnGroup.append(gridBtnGrpList);
//    	gridDivContainer.append(divBtnGroup);


        /***************************
        * 테이블
        ****************************/
    	var table = $('<table id="'+data.programId+'Table" class="table center-aligned-table table-hover tableScrollX" />');

    	//테이블 헤더
    	var thead = $('<thead />');
    	var thtr = $('<tr />');
//    		thtr.addClass('text-primary');

    	var ththData = '';
    	//flag

		//flag End
        if(tableInitData.editable){
            ththData += '<th style="width:50px;">'+' '+'</th>';
        }

    	for(var i = 0; i < data.colOption.length; i++){
			var tdTitle = '', tdWidth = '100px', tdHidden = false, tdHiddenCss = 'show';
            (data.colOption[i].title != '' ? tdTitle = data.colOption[i].title : tdTitle = data.colOption[i].id);
            (data.colOption[i].width != '' ? tdWidth = data.colOption[i].width : tdWidth = '');
            (data.colOption[i].hidden != '' ? tdHidden = data.colOption[i].hidden : tdHidden = false);
            if(tdHidden) tdHiddenCss = 'none';
    		ththData += '<th style="width:'+tdWidth+'; display:'+tdHiddenCss+'">'+tdTitle+'</th>';
    	}
    	var thth = $(ththData);
    	thead.append(thth);

        var tbody = $('<tbody id="'+data.programId+'Tbody" />');

        table.append(thead);
        table.append(tbody);
        //table End

        //버튼 그룹과 테이블 그룹을 한 div로 합침.
        var tableParentDiv = $('<div class="col-xs-w100"/>');
        tableParentDiv.append(table);
        divBtnGroup.append(tableParentDiv);
        gridDivContainer.append(divBtnGroup);

        //타이틀, 테이블 버튼, 테이블 화면에 그림.
//    	gridDivContainer.append(tableParentDiv);
        $('#'+data.programId+'Grid').html(gridDivContainer);

        getDataList();




    	//첫행 블러오기
//    	if(tableInitData.data1.length > 0) getView('VIEW', 0);
    }

    //데이터셋만 재조회
    function getDataList(){
    	//그리드 컬럼 만드는 로직
    	$.ajax({
    	    type:"GET",
    		url : "/i/"+tableInitData.programId + "/list",
    		dataType : "json",
    		contentType:"application/json",
    		async : false,
    		success : function(result){
    		    trCnt = -1;
                tableInitData.dtData1 = result;
                tableInitData.dtInitData1 = JSON.parse(JSON.stringify(result));
                tableInitData.dtInitDataLength = tableInitData.dtInitData1.length;

                /**
                 * Grid Option
                 * Row 에 대한 IDX 값 세팅
                 * tr 시작
                 *
                 * ViewContents == true; --> 글보기
                 * ViewContents == false; --> 글보기 없음
                 * */
                var tbody = $('#'+tableInitData.programId+'Tbody');
                tbody.empty();

                for(var i = 0; i < tableInitData.dtData1.length; i++){
                    blogAddRow();
                }


                //데이터 입력
                getList();

                return;
    		},
    		error : function(){
    		},
    		fail : function(){}
    	});
    }

    //데이터 넣기
    function getList(){
        var result = tableInitData.dtData1;

        for(var i = 0; i < result.length; i++){
            var tbtr = $('<tr id="tr_row_'+i+'" class="tr_row_'+i+'" />');

            var rowData = result[i];
            var keyName = Object.keys(rowData);

            if(tableInitData.editable){
                for(var j = 0; j < keyName.length; j++){
                    if(keyName[j] == "flag"){
                        $('.td_row_s_'+i+'_flag').text(result[i].flag);
                        $('.td_row_i_'+i+'_flag').val(result[i].flag);

                        break;
                    }
                }
            }


            for(var j = 0; j < tableInitData.colOption.length; j++){
                $.each(rowData, function(k, v){
                    if(tableInitData.colOption[j].id == k){
                        var tbthspan = $('.td_row_s_'+i+'_'+k);
                        tbthspan.text(v);
                        var tbthinput = $('.td_row_i_'+i+'_'+k);
                        tbthinput.val(v);

                        return false;
                    }
                });
            }

        }
    }

    /******************************************************
    * dataSet flag 변경
    *******************************************************/
    function setDateSetFlag (idx){

        var flag = false;
        var initKey = Object.keys(tableInitData.dtInitData1[idx]);
        var curKey = Object.keys(tableInitData.dtData1[idx]);

        for(var i = 0; i < initKey.length; i++){
            if(initKey[i] == "flag") continue;
            for(var j = 0; j < curKey.length; j++){

                if(initKey[i] == curKey[j]){
                    if(tableInitData.dtInitData1[idx][initKey[i]] != tableInitData.dtData1[idx][curKey[i]]){
                        flag = true;
                    }
                    break;
                }
            }
        }
        if(flag) {
            if(trCnt >= tableInitData.dtInitDataLength){
                (tableInitData.dtData1[idx])["flag"] = "I";
            }else{
                (tableInitData.dtData1[idx])["flag"] = "U";
            }

        }else{
            (tableInitData.dtData1[idx])["flag"] = "";
        }
            getList();


    }

    /******************************************************
    * 글상세보기
    *******************************************************/
    function getView(flag, rowId){
			//컨텐츠 개수 초기화
	    	contentLength = 0;
	    	$.ajax({
				url	 	: "/i/"+tableInitData.programId + '/view',
				data    : {
				    "idx" : rowId
				},
				type 	: "GET",
				async	: false,
				contentType : 'application/json; charset=utf-8',
				success : function(result){
                    var dt_grid = result;

					//CSS
					$('#'+tableInitData.programId+'View').css({
						"padding-bottom"	: "20px",
						"border-bottom" 	: "0.5px solid gray",
						"display"           : "block"
					});

					//블로그 내용 초기화
					$('#'+tableInitData.programId+'View').empty();
					$('#'+tableInitData.programId+'ViewHidden').empty();

                    //flag 검사
                    if(flag == 'INSERT' || flag == 'UPDATE'){

                        var div = $('<div class="col-xs-w100" />');
                            var div2 = $('<div class="col-xs-w100" />');
                                var textBox = $('<a type="button" style="float:left" >글상자</a>');
                                textBox.on('click', function(){ fnAddTextBox('INSERT',  {}, 'TEXT'); });
                                var codeBox = $('<a type="button" class="blogUpdateFlag" style="float:left">코드</a>');
                                codeBox.on('click', function(){ fnAddTextBox('INSERT',  {}, 'CODE'); });
                                var imgBox = $('<a type="button" class="blogUpdateFlag" style="float:left">이미지</a>');
                                imgBox.on('click', function(){ fnAddImg('INSERT',  {}); });
                                var fileBox = $('<input id="blogImgAddBtn_input" type="file" style="display:none;" />');
                                var delBox = $('<a type="button" class="blogUpdateFlag" style="float:left">컨텐츠삭제</a>');
                                delBox.on('click', function(){ $('#row_'+focusIdx).remove(); });
                            div2.append(textBox).append(codeBox).append(imgBox).append(fileBox).append(delBox);
                        div.append(div2);
                        $('#'+tableInitData.programId+'View').append(div);
                    }

                    var div = $('<div class="col-xs-w100" />');
                        var div3 = $('<div class="col-xs-w100" style="margin-bottom:10px;" />');
                        var titleLabel = $('<span >제목</span>')
                        var titleBox = $('<input class="col-xs-w100" id="'+tableInitData.programId+'Title" style="border:0px; height:60px; font-size:30px;text-align:center;" />');
                        var div4 = $('<div class="col-xs-w100" />');
                        var categoryLabel = $('<span >카테고리</span>')
                        var categoryBox = $('<input  id="'+tableInitData.programId+'CategoryA" />');
                        //선택된 글 입력




                        //flag 검사
                            if(flag == 'UPDATE' || flag == 'VIEW'){
                                categoryBox.val(dt_grid[0].catagoryA);
                                titleBox.val(dt_grid[0].title);
                            }

                            //글 보기
                            if(flag == 'VIEW'){
                                categoryBox.attr('readonly', true);
                                titleBox.attr('readonly', true);
                            }


                        div3.append(titleLabel).append(titleBox);
                        div4.append(categoryLabel).append(categoryBox);
                    div.append(div3);
                    div.append(div4);

                    $('#'+tableInitData.programId+'View').append(div);

                    //flag 검사
                    if(flag == 'INSERT') return;

						//컨텐츠 입력(루프)
						for(var i = 0; i < dt_grid.length; i++){
                            if(dt_grid[i].type == 'IMG'){
                                fnAddImg(flag, dt_grid[i]);
                            }else if(dt_grid[i].type == 'CODE'){
                                fnAddTextBox(flag, dt_grid[i], dt_grid[i].TYPE);
                            }else{
                                fnAddTextBox(flag, dt_grid[i], dt_grid[i].TYPE);
                            }
						}

						//유저 세팅
						//lgSeS.userId = dt_grid[0].IN_USER_ID;
//						if(flag != 'VIEW' && $('#lgSes').val() == dt_grid[0].IN_USER_ID){
//							$('.'+programInitData.programId+'UpdateFlag').css('display', 'block');
//						}

				}
			})


    }

    /******************************************************
    * 그리드 행 추가
    *******************************************************/
    function blogAddRow(){
        trCnt++;
        rowId = trCnt;
        var tbody = $('#'+tableInitData.programId+'Tbody');
        var tbtr = $('<tr id="tr_row_'+trCnt+'" class="tr_row_'+trCnt+'" />');

        //글 상세 보기 속성 있을때 클래스 추가
        if(tableInitData.viewContents){
            tbtr.addClass('viewContents_'+tableInitData.dtData1[i].menuSeq);
        }

        var rowData = tableInitData.dtData1[0];
        var keyName = Object.keys(rowData);

        if(tableInitData.dtInitData1.length <= trCnt){
            var addRow = {}
            for(var j = 0; j < tableInitData.colOption.length; j++){
                $.each(rowData, function(k, v){

                    addRow[k] = ""

                });
            }
            tableInitData.dtInitData1[trCnt] = JSON.parse(JSON.stringify(addRow));
            tableInitData.dtData1[trCnt] = addRow

        }


        //플래그처리
        if(tableInitData.editable){

            tableInitData.dtData1[trCnt].flag = "";
            tableInitData.dtInitData1[trCnt].flag = "";
            var tbth = $('<td />');
            tbth.addClass('td_row_'+trCnt+'_flag');
            tbth.css('width', '50px');
            var tbthspan = $('<span class="td_row_s_'+trCnt+'_flag" style="display:show"></span>');
            var tbthinput = $('<input type="text" class="td_row_i_'+trCnt+'_flag"  style="display:none;width:100%" />');

            tbth.append(tbthspan);
            tbth.append(tbthinput);

            tbtr.append(tbth);
        }


        for(var j = 0; j < tableInitData.colOption.length; j++){
            $.each(rowData, function(k, v){
                var tdTitle = '';
                var tdWidth = '100px';
                var tdHidden = false;
                var tdHiddenCss = 'show';


                if(tableInitData.colOption[j].id == k){
                    (tableInitData.colOption[j].title != '' ? tdTitle = tableInitData.colOption[j].title : tdTitle = tableInitData.colOption[j].id);
                    (tableInitData.colOption[j].width != '' ? tdWidth = tableInitData.colOption[j].width : tdWidth = tdWidth);
                    (tableInitData.colOption[j].hidden != '' ? tdHidden = tableInitData.colOption[j].hidden : tdHidden = false);
                    if(tdHidden) tdHiddenCss = 'none';

                    var tbth = $('<td />');
                    tbth.addClass('td_row_'+trCnt+'_'+k);
                    tbth.css('width', tdWidth);
                    tbth.css('display', tdHiddenCss);
                    var tbthspan = $('<span class="td_row_s_'+trCnt+'_'+k+'" style="display:show"></span>');
                    var tbthinput = $('<input type="text" class="td_row_i_'+trCnt+'_'+k+'"  style="display:none;width:100%" />');

                    tbth.append(tbthspan);
                    tbth.append(tbthinput);

                    tbtr.append(tbth);


                    tbth.on('click', function(){
                        rowId = parseInt(tbth.attr('class').split('td_row_')[1]); //rowId 세팅
                        if(tableInitData.viewContents) getView('VIEW', parseInt($('.td_row_s_'+rowId+'_idx').text()));
                        if(tableInitData.viewContentsRe) {
                            var reBody = $('#'+tableInitData.programId+'Re')
                            reBody.empty();
                            getViewReContent('VIEW');
                        }

                    });

                    return false;
                }
            });
        }

        if(tableInitData.editable){
            tbtr.on('dblclick', function(e){
                rowId = $(this).attr('class').split('tr_row_')[1];
                clickCnt = rowId;

                $('input[class^="td_row_i_'+rowId+'"').on('change', function(e){

                    rowColNm = $(this).attr('class').split('td_row_i_'+rowId+'_')[1];
                    if(rowColNm == "flag" || rowColNm == undefined) return;;

                    $($(this).siblings()[0]).text($(this).val());

                    //데이터셋 변경
                    (tableInitData.dtData1[rowId])[rowColNm] = ($(this).val() == "" ? null : $(this).val());

                    setDateSetFlag(rowId);


                })

                if(!tableInitData.editableFlag){
                    $('input[class^="td_row_i_'+rowId+'"').css('display', 'block');
                    $('span[class^="td_row_s_'+rowId+'"').css('display', 'none');

                    tableInitData.editableFlag = true;
                }else{
                    $('input[class^="td_row_i_'+rowId+'"').css('display', 'none');
                    $('span[class^="td_row_s_'+rowId+'"').css('display', 'block');

                    rowId = -1;
                    tableInitData.editableFlag = false;
                }
            })

        }


        tbody.append(tbtr);

    }
    /******************************************************
    * 그리드 저장
    *******************************************************/
    function blogSaveRow(idx){

        var list = [];


        for(var i = 0; i < tableInitData.dtData1.length; i++){
            var data = tableInitData.dtData1[i];
            if(data.flag == "I" || data.flag == "D" || data.flag == "U"){
                list.push(data);
            }
        }


        $.ajax({
            url      : "/i/"+tableInitData.programId + "/saveRow",
            data     : JSON.stringify({"list":list}),
            type     : 'POST',
            contentType : 'application/json; charset=utf-8',
            success  : function() {

                alert("저장되었습니다.");
                getDataList();
            }
            ,error : function(){
                alert("error");
            }
        });
    }

    /******************************************************
    * 글 저장
    *******************************************************/
    function blogSave(idx){
        var list = [];
        var count = 0;
        for(var i = 0; i < contentLength; i++){

            //글(컨텐츠) 가 작성된 개수, 있을 때.
            if($('#row_'+i).val() == undefined){
                count++;
            }else{

                //데이터 세팅
                var initData = {
                        text		: $('#text_'+i).val(),
                        type			: $('#type_'+i).val(),
                        imgWidthScale	: $('#text_'+i).attr('width')
                }

                //이미지 일 경우
                if(initData.type == 'IMG'){

                    initData.text = $('#text_'+i).attr('src');
                    if(initData.imgWidthScale != ''){
                        initData.imgWidthScale = initData.imgWidthScale.replace(/[^0-9]/g,"");
                    }
                }

                //바인딩
                var	dataList = {
                        idx 			: idx,
                        pIdx 			: 0,
                        categoryA		: "q",
                        categoryB		: "q",
                        categoryC		: "q",
                        hashIndex       : "q",
                        i   			: i-count,
                        type 			: initData.type,
                        content 		: initData.text,
                        imgWidthScale 	: initData.imgWidthScale,
                        title : $('#'+tableInitData.programId+'Title').val()

                }
                list.push(dataList);
            }
        }

        $.ajax({
            url      : "/i/"+tableInitData.programId + "/save",
            data     : JSON.stringify({"list":list}),
            type     : 'POST',
            contentType : 'application/json; charset=utf-8',
            success  : function(data) {

                alert("저장되었습니다.");
                getDataList();
            }
        });
    }

    /******************************************************
    * 글 저장 (md)
    *******************************************************/
    function blogSaveMd(idx){
        var title = $('#'+tableInitData.programId+'Title').val();
        var content = $('#'+tableInitData.programId+'Content').val();
        var url = $('#'+tableInitData.programId+'Url').val();

        $.ajax({
            url      : "/i/"+tableInitData.programId + "/saveMd",
            data     : {
                idx : idx,
                title : title,
                content : content,
                url     : url
            },
            type     : 'POST',
            contentType : 'application/json; charset=utf-8',
            success  : function(data) {
                alert("저장되었습니다.");
                getDataList();
            }
        });
    }
    /******************************************************
    * 글 삭제
    *******************************************************/
    function blogDelete(rowId){
        $.ajax({
            url      : "/i/"+tableInitData.programId + "/delete",
            data     : {
            "idx": rowId
            },
            type     : 'DELETE',
            success  : function(data) {
                alert("삭제 되었습니다.");
                getDataList();
            }
        });
    }


    /******************************************************
    * 글 상자 자동조절 높이
    *******************************************************/
    function resize(obj) {
  	  obj.currentTarget.style.height = "50px";
  	  obj.currentTarget.style.height = (12+obj.target.scrollHeight)+"px";
  	}


    /******************************************************
    * 글 상자
    *******************************************************/
    function fnAddTextBox(flag, data, type){
    	var cnt = contentLength;

    	var divRowHidden = $('#'+tableInitData.programId+'ViewHidden');

                var childInput1 = $('<input type="hidden" id="idx_'+cnt+'" value="'+cnt+'" />');
                var childInput2 = $('<input type="hidden" id="type_'+cnt+'" value="TEXT" />');
                //타입값 지정.
                if(type == "TEXT"){
                    childInput2.val('TEXT');
                }else{
                    childInput2.val('CODE');
                }
    		divRowHidden.append(childInput1).append(childInput2);
    		
    		//삽입,수정
                var childTextArea = $('<textarea id="text_'+cnt+'" style="opacity:0;width:0px; height:0px;" />');

                childTextArea.text(data.content);
                childTextArea.on('keyup', function(e){
                    //resize(e);
                    $('#pre_'+cnt).text($('#text_'+cnt).val());
                });
            divRowHidden.append(childTextArea);



        	var divRow = $('<div id="row_'+cnt+'" class="col-xs-w100" />');
                var childTextAreaView = $('<div id="view_'+cnt+'" class="col-xs-w100" style="border:solid 0.5px gray;min-height:50px; padding:10px;" />');

                //글보기 아닐때만 가능
                if(flag == 'INSERT' || flag == 'UPDATE'){
                    childTextAreaView.on('click', function(){
                        $('#text_'+cnt).focus();
                    });
                }
                var childTextAreaViewPre = $('<pre id="pre_'+cnt+'" />');
                childTextAreaViewPre.text(data.content);

                childTextAreaView.append(childTextAreaViewPre);
                if(type == "CODE"){
                    childTextAreaView.css({
                        "background-color" 	: "gray",
                        "color"				: "white"
                    })
                }
            divRow.append(childTextAreaView);

            //row index 전역변수에 저장.
            divRow.click(function(){
                fnSaveIdx(cnt);
            })
    		
    		$('#'+tableInitData.programId+'View').append(divRow);
    		
	    	contentLength++;
	    	fnSaveIdx(contentLength);
    }
    
    /******************************************************
    * 이미지 상자
    *******************************************************/
    function fnAddImg(flag, data){
    	var cnt = contentLength;
    	var dd = $('<div id="row_'+contentLength+'" class="col-xs-w100" />');
    	
    	//쓰기, 수정
    	if(flag != "VIEW"){
    		var childInput0 = $('<input type="file" id="img_'+cnt+'" "display:none" />');
//    		var childInput0 = $('#'+tableInitData.programId+'ImgAddBtn_input');
    		childInput0.change(function(){
    			//이미지 변경
    		    if (this.files && this.files[0]) {
    		        var reader = new FileReader();
    		        
    		        reader.onload = function (e) {
    		        	
    		        	var img = new Image();
    		        	img.src = e.target.result;
    		        	img.onload = function(e){
        		        	var canvas = document.createElement("canvas"),
    		            	max_size = 640,
	    		            width = img.width,
	    		            height = img.height;

		        		if (width > height) {
		        			//가로가 길 경우
		        			if (width > max_size) {
		        				height *= max_size / width;
		        				width = max_size;
		        			}
		        		} else {
		        			//세로가 길 경우
		        			if (height > max_size) {
		        				width *= max_size / height;
		        				height = max_size;
		        			}
		        		}
		        		
		        		canvas.width = width;
		        		canvas.height = height;
		        		canvas.getContext("2d").drawImage(img, 0, 0, width, height);
		        		var dataUrl = canvas.toDataURL("image/jpeg");

    		            $('#text_'+cnt).attr('src', dataUrl);
    		        	$('#text_'+cnt).attr('width', '100%');
    		        	}
    		        	
//
    		        }
    		        reader.readAsDataURL(this.files[0]);
    		    }
    		});
    		if(flag == 'INSERT'){
    			childInput0.trigger('click');
    		}
    	}
		
		var childInput1 = $('<input type="hidden" id="idx_'+cnt+'" value="'+cnt+'" />');
		var childInput2 = $('<input type="hidden" id="type_'+cnt+'" value="IMG" />');
		dd.append(childInput1).append(childInput2);
		
		var childImg = $('<img id="text_'+cnt+'" />');
		if(flag != 'INSERT'){ //글보기와 글수정만
			childImg.attr('src', data.CONTENT);
			childImg.attr('width', data.IMG_WIDTH_SCALE+'%');			
		}

		
		dd.append(childImg);
		
		if(flag != "VIEW"){
			
    		dd.mouseover(function(){
    			$('.imgContWidth_'+cnt).css('display', 'block');
    		}).mouseleave(function(){
    			$('.imgContWidth_'+cnt).css('display', 'none');
    		}).click(function(){
    			fnSaveIdx(cnt);
    		})
			
			var childImgBtn1 = $('<button class="col-xs-w5 imgContWidth_'+cnt+'" style="display:none">10%</button>');
				childImgBtn1.click(function(){
					$('#text_'+cnt).attr('width', '10%');
				});
			var childImgBtn2 = $('<button class="col-xs-w5 imgContWidth_'+cnt+'" style="display:none">25%</button>');
				childImgBtn2.click(function(){
					$('#text_'+cnt).attr('width', '25%');
				});
			var childImgBtn3 = $('<button class="col-xs-w5 imgContWidth_'+cnt+'" style="display:none">50%</button>');
				childImgBtn3.click(function(){
					$('#text_'+cnt).attr('width', '50%');
				});
			var childImgBtn4 = $('<button class="col-xs-w5 imgContWidth_'+cnt+'" style="display:none">75%</button>');
				childImgBtn4.click(function(){
					$('#text_'+cnt).attr('width', '75%');
				});
			var childImgBtn5 = $('<button class="col-xs-w5 imgContWidth_'+cnt+'" style="display:none">100%</button>');
				childImgBtn5.click(function(){
					
					$('#text_'+cnt).attr('width', '100%');
				});
			
			dd	.append(childImgBtn1)
				.append(childImgBtn2)
				.append(childImgBtn3)
				.append(childImgBtn4)
				.append(childImgBtn5);
		}

    	
		
		$('#'+tableInitData.programId+'ViewArea').append(dd);
		
    	contentLength++;
    	focusIdx = contentLength;
    }


    /******************************************************
    * 댓글 리스트 조회
    *******************************************************/
    function getViewReContent(flag, ref, reStep){
        var reBody = $('#'+tableInitData.programId+'Re')

        var idx = parseInt($('.td_row_s_'+rowId+'_idx').text());
    	//그리드 컬럼 만드는 로직
    	$.ajax({
    	    type        : "GET",
    		url         : "/i/"+tableInitData.programId + "/listRe",
            data        : {"idx" : idx},
    		dataType    : "json",
    		contentType : "application/json; charset=utf-8",
    		success     : function(result){
						//CSS
						var reContent = 0;
						var contentWidth = 90;
						var imgWidth = 10

						var dt_grid = result;

                            //-1 : 댓글 신규 작성 폼.
							for(var i = -1; i < dt_grid.length; i++){

								var dtGridRef = (i == -1? 0 : parseInt(dt_grid[i].ref)); //순번
								var dtGridPRef = (i == -1? 0 : parseInt(dt_grid[i].pref));
								var dtGridLevel = (i == -1? 0 : parseInt(dt_grid[i].level));

                                if(ref == 0 && reStep == dtGridRef && flag == "VIEW"){
                                    dtGridRef = 0;
                                    dtGridPRef = reStep;
                                }

                                /*******************************************
                                * ref -1 : 댓글쓰기 폼.
                                ********************************************/
								var dd = $('<div class="col-xs-w100" style="border-bottom:solid gray 0.5px;" />');
								if(i == -1) dd.css({"border-bottom" : "0.5px solid gray","margin": "5px 0px"});

                                /*******************************************
                                * 들여쓰기 ㄴ
                                ********************************************/
                                var ddTextRe = $('<div class="col-xs-w'+reContent+'" style="height:50px; text-align:center;" />');
                                ddTextRe.text('ㄴ');


                                var ddDiv = $('<div class="col-xs-w'+contentWidth+'" />');

                                    /*******************************************
                                    * 사용자 그룹
                                    ********************************************/
                                    //이름영역
                                    var ddIdDiv = $('<div class="col-xs-w100" style:"min-height:25px;"/>');
                                        var ddIdSpanName = $('<span >이름 : </span>');
                                        var ddIdInputName = $('<input id="'+tableInitData.programId+'Name_'+dtGridRef+'_'+dtGridPRef+'" type="type" value="" readonly />');
                                        var ddIdSpanDt = $('<span >작성시간 : </span>');
                                        var ddIdInputDt = $('<input type="type" value="" readonly />');


                                    //컨텐츠영역
                                    var ddContentDiv = $('<div class="col-xs-w100" style="min-height:35px;" />');
                                        //신규글쓰기
                                        if(i == -1){
                                            var ddIdTextArea = $('<textarea id="'+tableInitData.programId+'Content_'+dtGridRef+'_'+dtGridPRef+'" class="col-xs-w100" style="border:0px;" readonly />');
                                            ddIdTextArea.keydown(function(el){
                                                resize(el);
                                            });

                                            if(app.userEmail != "") {
                                                ddIdTextArea.attr('readonly', false);
                                                ddIdInputName.val(app.userName);
                                            }else{
                                                ddIdTextArea.text('로그인 후 이용해 주세요. 소통과 알림을 위해 로그인을 권장하고있습니다.');
                                            }

                                        }else{
                                            //글 리스트
                                            ddIdInputName.val(dt_grid[i].inUserId);
                                            ddIdInputDt.val(dt_grid[i].upDt);


                                            if(ref == dtGridRef && reStep == dtGridPRef && (flag == "RESAVE" || flag == "UPDATE" || flag == "VIEW")
                                            ){
                                                var ddIdTextArea = $('<textarea id="'+tableInitData.programId+'Content_'+dtGridRef+'_'+dtGridPRef+'" class="col-xs-w100" />');
                                                ddIdTextArea.keydown(function(el){
                                                    resize(el);
                                                });
                                            }else{
                                                var ddIdTextArea = $('<pre id="'+tableInitData.programId+'Content_'+dtGridRef+'_'+dtGridPRef+'" class="col-xs-w100" />');
                                            }
                                            if(dt_grid[i].delYn == 'Y') {
                                                ddIdTextArea.text('삭제된 댓글 입니다.');
                                            }else{
                                                ddIdTextArea.text(dt_grid[i].content);
                                            }
                                        }

                                    ddIdDiv.append(ddIdSpanName).append(ddIdInputName).append(ddIdSpanDt).append(ddIdInputDt);
                                    ddContentDiv.append(ddIdTextArea);

                                    /*******************************************
                                    * 버튼그룹
                                    ********************************************/
                                    var ddBtnDiv = $('<div class="col-xs-w100" style:"min-height:30px;" />');

                                    //댓글달기
                                    var ddBtnReAdd = $('<a class="btn" id="'+tableInitData.programId+'ReAddBtn_'+dtGridRef+'_'+dtGridPRef+'" />');
                                    ddBtnReAdd.text('댓글달기');
                                    ddBtnReAdd.click(function(){
                                        var el = $(this);
                                        var split = el.attr("id").split("_");

                                        getViewReContent('READD', 0, parseInt(split[1]));
                                    });

                                    //수정 전환
                                    var ddBtnUpdate = $('<a class="btn" id="'+tableInitData.programId+'ReContentPlace_'+dtGridRef+'_'+dtGridPRef+'" />');
                                    ddBtnUpdate.text('수정');
                                    ddBtnUpdate.click(function(){

                                        var el = $(this);
                                        var split = el.attr("id").split("_");
                                        getViewReContent('UPDATE', split[1], split[2]);
                                    })

                                    //신규 저장
                                    var ddBtnSave = $('<a class="btn" id="'+tableInitData.programId+'ReSaveBtn_'+dtGridRef+'_'+dtGridPRef+'" />');
                                    ddBtnSave.text('저장');
                                    ddBtnSave.click(function(){

                                        var el = $(this);
                                        var split = el.attr("id").split("_");

                                        var idx = parseInt($('.td_row_s_'+rowId+'_idx').text());
                                        var content = $('#'+tableInitData.programId+'Content_'+split[1]+'_'+split[2]).val();
                                        if(content == ''){
                                            alert('내용을 입력해주세요');
                                            return false;
                                        }

                                        var data = {
                                             idx	    : idx,
                                             ref	    : parseInt(split[1]),
                                             pRef       : parseInt(split[2]),
                                             name       : app.userName,
                                             email      : app.userEmail,
                                             content	: content,
                                             flag	    : 'INSERT'
                                        }

                                        $.ajax({
                                            url		: "/i/"+tableInitData.programId + "/saveRe",
                                            type	: "POST",
                                            data	: JSON.stringify(data),
                                            contentType : "application/json; charset=utf-8",
                                            success : function(){
                                                alert("저장 되었습니다.");
                                                getViewReContent('VIEW');
                                            },
                                            error : function(){
                                                console.log(data);
                                            }
                                        });
                                    })

                                    //수정 저장
                                    var ddBtnUpdateSave = $('<a class="btn" id="'+tableInitData.programId+'ReUpdateBtn_'+dtGridRef+'_'+dtGridPRef+'" />');
                                    ddBtnUpdateSave.text('저장');
                                    ddBtnUpdateSave.click(function(){

                                        var el = $(this);
                                        var split = el.attr("id").split("_");

                                        var idx = parseInt($('.td_row_s_'+rowId+'_idx').text());
                                        var content = $('#'+tableInitData.programId+'Content_'+split[1]+'_'+split[2]).val();
                                        if(content == ''){
                                            alert('내용을 입력해주세요');
                                            return false;
                                        }

                                        var data = {
                                             idx	    : idx,
                                             ref	    : parseInt(split[1]),
                                             pRef       : parseInt(split[2]),
                                             content	: content,
                                             flag	    : 'UPDATE'
                                        }

                                        $.ajax({
                                            url		: "/i/"+tableInitData.programId + "/saveRe",
                                            type	: "POST",
                                            data	: JSON.stringify(data),
                                            contentType : "application/json; charset=utf-8",
                                            success : function(){
                                                alert("저장 되었습니다.");
                                                getViewReContent('VIEW');
                                            },
                                            error : function(){
                                                console.log(data);
                                            }
                                        });
                                    })

                                    //level1 댓글 저장
                                    var ddBtnReSave = $('<a class="btn" id="'+tableInitData.programId+'ReReSaveBtn_'+dtGridRef+'_'+dtGridPRef+'" />');
                                    ddBtnReSave.text('저장');
                                    ddBtnReSave.click(function(){

                                        var el = $(this);
                                        var split = el.attr("id").split("_");

                                        var idx = parseInt($('.td_row_s_'+rowId+'_idx').text());
                                        var content = $('#'+tableInitData.programId+'Content_'+split[1]+'_'+split[2]).val();
                                        if(content == ''){
                                            alert('내용을 입력해주세요');
                                            return false;
                                        }

                                        var data = {
                                             idx	    : idx,
                                             ref	    : parseInt(split[1]),
                                             pRef       : parseInt(split[2]),
                                             name       : app.userName,
                                             email      : app.userEmail,
                                             content	: content,
                                             flag	    : 'INSERT_RE'
                                        }

                                        $.ajax({
                                            url		: "/i/"+tableInitData.programId + "/saveRe",
                                            type	: "POST",
                                            data	: JSON.stringify(data),
                                            contentType : "application/json; charset=utf-8",
                                            success : function(){
                                                alert("저장 되었습니다.");
                                                getViewReContent('VIEW');
                                            },
                                            error : function(){
                                                console.log(data);
                                            }
                                        });
                                    })

                                    //삭제
                                    var ddBtnDelete = $('<a class="btn" id="'+tableInitData.programId+'ReDelBtn_'+dtGridRef+'_'+dtGridPRef+'" />');
                                    ddBtnDelete.text('삭제');
                                    ddBtnDelete.click(function(){

                                        var el = $(this);
                                        var split = el.attr("id").split("_");

                                        var idx = parseInt($('.td_row_s_'+rowId+'_idx').text());
                                        var content = $('#'+tableInitData.programId+'Content_'+split[1]+'_'+split[2]).val();

                                        var data = {
                                             idx	    : idx,
                                             ref	    : parseInt(split[1])
                                        }

                                        $.ajax({
                                            url		: "/i/"+tableInitData.programId + "/deleteRe",
                                            type	: "DELETE",
                                            data	: JSON.stringify(data),
                                            contentType : "application/json; charset=utf-8",
                                            success : function(){
                                                alert("삭제 되었습니다.");
                                                getViewReContent('VIEW');
                                            },
                                            error : function(){
                                                console.log(data);
                                            }
                                        });
                                    })

                                    /*******************************************
                                    * 버튼 유효성
                                    ********************************************/
                                    if(app.userEmail != "") {
                                        //신규 댓글 저장
                                        //세션이있어야만 존재.
                                        if(i == -1){
                                            ddBtnDiv.append(ddBtnSave);
                                        //댓글 리스트
                                        }else{

                                            if(dt_grid[i].delYn == 'N'){
                                                //일반
                                                if(flag == 'VIEW'){
                                                    if(dtGridPRef == 0) ddBtnDiv.append(ddBtnReAdd);
                                                }
                                                //사용자확인
                                                if(app.userEmail == dt_grid[i].inUserId);
                                                if(flag == 'VIEW'){
                                                    ddBtnDiv.append(ddBtnUpdate);
                                                    ddBtnDiv.append(ddBtnDelete);
                                                }
                                                if(flag == "UPDATE" && ref == dtGridRef && reStep == dtGridPRef){
                                                    //저장
                                                    ddBtnDiv.append(ddBtnUpdateSave);
                                                }

                                                if(dtGridRef == 0 && dtGridPRef == reStep){
                                                    ddBtnDiv.append(ddBtnReSave)
                                                }
                                            }

                                        }
                                    }

                                    /*******************************************
                                    * 사용자그룹, 버튼그룹 합치기
                                    ********************************************/
                                    ddDiv.append(ddIdDiv).append(ddContentDiv).append(ddBtnDiv);

                                /*******************************************
                                * 댓글쓰기 시 필요함수
                                ********************************************/
								if(ref == 0 && reStep == dtGridRef && flag == "READD"){
								    i--;
								    flag = "VIEW";
								}else if(dtGridPRef != 0 && flag == "VIEW"){
								    dd.append(ddTextRe);
								}


								dd.append(ddDiv);
								reBody.append(dd);
							}
					}
				});
    }



    /***************************************
    * Markdown 폼
    ****************************************/
    function getViewMarkdownForm(){
        $.ajax({
            type        : "GET",
            url         : "/i/blog/md",
            contentType : "application/html",
            async       : false,
            success     : function(result){
                console.log(result);
                $('#'+tableInitData.programId+'Md').append(result);
            }
        });
    }
    /***************************************
    * Markdown 미리보기
    ****************************************/
    function getViewMarkdownView(){
        $.ajax({
            type        : "GET",
            url         : "/i/blog/mdView",
            contentType : "application/html",
            async       : false,
            success     : function(result){
                console.log(result);
                $('#'+tableInitData.programId+'Md').append(result);
            }
        });
    }
}(window, jQuery));

