let inputUsername = $("#username");
let inputPassowrd = $("#password");

let loginRequest = {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost:9090/auth",
    "method": "POST",
    "headers": {
        "content-type": "application/json",
        "cache-control": "no-cache",
        "postman-token": "98a49332-51cb-d155-fba0-0bd22ad575f5"
    },
    "processData": false,
    "data": ""
}

$("#formLogin").submit(function(e){
    e.preventDefault();

    loginRequest.data = '{"username": "' + inputUsername.val() + '", "password": "' + inputPassowrd.val() + '"}';

    $.ajax(loginRequest).done(function (response) {
        let token;
        if(response.data.token && response.data.token.startsWith("Bearer")){
            token = response.data.token;
            localStorage.setItem("username", inputUsername.val());
            localStorage.setItem("jwt", token);

            To_route('endereco');

        } else {
            alert("Ocorreu um erro ao tentar realizar o login!");
        }

    }).error(function () {
        alert("Ocorreu um erro ao tentar realizar o login. Confirme seus dados de acesso!");
    });

});
