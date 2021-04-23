let authorization = "Bearer "+localStorage.getItem("jwt");
var inputs = $("form[id*=form-endereco]").find("input");

if(Params.all().id !== undefined){
    Session.set('idAddressUpdate', Params.all().id);
}

var getAddressIdRequest = {
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

var putAddressRequest = {
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
});

function salvar() {
    var address = {
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
    });
}

function getCep(){
    $('.loader').toggleClass("hidden");
    $('.salvar').toggleClass("hidden");
    $('form[id*=form-endereco]').toggleClass("hidden");
    buscaCep($(inputs[1]).cleanVal(), "update");
}

var scope = {
    toCorporation : function() {
        console.log('trocando');
        // User( null);
        // User.type('any');
    },

    toUpdate : function() {
        To_route('enderecoUpdate');
    },
    toDelete : function() {
        To_route('endereco');
    }

};


