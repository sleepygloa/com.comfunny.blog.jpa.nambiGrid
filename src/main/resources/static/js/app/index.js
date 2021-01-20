var lgSeS = "none";
var app = {
    userName : "",
    userEmail : ""
}

var main = {

    init : function(){
        var _this = this;

        $('#side-menu-button').on('click', function(){
            $('.side-menu-bar').css('left', '0px');
        });

        $('#leftMenuClose').on('click', function(){
            $('.side-menu-bar').css('left', '-300px');
        });


        $('#btn-save').on('click', function(){
            _this.save();
        });

        $('#btn-update').on('click', function(){
            _this.update();
        });

        $('#btn-delete').on('click', function(){
            _this.delete();
        });

        //API 호출
        $('#callApiJuso').on('click', function(){
            _this.delete();
        });

        _this.session();

        _this.initMenu();

    },

    save : function(){
        var data = {
            title : $('#title').val(),
            author : $('#author').val(),
            content : $('#content').val()
        };

        $.ajax({
            type : 'POST',
            url : '/api/v1/posts',
            dataType : 'json',
            contentType : 'application/json; charset=utf-8',
            data : JSON.stringify(data)
        }).done(function(){
            alert('글이 등록되었습니다.');
            window.location.href = "/";
        }).fail(function(error){
            alert(JSON.stringify(error));
        });
    },
    update : function(){
        var data = {
            title : $('#title').val(),
            content : $('#content').val()
        };

        var id = $('#id').val();

        $.ajax({
            type : 'PUT',
            url : '/api/v1/posts/'+id,
            dataType : 'json',
            contentType : 'application/json; charset=utf-8',
            data : JSON.stringify(data)
        }).done(function(){
            alert('글이 수정되었습니다.');
            window.location.href = "/";
        }).fail(function(error){
            alert(JSON.stringify(error));
        });
    },
    delete : function(){
        var id = $('#id').val();

        $.ajax({
            type : 'DELETE',
            url : '/api/v1/posts/'+id,
            dataType : 'json',
            contentType : 'application/json; charset=utf-8'
        }).done(function(){
            alert('글이 삭제되었습니다.');
            window.location.href = "/";
        }).fail(function(error){
            alert(JSON.stringify(error));
        });
    },
    session : function(){

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
    },
    initMenu : function(){
        $('#menuUl').empty();
        $.ajax({
            type : 'GET',
            url : '/i/menu/list',
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

                        var li = $('<li />');
                        var a = $('<a >'+rowData.menuNm+'</a>');
                        if(rowData.menuUrl != "") {
                            a.attr('href', rowData.menuUrl)
                        }else{
                            a.attr('href', '#');
                        };
                        li.append(a);
                        beforeList = li;

                    }else{
                        if(beforeMenuLev == 1){
                            childUl.empty();
                            childUl = $('<ul />');
                        }
                        beforeMenuLev = 2;


                        var childLi = $('<li />');
                        var childA = $('<a >'+rowData.menuNm+'</a>');
                        if(rowData.menuUrl != "") {
                            childA.attr('href', rowData.menuUrl)
                        }else{
                            childA.attr('href', '#');
                        };
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
};

main.init();

