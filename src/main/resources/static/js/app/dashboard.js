/* globals Chart:false, feather:false */

(function () {
  'use strict'

//  feather.replace()

    function getSession(){

        $.ajax({
            type : 'GET',
            url : '/session',
            dataType : 'json',
            contentType : 'application/json; charset=utf-8'
            }).done(function(data){
                app.userName = data.userName;
                app.userEmail = data.userEmail;
            }).fail(function(error){
                alert(JSON.stringify(error));
            });
    };
    getSession();

    function leftMenu(){
        $('#menuUl').empty();
        $.ajax({
            type : 'GET',
            url : '/i/menu/listLeftMenu',
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
                        if(rowData.menuUrl != "") a.attr('href', rowData.menuUrl);
                        if(!(rowData.menuIcon == "null" ||rowData.menuIcon == ""))  span.addClass('fa fa-2x '+rowData.menuIcon) ;
                        li.append(span);
                        li.append(a);
                        beforeList = li;

                    }else{
                        if(beforeMenuLev == 1){
                            childUl.empty();
                            childUl = $('<ul class="list-unstyled ps-3 collapse" id="menu_'+rowData.menuParentSeq+'" />');
                        }
                        beforeMenuLev = 2;


                        var childLi = $('<li class="nav-link" />');
                        var childA = $('<a href="#">'+rowData.menuNm+'</a>');
                        if(rowData.menuUrl != "") childA.attr('href', rowData.menuUrl);
                        var childSpan = $('<span />');
                        if(!(rowData.menuIcon == "null" ||rowData.menuIcon == "")) childSpan.addClass('fa fa-2x '+rowData.menuIcon);

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

})()
