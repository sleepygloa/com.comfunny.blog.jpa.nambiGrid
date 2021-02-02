


var trCnt = -1;
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

(function(window, $, undefined){

    var tableInitData = {}
    //카테고리A
    var categoryA = new Array();
    //카테고리C
    var categoryB = new Array();
    //카테고리C
    var categoryC = new Array();

    //그리드 재조회
    $.fn.fnListReload = function(){

    }

    //그리드 초기화
    $.fn.fnList = function(data){


        data["uProgramId"] = data["programId"].charAt(0).toUpperCase() + data["programId"].slice(1);
        tableInitData = data;

        /**********************
        * 기본 div 세팅
        ***********************/
        var container = $('#'+tableInitData.programId+'Container');
        $('#'+tableInitData.programId+'Grid').empty();

        /**********************
        * 기본 element 세팅
        ***********************/
        if(tableInitData.markdown){
            if($('#'+tableInitData.programId+'Md').length == 0) container.append($('<div id="'+tableInitData.programId+'Md" />'));

            //getViewMarkdownForm();
        }else{
            if(tableInitData.viewContents){
                if($('#'+tableInitData.programId+'View').length == 0) container.append($('<div id="blogView" class="viewContainer col-xs-w100" style="margin-bottom:20px;" />'));
                if($('#'+tableInitData.programId+'ViewHidden').length == 0) container.append($('<div id="blogView" style="width:0px;height:0px; z-index=0;" />'));
            }
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


    	//그리드 버튼 그룹
    	var divBtnGroup = $('<div class="col-xs-w100" />');

    	var gridBtnGrpList = $('<div class="col-xs-w100" />');

    	if(app.userRole == "A"){
	    	if(data.btn != undefined){
	    		for(var i = data.btn.length - 1; i >= 0; i--){
	        		var btnName = data.btn[i];
	        		if(btnName == 'search'){
                        gridBtnGrpList.append($('<a href="#" id="'+data.programId+'SearchBtn" class="btn btn-save btn-sm pull-right" >검색</a>'));
	        		}else if(btnName == 'imgUpload'){
	        		    //rowId = 0;
	        		    var imgUpload = $('<a href="#"  class="btn btn-save btn-sm pull-right" >이미지 변환(base64)</a>');
	        		    imgUpload.on('click', function(){

	        		        var fileUpload = $('<input type="file" class="form-control" id="'+tableInitData.programId+'FileUpload" aria-describedby="blogFileUploadAddon" aria-label="Upload" >');
	        		        fileUpload.trigger('click', function(){

	        		        });
	        		        fileUpload.on('change', function(){
	        		            getBase64($(this)[0].files[0]);
	        		        });
	        		    })
                        gridBtnGrpList.append(imgUpload);
	        		}else if(btnName == 'insert'){
	        		    rowId = 0;
	        		    var insert = $('<a href="#"  class="btn btn-save btn-sm pull-right" >글 추가</a>');
	        		    insert.on('click', function(){
	        		        rowId = -1;
                            getView('INSERT', -1);
	        		    })
                        gridBtnGrpList.append(insert);
	        		}else if(btnName == 'update'){
	        		    var update = $('<a href="#"  class="btn btn-update btn-sm pull-right" >글 수정</a>');
	        		    update.on('click', function(){
                            getView('UPDATE', parseInt($('.td_row_s_'+rowId+'_idx').text()));
                            getCategorys();
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
                                    if(tableInitData.markdown){
                                        if(rowId == -1){
                                            blogSaveMd(-1);
                                        }else{
                                            blogSaveMd(parseInt($('.td_row_s_'+rowId+'_idx').text()));
                                        }

                                    }else{
                                        blogSave(parseInt($('.td_row_s_'+rowId+'_idx').text()));
                                    }

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
    	}

    	divBtnGroup.append(gridBtnGrpList);
//    	gridDivContainer.append(divBtnGroup);

        /***************************
        * 테이블
        ****************************/
    	var table = $('<table id="'+data.programId+'Table" class="table table-striped table-sm" />');

    	//테이블 헤더
    	var thead = $('<thead />');
    	var thtr = $('<tr />');

    	var ththData = '';
    	//flag

		//flag End
        if(tableInitData.editable){
            ththData += '<th >'+' '+'</th>';
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


        //타이틀, 테이블 버튼, 테이블 화면에 그림.
//    	gridDivContainer.append(tableParentDiv);

        $('#'+data.programId+'Grid').append($('<h2>'+data.programNm + '관리'+'</h2>'));
        $('#'+data.programId+'Grid').append(divBtnGroup);

        getDataList();


    	//첫행 블러오기
//    	if(tableInitData.data1.length > 0) getView('VIEW', 0);
    }

    //데이터셋만 재조회
    function getDataList(){

        //url 체크
        if(tableInitData.url == undefined){
            tableInitData.url = "/b/"+tableInitData.programId + "/list";
        }else{

        }

    	//그리드 컬럼 만드는 로직
    	$.ajax({
    	    type:"GET",
    		url : tableInitData.url,
    		dataType : "json",
    		contentType:"application/json;",
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
            if(tableInitData.markdown){
                if(flag == "UPDATE" || flag =="INSERT"){
                    $('#'+tableInitData.programId+'Md').empty();
                    getViewMarkdownViewUpdate();

                    if(flag == "UPDATE"){
                        for(var i = 0; i < tableInitData.dtInitData1.length; i++){
                            if(tableInitData.dtInitData1[i].idx == rowId){

                                $('#'+tableInitData.programId + "Title").val(tableInitData.dtInitData1[i].title);
                                $('#'+tableInitData.programId + "Url").val(tableInitData.dtInitData1[i].githubUrl);

                                $('#'+tableInitData.programId + "CategoryA").attr('readonly', false).val(tableInitData.dtInitData1[i].categoryA);
                                $('#'+tableInitData.programId + "CategoryB").attr('readonly', false).val(tableInitData.dtInitData1[i].categoryB);
                                $('#'+tableInitData.programId + "CategoryC").attr('readonly', false).val(tableInitData.dtInitData1[i].categoryC);

                                $('#'+tableInitData.programId + "Content").val(tableInitData.dtInitData1[i].markdownContent);
                                simplemde.value(tableInitData.dtInitData1[i].markdownContent);
                                return;
                            }
                        }
                    }

                    return;
                }else if(flag == "VIEW"){
                    $('#'+tableInitData.programId+'Md').empty();
                    getViewMarkdownView();

                    for(var i = 0; i < tableInitData.dtInitData1.length; i++){
                        if(tableInitData.dtInitData1[i].idx == rowId){

                            $('#'+tableInitData.programId + "CategoryA").attr('readonly', true).val(tableInitData.dtInitData1[i].categoryA);
                            $('#'+tableInitData.programId + "CategoryB").attr('readonly', true).val(tableInitData.dtInitData1[i].categoryB);
                            $('#'+tableInitData.programId + "CategoryC").attr('readonly', true).val(tableInitData.dtInitData1[i].categoryC);

                            $('#markdown').text(tableInitData.dtInitData1[i].markdownContent);
                            document.getElementById('output-html')["innerHTML"] = parseMd(tableInitData.dtInitData1[i].markdownContent);
                            return;
                        }
                    }
                    return;
                }

            }

			//컨텐츠 개수 초기화
	    	contentLength = 0;
	    	$.ajax({
				url	 	: "/b/"+tableInitData.programId + '/view',
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

                    //MD 와 구분짓는다.
                    if(tableInitData.markdown){

                    }else{

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
        var tbtr = $('<tr id="tr_row_'+trCnt+'" class="tr_row_'+trCnt+'" style="height:40px;"/>');

        //글 상세 보기 속성 있을때 클래스 추가
        if(tableInitData.viewContents){
            tbtr.addClass('viewContents_'+tableInitData.dtData1[rowId].menuSeq);
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

                            getViewReContent('VIEW');
                        }
                        console.log(rowId);

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
            url      : "/b/"+tableInitData.programId + "/saveRow",
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
            url      : "/b/"+tableInitData.programId + "/save",
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

        var categoryA = $('#'+tableInitData.programId+'CategoryA').val();
        var categoryB = $('#'+tableInitData.programId+'CategoryB').val();
        var categoryC = $('#'+tableInitData.programId+'CategoryC').val();

        var content = simplemde.value();
        var url = $('#'+tableInitData.programId+'Url').val();

        $.ajax({
            url      : "/b/"+tableInitData.programId + "/saveMd",
            data     : {
                idx : idx,
                title : title,
                categoryA : categoryA,
                categoryB : categoryB,
                categoryC : categoryC,
                content : content,
                url     : url
            },
            type     : 'POST',
            //contentType : 'application/json; charset=utf-8',
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
            url      : "/b/"+tableInitData.programId + "/delete",
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
        var reBody = $('#'+tableInitData.programId+'Re');
        reBody.empty();
        var idx = parseInt($('.td_row_s_'+rowId+'_idx').text());
    	//그리드 컬럼 만드는 로직
    	$.ajax({
    	    type        : "GET",
    		url         : "/b/"+tableInitData.programId + "/listRe",
            data        : {"idx" : idx},
    		dataType    : "json",
    		contentType : "application/json; charset=utf-8",
    		success     : function(result){
                //CSS
                var reContent = 0;
                var imgWidth = 10

                var dt_grid = result;

                //-1 : 댓글 신규 작성 폼.
                for(var i = 0; i < dt_grid.length; i++){
console.log(dt_grid[i]);
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
                        var dd = $('<div class="col-xs-w100 m-t-5 m-b-5"  />');
                        //if(i == -1) dd.css({"border-bottom" : "0.5px solid gray","margin": "5px 0px"});

                        /*******************************************
                        * 들여쓰기 ㄴ
                        ********************************************/
                        var ddTextRe = $('<div class="col-xs-w15" style="height:50px; text-align:center;" />');
                        ddTextRe.text('ㄴ');

                        var ddDiv = $('<div class="col-xs-w90" style="float:right;" />');

                            /*******************************************
                            * 사용자 그룹
                            ********************************************/
                            var ddImgDiv = $('<div style="position: absolute; width:25px; height:25px; left:-30px; bottom:0px;"></div>');
                                var ddImgInput = $('<img src="'+dt_grid[i].picture+'" style="width:25px; height: 25px; border-radius:50%; ">');

                            //이름영역
                            var ddIdDiv = $('<div class="col-xs-w100 " style="min-height:25px;"/>');
                                var ddIdInput = $('<input class="reContText" id="'+tableInitData.programId+'Name_'+dtGridRef+'_'+dtGridPRef+'" type="type" value="" readonly />');
                                var ddTimeInput = $('<input class="reContText" type="type" value="" readonly />');

                            //컨텐츠영역
                            var ddContentDiv = $('<div class="col-xs-w100 reContText" style="overflow-y:auto;height:auto;" />');

                            //글 리스트
                            ddIdInput.val(dt_grid[i].inUserId);
                            ddTimeInput.val(dt_grid[i].upDt);


                            if(ref == dtGridRef && reStep == dtGridPRef && (flag == "RESAVE" || flag == "UPDATE" || flag == "VIEW")
                            ){
                                var ddIdTextArea = $('<textarea id="'+tableInitData.programId+'Content_'+dtGridRef+'_'+dtGridPRef+'" class="reContInput col-xs-w100" style="display:block; height:100%;" />');
                                ddIdTextArea.keydown(function(el){
                                    if(el.keyCode == 13){
                                        ddContentDiv.css('height', (12+el.target.scrollHeight)+"px");
                                    }

                                });
                            }else{
                                var ddIdTextArea = $('<pre id="'+tableInitData.programId+'Content_'+dtGridRef+'_'+dtGridPRef+'" class="reContContent col-xs-w100" style="height:auto;"/>');
                            }
                            if(dt_grid[i].delYn == 'Y') {
                                ddIdTextArea.text('삭제된 댓글 입니다.');
                            }else{
                                ddIdTextArea.text(dt_grid[i].content);
                            }

                            ddImgDiv.append(ddImgInput);
                            ddIdDiv.append(ddIdInput).append(ddTimeInput);
                            ddContentDiv.append(ddIdTextArea);

                            /*******************************************
                            * 버튼그룹
                            ********************************************/
                            var ddBtnDiv = $('<div class="col-xs-w100" style="height:5px;" />');

                            /*******************************************
                            * 버튼 유효성
                            ********************************************/
                            if(app.userEmail != "") {
                                if(dt_grid[i].delYn == 'N'){
                                    //일반
                                    if(flag == 'VIEW'){
                                        if(dtGridPRef == 0) getViewReContentBtnReAdd(ddIdDiv, dtGridRef, dtGridPRef); //댓글달기
                                    }
                                    //사용자확인
                                    if(app.userEmail == dt_grid[i].upUserEmail){
                                        if(flag == 'VIEW'){
                                            getViewReContentBtnUpdate(ddIdDiv, dtGridRef, dtGridPRef); //수정 전환
                                            getViewReContentBtnDelete(ddIdDiv, dtGridRef, dtGridPRef); //삭제
                                        }
                                        if(flag == "UPDATE" && ref == dtGridRef && reStep == dtGridPRef){
                                            //저장
                                            getViewReContentBtnUpdateSave(ddIdDiv, dtGridRef, dtGridPRef); //수정 저장
                                        }

                                        if(dtGridRef == 0 && dtGridPRef == reStep){
                                            getViewReContentBtnReSave(ddIdDiv, dtGridRef, dtGridPRef); //level1 댓글 저장
                                        }
                                    }
                                }

                            }

                            /*******************************************
                            * 사용자그룹, 버튼그룹 합치기
                            ********************************************/
                            ddDiv.append(ddContentDiv).append(ddImgDiv).append(ddIdDiv).append(ddBtnDiv);

                        /*******************************************
                        * 댓글쓰기 시 필요함수
                        ********************************************/
                        if(ref == 0 && reStep == dtGridRef && flag == "READD"){
                            i--;
                            flag = "VIEW";
                        }else if(dtGridPRef != 0){
                            dd.append(ddTextRe);
                            ddDiv.removeClass('col-xs-w90');
                            ddDiv.addClass('col-xs-w85');
                        }


                        dd.append(ddDiv);
                        reBody.append(dd);



                    }

                getViewInsert(reBody);
            }


        });
    }

    //댓글 - 글쓰기
    function getViewInsert(el, dtGridRef, dtGridPRef){
        /*******************************************
        * ref -1 : 댓글쓰기 폼.
        ********************************************/
        var dd = $('<div class="col-xs-w100 m-t-20"  style="min-height:155px;"  />');
        //if(i == -1) dd.css({"border-bottom" : "0.5px solid gray","margin": "5px 0px"});


        var ddDiv = $('<div class="col-xs-w90" style="float:right;" />');

        var ddImgDiv = $('<div style="position: absolute; width:25px; height:25px; left:-30px; bottom:0px;"></div>');
            var ddImgInput = $('<img src="'+app.userPicture+'" style="width:25px; height: 25px; border-radius:50%; ">');

        //이름영역
        var ddIdDiv = $('<div class="input-group  col-xs-w100  col-sm-w50 " style="min-height:25px;"/>');
            var ddIdSpan = $('<span class="input-group-text reContLabel" >이름</span>');
            var ddIdInput = $('<input class="form-control reContInput" id="'+tableInitData.programId+'Name_0_0" type="type" value="" readonly />');
        var ddTimeDiv = $('<div class="input-group  col-xs-w100  col-sm-w50 " style="min-height:25px;"/>');
            var ddTimeSpan = $('<span class="input-group-text reContLabel" >시간</span>');
            var ddTimeInput = $('<input class="form-control reContInput" type="type" value="" readonly />');

        //컨텐츠영역
        var ddContentDiv = $('<div class="col-xs-w100 reContInput" style="min-height:35px;" />');
        //신규글쓰기
        var ddIdTextArea = $('<textarea id="'+tableInitData.programId+'Content_0_0" class="reContInput col-xs-w100" style="min-height:50px; border:0px;" readonly />');
        ddIdTextArea.keydown(function(el){
            resize(el);
        });

        if(app.userEmail != "") {
            ddIdTextArea.attr('readonly', false);
            ddIdInput.val(app.userName);
        }else{
            ddIdTextArea.text('로그인 후 이용해 주세요. 소통과 알림을 위해 로그인을 권장하고있습니다.');
        }

        ddImgDiv.append(ddImgInput);
        ddIdDiv.append(ddIdSpan).append(ddIdInput)
        //ddTimeDiv.append(ddTimeSpan).append(ddTimeInput);
        ddContentDiv.append(ddIdTextArea);

        /*******************************************
        * 버튼그룹
        ********************************************/
        var ddBtnDiv = $('<div class="col-xs-w100" style="height:33px;" />');
        if(app.userEmail != "") getViewReContentBtnSave(ddBtnDiv, 0, 0); //댓글달기

        /*******************************************
        * 사용자그룹, 버튼그룹 합치기
        ********************************************/
        ddDiv.append(ddContentDiv).append(ddImgDiv).append(ddIdDiv).append(ddTimeDiv).append(ddBtnDiv);
        dd.append(ddDiv);
        el.append(dd);
    }

    //댓글 - 댓글달기
    function getViewReContentBtnReAdd(el, dtGridRef, dtGridPRef){
        //대댓글달기
        var ddBtnReAdd = $('<a class="btn reContBtn" id="'+tableInitData.programId+'ReAddBtn_'+dtGridRef+'_'+dtGridPRef+' "  />');
        var ddBtnReAddI = $('<i class="fa fa-2x fa-reply"></i>');
        ddBtnReAdd.append(ddBtnReAddI);
        ddBtnReAdd.click(function(){
            var el = $(this);
            var split = el.attr("id").split("_");

            getViewReContent('READD', 0, parseInt(split[1]));
        });

        el.append(ddBtnReAdd)
    }

    //댓글 - 수정전환
    function getViewReContentBtnUpdate(el, dtGridRef, dtGridPRef){
        var ddBtnUpdate = $('<a class="btn reContBtn" id="'+tableInitData.programId+'ReContentPlace_'+dtGridRef+'_'+dtGridPRef+' " />');
        var ddBtnUpdateI = $('<i class="fa fa-2x fa-redo"></i>');
        ddBtnUpdate.append(ddBtnUpdateI);
        ddBtnUpdate.click(function(){

            var el = $(this);
            var split = el.attr("id").split("_");
            getViewReContent('UPDATE', split[1], split[2]);
        })
        el.append(ddBtnUpdate);
    }

    //댓글 - 댓글저장
    function getViewReContentBtnSave(el, dtGridRef, dtGridPRef){
        var ddBtnSave = $('<a class="btn reContBtn" id="'+tableInitData.programId+'ReSaveBtn_'+dtGridRef+'_'+dtGridPRef+' " style="border-radius:50%; background:yellow;" />');
        var ddBtnSaveI = $('<i class="fa fa-2x fa-arrow-up"></i>');
        ddBtnSave.append(ddBtnSaveI);
        //ddBtnSave.text('저장');
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
                 content	: content,
                 flag	    : 'INSERT'
            }

            $.ajax({
                url		: "/b/"+tableInitData.programId + "/saveRe",
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

        el.append(ddBtnSave);
    }

    //댓글 - 수정전환->저장
    function getViewReContentBtnUpdateSave(el, dtGridRef, dtGridPRef){

        var ddBtnUpdateSave = $('<a class="btn reContBtn" id="'+tableInitData.programId+'ReUpdateBtn_'+dtGridRef+'_'+dtGridPRef+' " />');
        var ddBtnSaveI = $('<i class="fa fa-2x fa-arrow-up"></i>');
        ddBtnUpdateSave.append(ddBtnSaveI);
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
                url		: "/b/"+tableInitData.programId + "/saveRe",
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

        el.append(ddBtnUpdateSave);
    }

    //댓글 - 대댓글 저장
    function getViewReContentBtnReSave(el, dtGridRef, dtGridPRef){

        var ddBtnReSave = $('<a class="btn reContBtn" id="'+tableInitData.programId+'ReReSaveBtn_'+dtGridRef+'_'+dtGridPRef+' " />');
        var ddBtnSaveI = $('<i class="fa fa-2x fa-arrow-up"></i>');
        ddBtnReSave.append(ddBtnSaveI);
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
                 content	: content,
                 flag	    : 'INSERT_RE'
            }

            $.ajax({
                url		: "/b/"+tableInitData.programId + "/saveRe",
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

        el.append(ddBtnReSave);
    }

    //댓글 - 삭제
    function getViewReContentBtnDelete(el, dtGridRef, dtGridPRef){
       var ddBtnDelete = $('<a class="btn reContBtn" id="'+tableInitData.programId+'ReDelBtn_'+dtGridRef+'_'+dtGridPRef+' " style="color:red;" />');
       var ddBtnDeleteI = $('<i class="fa fa-2x fa-trash-alt"></i>');
       ddBtnDelete.append(ddBtnDeleteI);
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
                url		: "/b/"+tableInitData.programId + "/deleteRe",
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
        el.append(ddBtnDelete);
    }

    /***************************************
    * Markdown 폼
    ****************************************/
    function getViewMarkdownForm(){
        $.ajax({
            type        : "GET",
            url         : "/b/blog/md",
            contentType : "application/html",
            async       : false,
            success     : function(result){
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
            url         : "/b/blog/mdView",
            contentType : "application/html",
            async       : false,
            success     : function(result){
                $('#'+tableInitData.programId+'Md').append(result);
            }
        });
    }
    /***************************************
    * Markdown 미리보기
    ****************************************/
    function getViewMarkdownViewUpdate(){
        $.ajax({
            type        : "GET",
            url         : "/b/blog/mdUpdate",
            contentType : "application/html",
            async       : false,
            success     : function(result){
                $('#'+tableInitData.programId+'Md').append(result);
            }
        });
    }

    /***************************************
    * 카테고리 조회
    ****************************************/
	function getCategorys(){
    	$.ajax({
    	    type        : "GET",
    		url         : "/b/blog/listCategory",
    		dataType    : "json",
    		contentType : "application/json; charset=utf-8",
    		async       : false,
    		success     : function(result){

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
    		        $('#'+tableInitData.programId+'CategoryAList').append($('<option value="'+categoryA[i]+'">'));
    		    }
    		    //카테고리B
    		    for(var i = 0; i < categoryB.length; i++){
    		        $('#'+tableInitData.programId+'CategoryBList').append($('<option value="'+categoryB[i]+'">'));
    		    }
    		    //카테고리C
    		    for(var i = 0; i < categoryC.length; i++){
    		        $('#'+tableInitData.programId+'CategoryCList').append($('<option value="'+categoryC[i]+'">'));
    		    }
    		}
        })
	}

}(window, jQuery));


