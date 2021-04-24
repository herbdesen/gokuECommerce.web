let usersList;
let authorization = localStorage.getItem("jwt");
let username = localStorage.getItem("username");

let getUsersListRequest = {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost:9090/users",
    "method": "GET",
    "headers": {
        "authorization": authorization,
        "content-type": "application/json"
    },
    "processData": false
}

let deleteUsersRequest = {
    "async": true,
    "crossDomain": true,
    "url": "",
    "method": "DELETE",
    "headers": {
        "authorization": authorization,
        "content-type": "application/json"
    }
}

let getUsersByUsernameRequest = {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost:9090/users/username/"+username,
    "method": "GET",
    "headers": {
        "authorization": authorization,
        "content-type": "application/json"
    },
    "processData": false
};

getAll();

let scope = {
    toCreate : function() {
        To_route('usuarioCreate');
        document.location.reload(true);
    },
    toUpdate : function() {
        let idUsers = $(this).data("id");
        Session.set('idUsersUpdate', idUsers);
        To_route('usuarioUpdate');
    },
    toDelete : function() {
        let idUsers = $(this).data("id");
        deleteUsersRequest.url = "http://localhost:9090/users/"+idUsers;
        $.ajax(deleteUsersRequest).done(function (response) {
            document.location.reload(true);

        }).error(function () {
            alert("Ocorreu um erro ao tentar remover este usuário.");
        });
    },
    toGetAll : function() {
        getAll();
    }
};

function getAll() {
    $(".tr-tabela-usuarios").empty();
    $.ajax(getUsersListRequest).done(function (response) {
        usersList = response;
        Template($('.template-usuarios'), usersList).appendTo('.tabela-usuarios');

        validaRoleUserLogin();
    });
}

function validaRoleUserLogin(){
    $.ajax(getUsersByUsernameRequest).done(function (response) {
        localStorage.setItem("role", response.roles.id);
        //Usuario sem permissao de Admin
        if(response.roles.id === 1){
            $(".buscar").attr("disabled", "disabled");
            $(".buscar").toggleClass("btn-primary");
            $(".salvar").attr("disabled", "disabled");
            $(".salvar").toggleClass("btn-primary");
            $.each($(".excluir"), function(){
                $(this).attr("disabled", "disabled");
                $(this).toggleClass("btn-primary");
            });
        }

        //Desabilita botoes de alterar dos demais usuarios
        // $.each($(".alterar"), function(){
        //     if($(this).data("name") !== username){
        //         $(this).attr("disabled", "disabled");
        //         $(this).toggleClass("btn-primary");
        //     }
        // });
    });
}

Bind( {page: scope} );
