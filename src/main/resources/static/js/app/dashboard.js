

function getSession(){

    $.ajax({
        type : 'GET',
        url : '/session',
        dataType : 'json',
        contentType : 'application/json; charset=utf-8'
        }).done(function(data){
            app.userName = data.userName;
            app.userEmail = data.userEmail;
            app.userRole = data.userRole;
        }).fail(function(error){
            alert(JSON.stringify(error));
        });
};


function leftMenu(menuSeq){
    $('#menuUl').empty();

    var url = '/b/menu/list';
//        if(menuSeq == 2) = '/resume/ko';
    if(menuSeq == 3) url = '/a/'; //관리자
    if(menuSeq == undefined) menuSeq = -1;

    $.ajax({
        type : 'GET',
        url : url,
        data : {
            "menuSeq" : menuSeq
        },
        dataType : 'json',
        contentType : 'application/json; charset=utf-8'
        }).done(function(data){
            console.log(data);

            var beforeMenuLev = 1;
            var beforeChildCnt = 0;
            var childUl = $('<ul />');
            var beforeList;
            for(var i = 0; i < data.length; i++){
                var rowData = data[i];

                if(rowData.useYn == 'N') continue;

                if(rowData.menuLev ==  1){
                    if(i != 0){
                        if(beforeMenuLev == 1){
                            $('#menuUl').append(beforeList);
                        }else{
                            beforeList.append(childUl);
                            $('#menuUl').append(beforeList);
                        }
                    }
                    beforeMenuLev = 1;


                    var li = $('<li class="nav-item" />');
                    var a = $('<a class="nav-link" href="#"  aria-expanded="false" data-bs-target="#menu_'+rowData.menuSeq+'" aria-controls="menu_'+rowData.menuSeq+'" >'+rowData.menuNm+'</a>');
                    var span = $('<span class=""/>');
                    if(menuSeq == 7){
                        a.attr("onclick", "blogJs.fnList('"+rowData.menuUrl+"'); if($('#sidebarMenu').hasClass('show') == true){ $('#sidebarMenu').removeClass('show');};");
                    }else{
                        if(rowData.menuUrl != "") {
                            a.attr('onclick', "lodingPage('"+rowData.menuUrl+"'); if($('#sidebarMenu').hasClass('show') == true){ $('#sidebarMenu').removeClass('show');};");

                        }
                        //a.attr('href', rowData.menuUrl);
                        if(!(rowData.menuIcon == "null" ||rowData.menuIcon == ""))  span.addClass('fa fa-2x '+rowData.menuIcon) ;
                    }
                    li.append(span);
                    li.append(a);
                    beforeList = li;

                }else{
                    if(beforeMenuLev == 1){
                        childUl.empty();
                        childUl = $('<ul class="list-unstyled ps-3 collapse" id="menu_'+rowData.menuParentSeq+'" />');
                        if(menuSeq == 7) childUl.removeClass('collapse');
                    }
                    beforeMenuLev = 2;


                    var childLi = $('<li class="nav-link" />');
                    var childA = $('<a href="#">'+rowData.menuNm+'</a>');
                    var childSpan = $('<span />');

                    if(menuSeq == 7){
                        childA.attr("onclick", "blogJs.fnList('"+rowData.menuUrl+"'); if($('#sidebarMenu').hasClass('show') == true){ $('#sidebarMenu').removeClass('show');};");
                    }else{
//                        if(rowData.menuUrl != "") childA.attr('href', rowData.menuUrl);
                        if(rowData.menuUrl != "") {
                            childA.attr('onclick', "lodingPage('"+rowData.menuUrl+"'); if($('#sidebarMenu').hasClass('show') == true){ $('#sidebarMenu').removeClass('show');};");
                        }
                        if(!(rowData.menuIcon == "null" ||rowData.menuIcon == ""))  childSpan.addClass('fa fa-2x '+rowData.menuIcon) ;
                    }

                    childLi.append(childSpan);
                    childLi.append(childA);
                    childUl.append(childLi);
                }

            }

            if(beforeMenuLev == 1){
                $('#menuUl').append(beforeList);
            }else{
                beforeList.append(childUl);
                $('#menuUl').append(beforeList);
            }
        }).fail(function(error){
            alert(JSON.stringify(error));
        });
}
leftMenu();
getSession();

//글 컨텐츠 불러오기.
function lodingPage(url){

    $.ajax({
        url		: url,
        type	: "GET",
        async	: false,
        contentType : 'application/html; charset=utf-8',
        success	: function(result){
            $('#main').empty();
            $('#main').html(result);
        }
    });
}


function getBase64(file, callback) {
   var reader = new FileReader();
   reader.readAsDataURL(file);
   reader.onload = function () {
     console.log(reader.result);
     textCopy(reader.result);
     //return reader.result;
   };
   reader.onerror = function (error) {
     console.log('Error: ', error);
   };
}

function textCopy(text) {
  var tempElem = document.createElement('textarea');
  tempElem.value = text;
  document.body.appendChild(tempElem);

  tempElem.select();
  tempElem.setSelectionRange(0, 9999);
  document.execCommand("copy");
  document.body.removeChild(tempElem);
}
