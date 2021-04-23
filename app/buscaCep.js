var inputs = $("form[id*=form-endereco]").find("input");

// REALIZA BUSCA DE CEP NA API VIACEP
function buscaCep($this, pagina) {
    let iniEndereco = 0;
    if(pagina === "update"){
        iniEndereco = 1;
    }
    let cep = $this;
    let url = "https://viacep.com.br/ws/"+cep.replaceAll("-", "")+"/json/";
    $.ajax({
        type: "GET",
        url: url,
        success: function(data){
            if(data.erro === undefined){
                preencheEndereco(data, iniEndereco);
            } else {
                $(inputs[iniEndereco++]).val("").change();
                $(inputs[iniEndereco++]).val("").change();
                $(inputs[iniEndereco++]).val("").change();
                $(inputs[iniEndereco++]).val("").change();
                $(inputs[iniEndereco++]).val("").change();
                $(inputs[iniEndereco++]).val("").change();
                $(inputs[iniEndereco++]).val("").change();
            }
            $('.loader').addClass("hidden");
            $('form[id*=form-endereco]').toggleClass("hidden");
            $('.salvar').toggleClass("hidden");
        },
        error: function (request, status, error) {

        },
        complete: function () {

        }
    });
}

function preencheEndereco(endereco, iniEndereco) {
    $(inputs[iniEndereco++]).val(endereco.cep).change();
    $(inputs[iniEndereco++]).val(endereco.logradouro).change();
    $(inputs[iniEndereco++]).val(endereco.bairro).change();
    if(endereco.localidade !== undefined){
        $(inputs[iniEndereco++]).val(endereco.localidade).change();
    } else {
        $(inputs[iniEndereco++]).val(endereco.cidade).change();
    }
    if(endereco.uf !== undefined){
        $(inputs[iniEndereco++]).val(endereco.uf).change();
    } else {
        $(inputs[iniEndereco++]).val(endereco.estado).change();
    }
}