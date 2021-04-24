let authorization = localStorage.getItem("jwt");

let postAddressRequest = {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost:9090/address",
    "method": "POST",
    "headers": {
        "authorization": authorization,
        "content-type": "application/json"
    },
    "processData": false,
    "data": ""
}

function getCep(){
    $('.loader').toggleClass("hidden");
    $('.salvar').toggleClass("hidden");
    $('form[id*=form-endereco]').toggleClass("hidden");
    let cep = $(inputs[0]).cleanVal();
    buscaCep(cep, "create");
}

function salvar() {
    let inputs = $("form[id*=form-endereco]").find("input");

    let address = {
        "cep": $(inputs[0]).val(),
        "logradouro": $(inputs[1]).val(),
        "bairro": $(inputs[2]).val(),
        "cidade": $(inputs[3]).val(),
        "estado": $(inputs[4]).val(),
        "numero": $(inputs[5]).val(),
        "complemento": $(inputs[6]).val()
    }

    postAddressRequest.data = JSON.stringify(address);
    $.ajax(postAddressRequest).done(function (response) {
        To_route('endereco');

    }).error(function () {
        alert("Ocorreu um erro ao tentar cadastrar o endereço!");
    });
}


