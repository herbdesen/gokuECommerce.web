let authorization = localStorage.getItem("jwt");

let getAddressIdRequest = {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost:9090/address/"+Session.get('idAddressUpdate'),
    "method": "GET",
    "headers": {
        "authorization": authorization,
        "content-type": "application/json"
    },
    "processData": false
}

let putAddressRequest = {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost:9090/address/"+Session.get('idAddressUpdate'),
    "method": "PUT",
    "headers": {
        "authorization": authorization,
        "content-type": "application/json"
    },
    "processData": false,
    "data": ""
}

$.ajax(getAddressIdRequest).done(function (response) {
    Bind( {
        page: response
    });

}).error(function () {
    alert("Ocorreu um erro ao tentar consultar o endereço!");
});

function salvar() {
    let inputs = $("form[id*=form-endereco]").find("input");
    let address = {
        "id": $(inputs[0]).val(),
        "cep": $(inputs[1]).val(),
        "logradouro": $(inputs[2]).val(),
        "bairro": $(inputs[3]).val(),
        "cidade": $(inputs[4]).val(),
        "estado": $(inputs[5]).val(),
        "numero": $(inputs[6]).val(),
        "complemento": $(inputs[7]).val()
    }

    putAddressRequest.data = JSON.stringify(address);
    $.ajax(putAddressRequest).done(function (response) {
        To_route('endereco');

    }).error(function () {
        alert("Ocorreu um erro ao tentar atualizar o endereço!");
    });
}

function getCep(){
    let inputs = $("form[id*=form-endereco]").find("input");
    $('.loader').toggleClass("hidden");
    $('.salvar').toggleClass("hidden");
    $('form[id*=form-endereco]').toggleClass("hidden");
    buscaCep($(inputs[1]).cleanVal(), "update");
}


