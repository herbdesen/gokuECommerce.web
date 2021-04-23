let authorization = "Bearer "+localStorage.getItem("jwt");
var inputs = $("form[id*=form-usuario]").find("input");

if(Params.all().id !== undefined){
    Session.set('idUsersUpdate', Params.all().id);
}

var getUsersIdRequest = {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost:9090/users/"+Session.get('idUsersUpdate'),
    "method": "GET",
    "headers": {
        "authorization": authorization,
        "content-type": "application/json"
    },
    "processData": false
}

var putUsersRequest = {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost:9090/users/"+Session.get('idUsersUpdate'),
    "method": "PUT",
    "headers": {
        "authorization": authorization,
        "content-type": "application/json"
    },
    "processData": false,
    "data": ""
}

$.ajax(getUsersIdRequest).done(function (response) {
    Bind( {
        page: response
    });

    if(response.roles.id === 2){
        inputs[5].checked = "checked";
    }
    if(localStorage.getItem("role") === "1"){
        $(inputs[5]).attr("disabled", true);
    }
});

function salvar() {
    var users = {
        "id": $(inputs[0]).val(),
        "username": $(inputs[1]).val(),
        "password": $(inputs[2]).val(),
        "first_name": $(inputs[3]).val(),
        "last_name": $(inputs[4]).val(),
        "roles": {
            "id": inputs[5].checked ? 2 : 1
        }
    }
    putUsersRequest.data = JSON.stringify(users);
    $.ajax(putUsersRequest).done(function (response) {
        To_route('usuario');

    }).error(function () {
        alert("Ocorreu um erro ao tentar atualizar este usuário.");
    });
}


