let addressList;
let authorization = "Bearer "+localStorage.getItem("jwt");

let getAddressListRequest = {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost:9090/address",
    "method": "GET",
    "headers": {
        "authorization": authorization,
        "content-type": "application/json"
    },
    "processData": false
}

let deleteAddressRequest = {
    "async": true,
    "crossDomain": true,
    "url": "",
    "method": "DELETE",
    "headers": {
        "authorization": authorization,
        "content-type": "application/json"
    }
}

let getAddressByCepRequest = {
    "async": true,
    "crossDomain": true,
    "url": "",
    "method": "GET",
    "headers": {
        "authorization": authorization,
        "content-type": "application/json"
    },
    "processData": false,
    "data": ""
}

let scope = {
    toCreate : function() {
        To_route('enderecoCreate');
        document.location.reload(true);
    },
    toUpdate : function() {
        let idAddress = $(this).data("id");
        if(addressList.length > 1){
            let address = addressList.filter(address => address.id === idAddress);
            Params.add(address[0]);
        } else {
            Params.add(addressList);
        }
        To_route('enderecoUpdate');
    },
    toDelete : function() {
        let idAddress = $(this).data("id");
        deleteAddressRequest.url = "http://localhost:9090/address/"+idAddress;
        $.ajax(deleteAddressRequest).done(function (response) {
            document.location.reload(true);
        });
    },
    toGetAll : function() {
        getAll();
    },
    toGetByCep : function() {
        $(".tr-tabela-enderecos").empty();
        let cep = $(".getByCep").last().val();
        getAddressByCepRequest.url = "http://localhost:9090/address/cep/"+cep;
        $.ajax(getAddressByCepRequest).done(function (response) {
            addressList = response;
            Template( $('.template-enderecos'), addressList ).appendTo('.tabela-enderecos');
        }).error(function () {
            alert("Não foi encontrado nenhum endereço com este CEP");
        });
    }
};

function getAll() {
    $(".tr-tabela-enderecos").empty();
    $.ajax(getAddressListRequest).done(function (response) {
        addressList = response;
        Template($('.template-enderecos'), addressList).appendTo('.tabela-enderecos');
    });
}

getAll();

Bind( {page: scope} );
