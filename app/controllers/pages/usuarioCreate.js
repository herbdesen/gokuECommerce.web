let authorization = localStorage.getItem("jwt");

let postUsersRequest = {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost:9090/users",
    "method": "POST",
    "headers": {
        "authorization": authorization,
        "content-type": "application/json"
    },
    "processData": false,
    "data": ""
}

function salvar() {
    let inputs = $("form[id*=form-usuario]").find("input");
    let users = {
        "username": $(inputs[0]).val(),
        "password": $(inputs[1]).val(),
        "first_name": $(inputs[2]).val(),
        "last_name": $(inputs[3]).val(),
        "roles": {
            "id": inputs[4].checked ? 2 : 1
        }
    }
    postUsersRequest.data = JSON.stringify(users);
    $.ajax(postUsersRequest).done(function (response) {
        To_route('usuario');

    }).error(function () {
        alert("Ocorreu um erro ao tentar cadastrar o usuário!");
    });
}


