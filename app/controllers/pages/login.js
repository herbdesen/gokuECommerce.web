let loginRequest = {
    "async": true,
    "crossDomain": true,
    "url": "http://gokujwtclientid:XY7kmzoNzl100@localhost:9090/oauth/token",
    "method": "POST",
    "headers": {
        "content-type": "application/x-www-form-urlencoded"
    },
    "data": {
        "grant_type": "password",
        "username": "",
        "password": ""
    }
};



$("#formLogin").submit(function(e){
    e.preventDefault();
    loginRequest.data.username = $("#username").val();
    loginRequest.data.password = $("#password").val();

    $.ajax(loginRequest).done(function (response) {
        localStorage.setItem("username", $("#username").val());
        localStorage.setItem("jwt", response.access_token);

        To_route('endereco');

    }).error(function () {
        alert("Login Inválido");
    });

});

// let scope = {
//     toGetByCep : function() {
//         $(".tr-tabela-enderecos").empty();
//         let cep = $(".getByCep").last().val();
//         getAddressByCepRequest.url = "http://localhost:9090/goku/address/cep/"+cep;
//         $.ajax(getAddressByCepRequest).done(function (response) {
//             addressList = response;
//             Template( $('.template-enderecos'), addressList ).appendTo('.tabela-enderecos');
//         });
//     }
// };
//
// Bind( {page: scope} );
