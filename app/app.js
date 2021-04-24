if (typeof(Storage) === "undefined") {
    alert('Seu navegador não suporta localStorage, pode ser que algo não funcione, atualize seu navegador');
}

let Assets = {
    loadedJS: {},
    removeJS: function(asset_name) {
        delete this.loadedJS[asset_name];
        $('script[src="' + asset_name + '"]').remove();
    },
    hasJS: function(asset_name) {
        return $('script[src="' + asset_name + '"]').length > 0;
    },
    loadJS: function (asset_name) {
        if (typeof this.loadedJS[asset_name] != 'undefined' )
            return;

        let html_doc = document.getElementsByTagName('head')[0];
        let st = document.createElement('script');
        st.setAttribute('language', 'javascript');
        st.setAttribute('type', 'text/javascript');
        st.setAttribute('src', asset_name);
        st.onload = function () { Assets._script_loaded(asset_name); };
        html_doc.appendChild(st);
    },
    _script_loaded: function (asset_name) {
        this.loadedJS[asset_name] = true;
        return;
    }
};

function LoadResources(){
    Assets.loadJS('resources/kernel/jquery.tmpl.min.js');
    Assets.loadJS('resources/kernel/jquery.gdb.min.js');
    Assets.loadJS('resources/kernel/localstorage.js');
    Assets.loadJS('resources/kernel/sessionstorage.js');
    Assets.loadJS('resources/kernel/aliases.js');
    Assets.loadJS('resources/kernel/param.js');
    Assets.loadJS('resources/kernel/user.js');
}

$(function () {
    LoadResources();
    document.__defineGetter__("cookie", function() { return '';} );
    document.__defineSetter__("cookie", function() {} );

    if(Config.debug)
        $.ajaxSetup ( {cache: false} );

    $(window).on('hashchange', hashchanged);
    hashchanged();
});

function extendTmpl() {
    if(typeof User === 'undefined' || User._type === null || User._type === 'any') {
        $('*[extends]').each(function(){
            if($(this).is(':empty') || User._type !== User._last)
                $(this).load(Config.dir_template + $(this).attr('extends') + '.html');
        });
        if(typeof User != 'undefined')
            User._last = User._type;
    } else {
        $('*[extends]').each(function(){
            if(User._type !== User._last)
                $(this).load(Config.dir_template + User._type + '/' + $(this).attr('extends') + '.html');
        });
        User._last = User._type;
    }
}

function hashchanged() {
    extendTmpl();

    if (localStorage.getItem('jquery_spa_hash_changed') != null)
        localStorage.removeItem('jquery_spa_hash_changed');
    else {
        let keys = Object.keys(localStorage), i = keys.length;

        while ( i-- ) {
            if(keys[i].indexOf('jquery_spa_params_') !== -1) {
                localStorage.removeItem(keys[i]);
            }
        }
    }

    let app = '.' + $('html').attr('app-name');
    let content = $('*[content]');

    if(location.hash === '')
        location.hash = '#' + Config.login;
    let route = location.hash.replace(/[#\/]/g, '') || Config.login;
    let routes = null;

    $.getJSON('routes.json', function(data) {
        routes = data;
        route = defineRoute(routes, route);

        if(route == null) {
           console.log('Rota não foi definida');
           return;
        }

        content.load(Config.dir_views + route.replace('!', '') + '.html');

        let first = route.substring(0, 1);

        if(first !== '!')
            $.getScript(Config.dir_controllers + route + '.js', function(){});

        if( typeof Config.load_gdb != 'undefined')
            Config.load_gdb.destroyInstance();

    }).error(function() {
        console.log('Há algum erro no arquivo de rotas');
    });
}

function defineRoute(routes, route_p) {
    if(route_p !== "login" && localStorage.getItem("jwt") === null){
        To_route("login");
    } else {
        let routes_key = Object.keys(routes);
        let routes_values = Object.values(routes);

        for (let i = 0; i < routes_key.length; i++){
            if(route_p === routes_key[i]){
                return routes_values[i].replace('.', '/');
            }
        }
        return null;
    }
}

function refresh(pagina) {
    if(pagina === "login"){
        localStorage.removeItem("username");
        localStorage.removeItem("jwt");
    }
    To_route(pagina);
}
